'use strict';

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ({

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(23);


/***/ }),

/***/ 23:
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Name    : nK Share
 * Version : 1.0.0
 * Author  : _nK http://nkdev.info
 */
(function ($) {
  // NKShare instance
  var NKShare = function () {
    var instanceID = 0;

    function NKShareReturn(item, userOptions) {
      var _this = this;

      _this.$item = $(item);
      _this.defaults = {
        name: null,
        text: null,
        link: null,
        media: null,
        popupOptions: 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600',
        networks: {
          facebook: function facebook() {
            var result = "//www.facebook.com/share.php?m2w&s=100&p[url]=".concat(encodeURIComponent(this.options.link));

            if (this.options.media) {
              result += "&p[images][0]=".concat(encodeURIComponent(this.options.media));
            }

            if (this.options.text) {
              result += "&p[title]=".concat(encodeURIComponent(this.options.text));
            }

            window.open(result, 'Facebook', this.options.popupOptions);
          },
          twitter: function twitter() {
            var result = "https://twitter.com/intent/tweet?original_referer=".concat(encodeURIComponent(this.options.link));

            if (this.options.text) {
              result += "&text=".concat(encodeURIComponent(this.options.text), "%20").concat(encodeURIComponent(this.options.link));
            } else {
              result += "&text=".concat(encodeURIComponent(this.options.link));
            }

            window.open(result, 'Twitter', this.options.popupOptions);
          },
          pinterest: function pinterest() {
            var result = "//pinterest.com/pin/create/button/?url=".concat(encodeURIComponent(this.options.link));

            if (this.options.media) {
              result += "&media=".concat(encodeURIComponent(this.options.media));
            }

            if (this.options.text) {
              result += "&description=".concat(encodeURIComponent(this.options.text));
            }

            window.open(result, 'Pinterest', this.options.popupOptions);
          },
          'google-plus': function googlePlus() {
            window.open("//plus.google.com/share?url=".concat(encodeURIComponent(this.options.link)), 'GooglePlus', this.options.popupOptions);
          },
          linkedin: function linkedin() {
            var result = "//www.linkedin.com/shareArticle?mini=true&url=".concat(encodeURIComponent(this.options.link), "&source=").concat(encodeURIComponent(this.options.link));

            if (this.options.text) {
              result += "&title=".concat(encodeURIComponent(this.options.text));
            }

            window.open(result, 'LinkedIn', this.options.popupOptions);
          },
          vk: function vk() {
            window.open("//vk.com/share.php?url=".concat(encodeURIComponent(this.options.link)), 'Vkontakte', this.options.popupOptions);
          }
        }
      };
      _this.options = $.extend({}, _this.defaults, userOptions);
      _this.instanceID = instanceID++;

      _this.onClickInit();
    }

    return NKShareReturn;
  }();

  NKShare.prototype.onClickInit = function () {
    var self = this;
    self.$item.on('click', function (e) {
      if (self.options.networks[self.options.name]) {
        e.preventDefault();
        self.options.networks[self.options.name].call(self);
      }
    });
  };

  var oldNkshare = $.fn.nkshare;

  $.fn.nkshare = function () {
    var items = this;
    var options = arguments[0] || {};
    var args = Array.prototype.slice.call(arguments, 1);
    var len = items.length;
    var k = 0;
    var ret;

    for (k; k < len; k++) {
      if (_typeof(options) === 'object') {
        if (!items[k].nkshare) {
          var thisOpts = $.extend({}, options);
          var $item = $(items[k]); // prepare options

          if (typeof thisOpts.name === 'undefined') {
            thisOpts.name = $item.attr('data-share');
          }

          if (typeof thisOpts.name === 'undefined') {
            return false;
          }

          if (typeof thisOpts.text === 'undefined') {
            thisOpts.text = $item.attr('data-share-text') || document.title;
          }

          if (typeof thisOpts.link === 'undefined') {
            thisOpts.link = $item.attr('data-share-link') || window.location.href.replace(window.location.hash, '');
          }

          if (typeof thisOpts.media === 'undefined') {
            thisOpts.media = $item.attr('data-share-media');
          } // init


          items[k].nkshare = new NKShare(items[k], thisOpts);
        }
      } else {
        // eslint-disable-next-line prefer-spread
        ret = items[k].nkshare ? items[k].nkshare[options].apply(items[k].nkshare, args) : undefined;
      }

      if (typeof ret !== 'undefined') {
        return ret;
      }
    }

    return this;
  }; // no conflict


  $.fn.nkshare.noConflict = function () {
    $.fn.nkshare = oldNkshare;
    return this;
  }; // data-share initialization


  $(document).on('ready.data-nkshare', function () {
    $('[data-share]').nkshare();
  });
})(jQuery);

/***/ })

/******/ });