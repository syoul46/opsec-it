#!/usr/bin/env bash
# Verifie la chaine d'authentification e-mail d'opsec-it.fr.
#
# A lancer APRES avoir publie les enregistrements Resend (cf. README, section
# « E-mail »), et avant de basculer CONTACT_FROM sur contact@opsec-it.fr :
# passer l'expediteur sur le domaine sans DKIM publie envoie tout en indesirables.
#
# Resend a change de schema : ce ne sont plus un MX et un TXT poses directement
# sur `send`, mais DEUX CNAME — `send` (Return-Path, MTA propre a Resend) et
# `rsend` (chemin SES regional, `rsend-euw1` pour l'Irlande). L'`amazonses.com`
# a donc migre de `send` vers `rsend` : la version precedente de ce script le
# cherchait au mauvais endroit et rendait un KO sur une configuration correcte,
# juste devant la bascule qu'il est cense autoriser.
set -uo pipefail

DOMAIN="${1:-opsec-it.fr}"
# Selecteur DKIM de la boite mail Hetzner, distinct de celui de Resend. Les deux
# coexistent : l'un signe ce que tu envoies au webmail, l'autre ce qu'envoie le
# formulaire. Surchargeable en 2e argument pour un autre domaine.
MBOX_SELECTOR="${2:-default2607}"
ok=0; ko=0

check() { # libelle, requete, motif attendu
  local label="$1" query="$2" pattern="$3" out
  # `grep -v '^;'` : dig ecrit ses avertissements (« Client COOKIE mismatch »)
  # sur la sortie standard, pas sur stderr — ils polluaient le resultat.
  # Sur un nom en CNAME, `dig +short MX` renvoie d'abord la cible du CNAME puis
  # l'enregistrement : le `tr '\n' ' '` aplatit les deux, le motif retrouve le sien.
  out=$(dig +short $query 2>/dev/null | grep -v '^;' | tr -d '"' | tr '\n' ' ')
  if [[ -n "$out" && "$out" =~ $pattern ]]; then
    printf '  \033[32mOK\033[0m   %-34s %s\n' "$label" "${out:0:64}"
    ok=$((ok+1))
  else
    printf '  \033[31mKO\033[0m   %-34s %s\n' "$label" "${out:-absent}"
    ko=$((ko+1))
  fi
}

echo "Chaine e-mail de $DOMAIN"
echo
echo "Requis par Resend pour verifier le domaine :"
check "CNAME send.$DOMAIN"      "send.$DOMAIN CNAME"               'forge\.rmta\.net'
check "CNAME rsend.$DOMAIN"     "rsend.$DOMAIN CNAME"              'forge\.rmta\.net'
check "MX  rsend.$DOMAIN"       "rsend.$DOMAIN MX"                 'amazonses\.com'
check "SPF rsend.$DOMAIN"       "rsend.$DOMAIN TXT"                'v=spf1.*amazonses\.com'
check "SPF send.$DOMAIN"        "send.$DOMAIN TXT"                 'v=spf1'
check "DKIM resend._domainkey"  "resend._domainkey.$DOMAIN TXT"    'p='
echo
echo "Deja en place, a ne pas casser :"
check "SPF racine"              "$DOMAIN TXT"                      'v=spf1'
check "DMARC"                   "_dmarc.$DOMAIN TXT"               'v=DMARC1'
check "MX racine (boite mail)"  "$DOMAIN MX"                       '\.'
check "DKIM boite ($MBOX_SELECTOR)" "$MBOX_SELECTOR._domainkey.$DOMAIN TXT" 'p='
echo

# La region Resend se fige a la creation du domaine : en changer impose de le
# supprimer, le recreer et refaire tout le DNS, nouvelle cle DKIM comprise. Elle
# est donc affichee ici — c'est le seul endroit ou on la voit sans le dashboard.
region=$(dig +short rsend."$DOMAIN" CNAME 2>/dev/null | sed -n 's/^rsend-\([a-z0-9]*\)\..*/\1/p')
case "$region" in
  euw1) echo "  Region Resend : eu-west-1 (Irlande) — dans l'EEE, rien a declarer de plus." ;;
  "")   echo "  Region Resend : indeterminee (CNAME rsend absent ?)." ;;
  *)    echo "  Region Resend : $region — HORS EEE. La politique de confidentialite doit"
        echo "                  mentionner le transfert et sa base juridique (RGPD art. 13-1-f)." ;;
esac

spf=$(dig +short "$DOMAIN" TXT 2>/dev/null | grep -v '^;' | tr -d '"' | grep 'v=spf1')
case "$spf" in
  *-all*) echo "  SPF racine    : -all — les faux sont rejetes." ;;
  *~all*) echo "  SPF racine    : ~all — softfail seulement. Passer a -all une fois que"
          echo "                  la boite Hetzner sort en spf=pass (cf. README)." ;;
esac

dmarc=$(dig +short "_dmarc.$DOMAIN" TXT 2>/dev/null | grep -v '^;' | tr -d '"')
case "$dmarc" in
  *p=none*)       echo "  DMARC         : p=none — observation seule. Passer a p=quarantine." ;;
  *p=quarantine*) echo "  DMARC         : p=quarantine." ;;
  *p=reject*)     echo "  DMARC         : p=reject." ;;
esac
case "$dmarc" in
  *sp=*) ;;
  *)     echo "  DMARC         : pas de sp= — les sous-domaines heritent de p=, verifier"
         echo "                  que c'est bien voulu avant de serrer." ;;
esac
echo
if [[ $ko -eq 0 ]]; then
  echo "  $ok/$((ok+ko)) — la bascule de CONTACT_FROM peut se faire."
else
  echo "  $ko manquant(s) sur $((ok+ko)) — NE PAS basculer CONTACT_FROM tout de suite."
  exit 1
fi
