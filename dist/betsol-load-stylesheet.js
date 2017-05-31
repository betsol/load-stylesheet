/**
 * betsol-load-stylesheet - Loads stylesheets on demand with consistent callback support
 * @version v1.1.0
 * @link https://github.com/betsol/load-stylesheet
 * @license MIT
 *
 * @author Slava Fomin II <s.fomin@betsol.ru>
 */
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
   * @param {Object}   [options]
   *
   * @returns {Element}
   */
  function loadStylesheet (url, callback, options) {

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

    if (options.insertBefore) {
      headElement.insertBefore(linkElement, options.insertBefore);
    } else {
      headElement.appendChild(linkElement);
    }

    return linkElement;

  }

})(window, document);
