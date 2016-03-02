(function (window, document) {

  'use strict';

  // CommonJS support.
  if ('object' === typeof module && 'object' === typeof module.exports) {
    module.exports = loadStylesheet;
  } else {
    window.loadStylesheet = loadStylesheet;
  }

  /**
   * @param {string}   url
   * @param {function} [callback]
   *
   * @returns {Element}
   */
  function loadStylesheet (url, callback) {

    var headElement = document.getElementsByTagName('head')[0];
    var linkElement = document.createElement('link');

    linkElement.rel  = 'stylesheet';
    linkElement.type = 'text/css';
    linkElement.href = url;
    linkElement.media = 'all';

    // Adding callback if required.
    if ('function' === typeof callback) {
      if ('function' === typeof linkElement.addEventListener) {
        linkElement.addEventListener('load', callback);
      } else {
        linkElement.onload = callback;
      }
    }

    headElement.appendChild(linkElement);

    return linkElement;

  }

})(window, document);
