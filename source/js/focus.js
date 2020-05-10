// macOS: Firefox и Safari после выбора мышкой элементов формы (checkbox, radio, button) не показывают окантовку элемента
// то есть явно не видно где находится фокус на форме
// этот код явно устанавливает фокус при клике
// а сама окантовка стилизуется через CSS
function focus() {
  var selectors = ['.social__item a', 'button', '.panel__btn', '.panel__slider', '.form input[type=checkbox]', '.form input[type=radio]'];
  var elements = document.querySelectorAll(selectors.join());

  elements.forEach(function(el) {
    el.addEventListener('click', function(event) {
      el.focus();
    });
  })
}

window.addEventListener("load", focus, false);
