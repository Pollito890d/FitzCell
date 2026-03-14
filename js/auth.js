// ============================================================
//  FitzCell — Auth Guard
//  Incluir en todas las páginas del admin (excepto login.html)
// ============================================================
(function() {
  const session = sessionStorage.getItem("fc_admin");
  if (!session || session !== "authenticated") {
    window.location.href = "login.html";
  }
})();

function logout() {
  sessionStorage.removeItem("fc_admin");
  window.location.href = "login.html";
}
