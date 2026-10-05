/* "Copiar e-mail" button, for people without a mail app set up. */
(function () {
  var button = document.querySelector("[data-copy]");
  var status = document.querySelector("[data-copy-status]");
  if (!button || !status) return;

  var label = button.querySelector("[data-copy-label]");
  var original = label.textContent;
  var timer;

  function say(text) {
    label.textContent = text;
    status.textContent = text;
    clearTimeout(timer);
    timer = setTimeout(function () {
      label.textContent = original;
      status.textContent = "";
    }, 2500);
  }

  button.addEventListener("click", function () {
    var email = button.getAttribute("data-copy");
    if (!navigator.clipboard) {
      say("Copia ali em cima :)");
      return;
    }
    navigator.clipboard.writeText(email).then(
      function () {
        say("Copiado!");
      },
      function () {
        say("Copia ali em cima :)");
      }
    );
  });
})();
