// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"config/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.API_KEY = void 0;
// export const API_KEY = "a3bda884cefe260dce008457c4d4e3f7";
// ----------------
const API_KEY = "a3bda884cefe260dce008457c4d4e3f7";
exports.API_KEY = API_KEY;
},{}],"models.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPopularMovies = fetchPopularMovies;

var _config = require("./config/config");

// import { API_KEY } from "./config/config";
// import { elements } from "./view/base";
// // For storing and fetching any data
// let link = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
// async function fetchPopularMovies(url = link) {
//     let result = await fetch(`${url}`);
//     let data = await result.json();
//     console.log(data);
//     return data;
// }
// let linkLatest = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
// async function fetchLatestData(url = linkLatest) {
//     let result = await fetch(`${url}`);
//     let data = await result.json();
//     return data;
// }
// async function fetchTrendingData(url = linktrending) {
//     let result = await fetch(`${url}`);
//     let data = await result.json();
//     return data;
// }
// let linkTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
// async function fetchTopRated(url = linkTop) {
//     let result = await fetch(`${url}`);
//     let data = await result.json();
//     return data;
// }
// fetchLatestData();
// async function fetchSearchResult(query) {
//     let result = await fetch(
//         `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
//     );
//     let data = await result.json();
//     return data;
// }
// //  Async functions end
// function swapPage(e) {
//     let textContent = e.target.textContent.trim();
//     for (let i = 0; i < elements.categories.children.length; i++) {
//         if (elements.categories.children[i].classList.contains("active")) {
//             elements.categories.children[i].classList.remove("active");
//         }
//     }
//     if (textContent === "On TV") {
//         link = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1
//     `;
//         e.target.classList.add("active");
//         console.log("HELLO1");
//     } else if (textContent === "For Rent") {
//         link = `  https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1
//     `;
//         e.target.classList.add("active");
//     } else if (textContent === "In Theaters") {
//         link = `  https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1
//     `;
//         e.target.classList.add("active");
//     } else if (textContent === "Streaming") {
//         link = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
//         e.target.classList.add("active");
//     }
//     return link;
// }
// //swap page ends
// let linktrending = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
// function swapTrending(e) {
//     for (let i = 0; i < elements.trendingCategories.children.length; i++) {
//         if (elements.trendingCategories.children[i].classList.contains("active")) {
//             elements.trendingCategories.children[i].classList.remove("active");
//         }
//     }
//     let text = e.target.textContent.trim();
//     if (text === "Today") {
//         linktrending = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
//         e.target.classList.add("active");
//     } else if (text === "This Week") {
//         linktrending = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
//         e.target.classList.add("active");
//     }
//     return linktrending;
// }
// //swap trending ends
// //swapfree to watch starts
// function swapFreeToWatch(e) {
//     for (let i = 0; i < elements.freeToWatchCategories.children.length; i++) {
//         if (elements.freeToWatchCategories.children[i].classList.contains("active")) {
//             elements.freeToWatchCategories.children[i].classList.remove("active");
//         }
//     }
//     let text = e.target.textContent.trim();
//     if (text === "Movies") {
//         linkTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
//         e.target.classList.add("active");
//     } else if (text === "TV") {
//         linkTop = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
//         e.target.classList.add("active");
//     }
//     return linkTop;
// }
// function swapLatest(e) {
//     let textContent = e.target.textContent.trim();
//     for (let i = 0; i < elements.latestCategories.children.length; i++) {
//         if (elements.latestCategories.children[i].classList.contains("active")) {
//             elements.latestCategories.children[i].classList.remove("active");
//         }
//     }
//     if (textContent === "On TV") {
//         linkLatest = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1
//     `;
//         e.target.classList.add("active");
//         console.log("HELLO1");
//     } else if (textContent === "For Rent") {
//         linkLatest = `  https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1
//     `;
//         e.target.classList.add("active");
//     } else if (textContent === "In Theaters") {
//         linkLatest = `  https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1
//     `;
//         e.target.classList.add("active");
//     } else if (textContent === "Streaming") {
//         linkLatest = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
//         e.target.classList.add("active");
//     }
//     return linkLatest;
// }
// export {
//     fetchPopularMovies,
//     fetchSearchResult,
//     fetchLatestData,
//     fetchTrendingData,
//     fetchTopRated,
//     swapPage,
//     swapTrending,
//     swapLatest,
//     swapFreeToWatch
// };
// -- -- -- -- -- -- -- - --
let link = `https://api.themoviedb.org/3/movie/popular?api_key=${_config.API_KEY}&language=en-US&page=1`;

async function fetchPopularMovies(url = link) {
  let result = await fetch(`${url}`);
  let data = await result.json();
  return data;
}

let linkLatest = `https://api.themoviedb.org/3/search/movie?api_key=${_config.API_KEY}&language=en-US&query=nun&page=1&include_adult=false`;
},{"./config/config":"config/config.js"}],"view/base.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elements = void 0;
// export const elements = {
//     cardContainer: document.querySelector(".popular-cards"),
//     eachCard: document.querySelector(".popular-cards .movie-card"),
//     spinner: document.querySelector(".popular-cards .spinner"),
//     form: document.querySelector(".background form"),
//     input: document.querySelector(".background form input"),
//     categories: document.querySelector(".popular .categories"),
//     latestCardContainer: document.querySelector(".latest-cards"),
//     trendingCardContainer: document.querySelector(".trending-cards"),
//     trendingCategories: document.querySelector(".trending .categories"),
//     latestCategories: document.querySelector(".latest .categories"),
//     freetowatchCards: document.querySelector(".freetowatch-cards"),
//     freeToWatchCategories: document.querySelector(".freetowatch .categories"),
//     page1: document.querySelector(".page-1"),
//     search: document.querySelector(".search"),
//     faarrowleft: document.querySelector(".fa-arrow-left"),
//     movieinfo: document.querySelector(".search .box")
// };
//---------------------------------------
const elements = {
  cardContainer: document.querySelector(`.popular-cards`),
  eachcard: document.querySelector(`.movie-card`),
  spinner: document.querySelector(`.spinner`),
  form: document.querySelector(`.background form`),
  input: document.querySelector(`.background form input`)
};
exports.elements = elements;
},{}],"view/view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderCards = renderCards;
exports.showSpinner = showSpinner;
exports.clearSpinner = clearSpinner;
exports.takeInput = takeInput;
exports.submitValue = submitValue;
exports.clearFields = clearFields;

var _base = require("./base");

// import { elements } from "./base";
// function renderCards(arr) {
//     let month = [
//         "Jan",
//         "Feb",
//         "March",
//         "Apr",
//         "May",
//         "June",
//         "July",
//         "Aug",
//         "Sept",
//         "Oct",
//         "Nov",
//         "Dec",
//     ];
//     let str = "";
//     arr
//         .filter((item, idx) => idx <= 6)
//         .forEach((item) => {
//             str += `<div class="movie-card">
//         <div class="movie-image">
//         <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}" alt="" crossorigin="anonymous">
//         </div>
//         <h4 class="movie-title">${item.title || item.name}</h4>
//         <h6>27 aug,2020</h6>
//         <div class="movie-rating">${parseInt(
//           Number(item.vote_average / 10) * 100
//         )}</div>
//       </div>`;
//         });
//     elements.cardContainer.innerHTML = str;
// }
// function renderTrending(arr) {
//     let month = [
//         "Jan",
//         "Feb",
//         "March",
//         "Apr",
//         "May",
//         "June",
//         "July",
//         "Aug",
//         "Sept",
//         "Oct",
//         "Nov",
//         "Dec",
//     ];
//     let str = "";
//     arr
//         .filter((item, idx) => idx <= 6)
//         .forEach((item) => {
//             str += `<div class="movie-card">
//             <div class="movie-image">
//             <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}" alt="" crossorigin="anonymous">
//             </div>
//             <h4 class="movie-title">${item.title || item.name}</h4>
//             <h6>${
//               month[Number(item.release_date.substring(5, 7)) - 1]
//             }, ${item.release_date.substring(0, 4)}</h6>
//             <div class="movie-rating">${parseInt(
//               Number(item.vote_average / 10) * 100
//             )}</div>
//             </div>`;
//         });
//     elements.trendingCardContainer.innerHTML = str;
// }
// function changepage(e) {
//     e.preventDefault()
//     elements.page1.classList.add("hide")
//     elements.search.classList.remove("hide")
// }
// function renderLatest(arr, x) {
//     let str = "";
//     arr
//         .filter((item, idx) => idx >= 4 && idx <= 7)
//         .forEach((item) => {
//             console.log(item.poster_path)
//             str += `<div class="movie-card">
//       <div class="movie-image">
//       <img src="https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item.poster_path}" alt="" crossorigin="anonymous">
//       </div>
//       <h4 class="movie-title">${item.title || item.name}</h4>
//       <h6>${item.first_air_date || item.release_date || ""} </h6>
//     </div>`;
//         });
//     elements.latestCardContainer.innerHTML = str;
// }
// function showSpinner() {
//     elements.spinner.classList.remove("hide");
// }
// function clearSpinner() {
//     elements.spinner.classList.add("hide");
// }
// let value = "";
// function takeInput(e) {
//     value = e.target.value;
// }
// function submitValue(e) {
//     e.preventDefault();
//     return value;
// }
// function renderSearch(arr) {
//     let month = [
//         "Jan",
//         "Feb",
//         "March",
//         "Apr",
//         "May",
//         "June",
//         "July",
//         "Aug",
//         "Sept",
//         "Oct",
//         "Nov",
//         "Dec",
//     ];
//     let str = "";
//     arr
//         .filter((item, idx) => idx <= 6)
//         .forEach((item) => {
//             str += `            <div class="movie-info">
//       <div class="movie-image">
//       <img src="https://www.themoviedb.org/t/p/w94_and_h141_bestv2${item.poster_path }" alt="" crossorigin="anonymous">
//   </div>
//   <div class="movie-details">
//       <h3>${item.original_name || item.original_title}</h3>
//       <h3>${item.first_air_date || item.release_date || ""}</h3>
//       <p>${item.overview}</p>
//   </div>
//   </div>`
//         });
//     elements.movieinfo.innerHTML = str;
// }
// function clearFields() {
//     value = "";
//     elements.input.value = "";
// }
// function renderFreeToWatchCards(arr) {
//     let month = [
//         "Jan",
//         "Feb",
//         "March",
//         "Apr",
//         "May",
//         "June",
//         "July",
//         "Aug",
//         "Sept",
//         "Oct",
//         "Nov",
//         "Dec",
//     ];
//     let str = "";
//     let date = "";
//     arr
//         .filter((item, idx) => idx <= 6)
//         .forEach((item) => {
//             date = item.release_date || (item.first_air_date);
//             console.log(date);
//             console.log(item.backdrop_paths)
//             str += `<div class="movie-card">
//               <div class="movie-image">
//               <img src="https://image.tmdb.org/t/p/w500/${item.poster_path} "  alt="" crossorigin="anonymous">
//               </div>
//               <h4 class="movie-title">${item.title || item.name}</h4>
//               <h6>
//               ${date.substring(8,10)}
//               ${
//                 month[Number(date.substring(5, 7)) - 1]
//               }, ${
//                 date.substring(0, 4)}</h6>
//               <div class="movie-rating">${parseInt(
//                 Number(item.vote_average / 10) * 100
//               )}</div>
//               </div>`;
//         });
//     elements.freetowatchCards.innerHTML = str;
// }
// function backtomain(e) {
//     elements.page1.classList.remove("hide")
//     elements.search.classList.add("hide")
// }
// export {
//     renderCards,
//     showSpinner,
//     clearSpinner,
//     takeInput,
//     submitValue,
//     clearFields,
//     renderLatest,
//     renderTrending,
//     renderFreeToWatchCards,
//     changepage,
//     backtomain,
//     renderSearch,
// };
//--------------------------------------
function renderCards(arr) {
  let str = "";
  arr.filter((item, idx) => idx <= 5).forEach(item => {
    str += `<div class="movie-card">
           <div class="movie-image"></div>
           <h4 class="movie-title"> ${item.title} </h4>
           <h6>Sep 12, 2013</h6>
           <div class="movie-rating">83%</div>
         </div>`;
  });
  _base.elements.cardContainer.innerHTML = str;
}

function showSpinner() {
  _base.elements.spinner.classList.remove(`hide`);
}

function clearSpinner() {
  _base.elements.spinner.classList.add(`hide`);
}

let value = "";

function takeInput(e) {
  console.log(e.target.value);
  value = e.target.value;
}

function submitValue(e) {
  e.preventDefault();
  return value;
}

function clearFields(e) {
  _base.elements.input.value = "";
}
},{"./base":"view/base.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _models = require("./models");

var _base = require("./view/base");

var _view = require("./view/view");

// Controller
// import { fetchPopularMovies, fetchSearchResult } from "./models";
// import {
//     renderCards,
//     showSpinner,
//     clearSpinner,
//     submitValue,
//     takeInput,
//     clearFields,
//     swapPage,
// } from "./view/view";
// import { elements } from "./view/base";
// async function loadPopularData() {
//     showSpinner();
//     let { results } = await fetchPopularMovies();
//     clearSpinner();
//     renderCards(results);
// }
// loadPopularData();
// elements.input.addEventListener("change", takeInput);
// let searchresult = "";
// elements.form.addEventListener("submit", async(e) => {
//     searchresult = submitValue(e);
//     clearFields();
//     let { results } = await fetchSearchResult(searchresult.trim());
//     renderCards(results);
// });
// elements.categories.addEventListener("click", async(e) => {
//     let link = swapPage(e);
//     let { results } = await fetchPopularMovies(link.trim());
//     console.log(results);
//     renderCards(results);
//     console.log(link.trim());
// });
// ---------------------------------------
async function loadPopularData() {
  (0, _view.showSpinner)();
  let {
    results
  } = await (0, _models.fetchPopularMovies)();
  (0, _view.clearSpinner)();
  (0, _view.renderCards)(results); // console.log(await fetchPopularMovies());
}

loadPopularData();

_base.elements.input.addEventListener(`change`, _view.takeInput);

let searchresult = "";

let value = _base.elements.form.addEventListener(`submit`, e => {
  searchresult = (0, _view.submitValue)(e);
  (0, _view.clearFields)(e);
});

console.log(value);
},{"./models":"models.js","./view/base":"view/base.js","./view/view":"view/view.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57576" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map