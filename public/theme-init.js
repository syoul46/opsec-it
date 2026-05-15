(function () {
  try {
    var stored = localStorage.getItem("opsec-it.theme");
    document.documentElement.setAttribute("data-theme", stored || "polynesian-dark");
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "polynesian-dark");
  }
})();
