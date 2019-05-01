(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const getElems = (selector, root = document) => {
  if (selector instanceof Element) {
    return [selector];
  }

  if (selector instanceof NodeList) {
    return selector;
  }

  return root.querySelectorAll(selector);
};

const markElemAsLoaded = elem => {
  elem.setAttribute("data-loaded", true);
  return;
};

const loadElem = elem => {
  if (elem.getAttribute("data-src")) {
    elem.src = elem.getAttribute("data-src");
  }

  return;
};

const onIntersectionCallback = () => (entries, observer) => {
  console.log("observer:", observer);
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      loadElem(target);
      markElemAsLoaded(target);
      target.classList.add("fade");
      observer.unobserve(target);
    }
  });
};

var _default = (selector = ".lozad") => {
  const elements = getElems(selector);
  let observer;

  if (elements) {
    observer = new IntersectionObserver(onIntersectionCallback());
  }

  return {
    observe() {
      elements.forEach(element => {
        observer.observe(element);
      });
    }

  };
};

exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

var _lozad = _interopRequireDefault(require("./lozad"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = () => {
  const observer = (0, _lozad.default)(".lozad");
  observer.observe();
};

},{"./lozad":1}]},{},[2]);
