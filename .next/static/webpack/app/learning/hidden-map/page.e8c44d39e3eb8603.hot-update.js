"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/learning/hidden-map/page",{

/***/ "(app-client)/./app/learning/hidden-map/page.tsx":
/*!******************************************!*\
  !*** ./app/learning/hidden-map/page.tsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _react_google_maps_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @react-google-maps/api */ \"(app-client)/./node_modules/@react-google-maps/api/dist/esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-client)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _page_consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page.consts */ \"(app-client)/./app/learning/hidden-map/page.consts.ts\");\n/* harmony import */ var _page_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./page.module.scss */ \"(app-client)/./app/learning/hidden-map/page.module.scss\");\n/* harmony import */ var _page_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_page_module_scss__WEBPACK_IMPORTED_MODULE_4__);\n\nvar _s = $RefreshSig$();\n\n\n\n\nconst HiddenMap = ()=>{\n    _s();\n    const { isLoaded  } = (0,_react_google_maps_api__WEBPACK_IMPORTED_MODULE_3__.useLoadScript)({\n        googleMapsApiKey: \"AIzaSyBxDOIU7ucS-xy9GenrajkWINWsjVGNUi4\",\n        mapIds: [\n            \"35bc84e349dca82f\"\n        ]\n    });\n    const [map, setMap] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const onLoad = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((map)=>{\n        // This is just an example of getting and using the map instance!!! don't just blindly copy!\n        const bounds = new window.google.maps.LatLngBounds(center);\n        map.fitBounds(bounds);\n        setMap(map);\n    }, []);\n    const onUnmount = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((map)=>{\n        setMap(null);\n    }, []);\n    if (!isLoaded) {\n        return null;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_react_google_maps_api__WEBPACK_IMPORTED_MODULE_3__.GoogleMap, {\n            center: _page_consts__WEBPACK_IMPORTED_MODULE_2__.CENTER,\n            mapContainerClassName: (_page_module_scss__WEBPACK_IMPORTED_MODULE_4___default().map),\n            onLoad: onLoad,\n            onUnmount: onUnmount,\n            options: _page_consts__WEBPACK_IMPORTED_MODULE_2__.OPTIONS,\n            zoom: 12\n        }, void 0, false, {\n            fileName: \"/Users/martin.svatek/Development/dobrey-repo/app/learning/hidden-map/page.tsx\",\n            lineNumber: 35,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false);\n};\n_s(HiddenMap, \"mbUTBXEWAtqNqgdBHGXG/ALHJLU=\", false, function() {\n    return [\n        _react_google_maps_api__WEBPACK_IMPORTED_MODULE_3__.useLoadScript\n    ];\n});\n_c = HiddenMap;\n/* harmony default export */ __webpack_exports__[\"default\"] = (HiddenMap);\nvar _c;\n$RefreshReg$(_c, \"HiddenMap\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1jbGllbnQpLy4vYXBwL2xlYXJuaW5nL2hpZGRlbi1tYXAvcGFnZS50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFFa0U7QUFDaEI7QUFDRjtBQUNSO0FBR3hDLE1BQU1PLFlBQWdCLElBQU07O0lBQzFCLE1BQU0sRUFBRUMsU0FBUSxFQUFFLEdBQUdQLHFFQUFhQSxDQUFDO1FBQ2pDUSxrQkFBa0JDLHlDQUErQjtRQUNqREcsUUFBUTtZQUFDO1NBQW1CO0lBQzlCO0lBRUEsTUFBTSxDQUFDQyxLQUFLQyxPQUFPLEdBQUdaLCtDQUFRQSxDQUFhLElBQUk7SUFFL0MsTUFBTWEsU0FBU2Qsa0RBQVdBLENBQUMsQ0FBQ1ksTUFBYTtRQUN2Qyw0RkFBNEY7UUFDNUYsTUFBTUcsU0FBUyxJQUFJQyxPQUFPQyxNQUFNLENBQUNDLElBQUksQ0FBQ0MsWUFBWSxDQUFDQztRQUNuRFIsSUFBSVMsU0FBUyxDQUFDTjtRQUVkRixPQUFPRDtJQUNULEdBQUcsRUFBRTtJQUVMLE1BQU1VLFlBQVl0QixrREFBV0EsQ0FBQyxDQUFDWSxNQUFhO1FBQzFDQyxPQUFPLElBQUk7SUFDYixHQUFHLEVBQUU7SUFFTCxJQUFJLENBQUNQLFVBQVU7UUFDYixPQUFPLElBQUk7SUFDYixDQUFDO0lBRUQscUJBQ0U7a0JBQ0UsNEVBQUNSLDZEQUFTQTtZQUNSc0IsUUFBUWxCLGdEQUFNQTtZQUNkcUIsdUJBQXVCbkIsOERBQVU7WUFDakNVLFFBQVFBO1lBQ1JRLFdBQVdBO1lBQ1hFLFNBQVNyQixpREFBT0E7WUFDaEJzQixNQUFNOzs7Ozs7O0FBSWQ7R0FwQ01wQjs7UUFDaUJOLGlFQUFhQTs7O0tBRDlCTTtBQXNDTiwrREFBZUEsU0FBU0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvbGVhcm5pbmcvaGlkZGVuLW1hcC9wYWdlLnRzeD8wMTdkIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcblxuaW1wb3J0IHsgR29vZ2xlTWFwLCB1c2VMb2FkU2NyaXB0IH0gZnJvbSAnQHJlYWN0LWdvb2dsZS1tYXBzL2FwaSc7XG5pbXBvcnQgeyBGQywgdXNlQ2FsbGJhY2ssIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ0VOVEVSLCBPUFRJT05TIH0gZnJvbSAnLi9wYWdlLmNvbnN0cyc7XG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vcGFnZS5tb2R1bGUuc2Nzcyc7XG5pbXBvcnQgeyBNYXAgfSBmcm9tICcuL3BhZ2UudHlwZXMnO1xuXG5jb25zdCBIaWRkZW5NYXA6IEZDID0gKCkgPT4ge1xuICBjb25zdCB7IGlzTG9hZGVkIH0gPSB1c2VMb2FkU2NyaXB0KHtcbiAgICBnb29nbGVNYXBzQXBpS2V5OiBwcm9jZXNzLmVudi5HT09HTEVfTUFQU19BUElfS0VZISxcbiAgICBtYXBJZHM6IFsnMzViYzg0ZTM0OWRjYTgyZiddLFxuICB9KTtcblxuICBjb25zdCBbbWFwLCBzZXRNYXBdID0gdXNlU3RhdGU8TWFwIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3Qgb25Mb2FkID0gdXNlQ2FsbGJhY2soKG1hcDogTWFwKSA9PiB7XG4gICAgLy8gVGhpcyBpcyBqdXN0IGFuIGV4YW1wbGUgb2YgZ2V0dGluZyBhbmQgdXNpbmcgdGhlIG1hcCBpbnN0YW5jZSEhISBkb24ndCBqdXN0IGJsaW5kbHkgY29weSFcbiAgICBjb25zdCBib3VuZHMgPSBuZXcgd2luZG93Lmdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyhjZW50ZXIpO1xuICAgIG1hcC5maXRCb3VuZHMoYm91bmRzKTtcblxuICAgIHNldE1hcChtYXApO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgb25Vbm1vdW50ID0gdXNlQ2FsbGJhY2soKG1hcDogTWFwKSA9PiB7XG4gICAgc2V0TWFwKG51bGwpO1xuICB9LCBbXSk7XG5cbiAgaWYgKCFpc0xvYWRlZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPEdvb2dsZU1hcFxuICAgICAgICBjZW50ZXI9e0NFTlRFUn1cbiAgICAgICAgbWFwQ29udGFpbmVyQ2xhc3NOYW1lPXtzdHlsZXMubWFwfVxuICAgICAgICBvbkxvYWQ9e29uTG9hZH1cbiAgICAgICAgb25Vbm1vdW50PXtvblVubW91bnR9XG4gICAgICAgIG9wdGlvbnM9e09QVElPTlN9XG4gICAgICAgIHpvb209ezEyfVxuICAgICAgLz5cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhpZGRlbk1hcDtcbiJdLCJuYW1lcyI6WyJHb29nbGVNYXAiLCJ1c2VMb2FkU2NyaXB0IiwidXNlQ2FsbGJhY2siLCJ1c2VTdGF0ZSIsIkNFTlRFUiIsIk9QVElPTlMiLCJzdHlsZXMiLCJIaWRkZW5NYXAiLCJpc0xvYWRlZCIsImdvb2dsZU1hcHNBcGlLZXkiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX01BUFNfQVBJX0tFWSIsIm1hcElkcyIsIm1hcCIsInNldE1hcCIsIm9uTG9hZCIsImJvdW5kcyIsIndpbmRvdyIsImdvb2dsZSIsIm1hcHMiLCJMYXRMbmdCb3VuZHMiLCJjZW50ZXIiLCJmaXRCb3VuZHMiLCJvblVubW91bnQiLCJtYXBDb250YWluZXJDbGFzc05hbWUiLCJvcHRpb25zIiwiem9vbSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-client)/./app/learning/hidden-map/page.tsx\n"));

/***/ })

});