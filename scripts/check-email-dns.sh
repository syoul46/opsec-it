#!/usr/bin/env bash
# Verifie la chaine d'authentification e-mail d'opsec-it.fr.
#
# A lancer APRES avoir publie les enregistrements Resend (cf. README, section
# « E-mail »), et avant de basculer CONTACT_FROM sur contact@opsec-it.fr :
# passer l'expediteur sur le domaine sans DKIM publie envoie tout en indesirables.
set -uo pipefail

DOMAIN="${1:-opsec-it.fr}"
ok=0; ko=0

check() { # libelle, requete, motif attendu
  local label="$1" query="$2" pattern="$3" out
  # `grep -v '^;'` : dig ecrit ses avertissements (« Client COOKIE mismatch »)
  # sur la sortie standard, pas sur stderr — ils polluaient le resultat.
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
check "MX  send.$DOMAIN"        "send.$DOMAIN MX"                  'amazonses\.com'
check "SPF send.$DOMAIN"        "send.$DOMAIN TXT"                 'v=spf1.*amazonses\.com'
check "DKIM resend._domainkey"  "resend._domainkey.$DOMAIN TXT"    'p='
echo
echo "Deja en place, a ne pas casser :"
check "SPF racine"              "$DOMAIN TXT"                      'v=spf1'
check "DMARC"                   "_dmarc.$DOMAIN TXT"               'v=DMARC1'
check "MX racine (boite mail)"  "$DOMAIN MX"                       '\.'
echo
dmarc=$(dig +short "_dmarc.$DOMAIN" TXT 2>/dev/null | grep -v '^;' | tr -d '"')
case "$dmarc" in
  *p=none*)       echo "  Note : DMARC en p=none — observation seule. Passer a p=quarantine" ;;
  *p=quarantine*) echo "  Note : DMARC en p=quarantine." ;;
  *p=reject*)     echo "  Note : DMARC en p=reject." ;;
esac
echo
if [[ $ko -eq 0 ]]; then
  echo "  $ok/$((ok+ko)) — la bascule de CONTACT_FROM peut se faire."
else
  echo "  $ko manquant(s) sur $((ok+ko)) — NE PAS basculer CONTACT_FROM tout de suite."
  exit 1
fi
