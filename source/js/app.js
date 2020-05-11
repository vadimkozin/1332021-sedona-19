function init() {
  setMainNavigation();
  setTabindexOnForm();
  setFocus();

  // Главная навигация
  function setMainNavigation() {
    var navMain = document.querySelector('.main-nav');
    var navToggle = document.querySelector('.main-nav__toggle');

    navMain.classList.remove('main-nav--nojs');

    navToggle.addEventListener('click', function() {

      if (navMain.classList.contains('main-nav--closed')) {
        navMain.classList.remove('main-nav--closed');
        navMain.classList.add('main-nav--opened');

      } else {
        navMain.classList.add('main-nav--closed');
        navMain.classList.remove('main-nav--opened');
      }
    }, false);
  }


  // Порядок перемещения по элементам на форме
  function setTabindexOnForm() {

    if (!document.querySelector('.form')) {
      return;
    }

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries
    var mediaQueryList = window.matchMedia("(min-width: 768px)");
    mediaQueryList.addListener(handleBreakpointChange);
    handleBreakpointChange(mediaQueryList);

    function handleBreakpointChange(evt) {
      // элементы, учавствующие в перемещении по <tab>
      var person = document.querySelectorAll('.person__item-input');
      var impression = document.getElementsByName('impression')[0];
      var phone = document.getElementsByName('phone')[0];
      var email = document.getElementsByName('email')[0];
      var visited = document.querySelectorAll('.visited__input');
      var emotions = document.getElementsByName('emotions')[0];
      var button = document.querySelector('.form__button');
      var social = document.querySelectorAll('.social__link');
      var copyright = document.querySelector('.copyright__link');
      var index = 0;

      if (evt.matches) {  // >= 768px
        setOrder("reset");
      } else {            // < 768px
        setOrder("next")
      }

      // возвращает индекс
      function getIndex(mode) {
        return (mode === "next") ? index+=1 : 0;
      }

      // устанавливает порядок перехода по элементам
      function setOrder(mode) {
        person.forEach(function(el) { el.tabIndex = getIndex(mode) })
        phone.tabIndex = getIndex(mode);
        email.tabIndex = getIndex(mode);
        impression.tabIndex = getIndex(mode);
        visited.forEach(function(el) { el.tabIndex = getIndex(mode) })
        emotions.tabIndex = getIndex(mode);
        button.tabIndex = getIndex(mode);
        social.forEach(function(el) { el.tabIndex = getIndex(mode) })
        copyright.tabIndex = getIndex(mode);
      }

      // для отладки
      // function printOrder() {
      //   console.log('person:', person[0].tabIndex);
      //   console.log('phone:', phone.tabIndex);
      //   console.log('email:', email.tabIndex);
      //   console.log('impression:', impression.tabIndex);
      //   console.log('visited:', visited[0].tabIndex);
      //   console.log('emotions:', emotions.tabIndex);
      //   console.log('button:', button.tabIndex);
      //   console.log('social:', social[0].tabIndex);
      //   console.log('copyright:', copyright.tabIndex);
      // }
    }
  }


  // macOS: Firefox и Safari после выбора мышкой элементов формы (checkbox, radio, button) не показывают окантовку элемента
  // приходиться явно устанавливает фокус при клике
  // а сама окантовка стилизуется через CSS
  function setFocus() {
    var selectors = ['.social__item a', 'button', '.panel__btn', '.panel__slider', '.form input[type=checkbox]', '.form input[type=radio]'];
    var elements = document.querySelectorAll(selectors.join());

    elements.forEach(function(el) {
      el.addEventListener('click', function(event) {
        el.focus();
      });
    })
  }
}

window.addEventListener("load", init, false);
