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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _react_google_maps_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @react-google-maps/api */ \"(app-client)/./node_modules/@react-google-maps/api/dist/esm.js\");\n/* harmony import */ var _page_consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page.consts */ \"(app-client)/./app/learning/hidden-map/page.consts.ts\");\n/* harmony import */ var _page_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page.module.scss */ \"(app-client)/./app/learning/hidden-map/page.module.scss\");\n/* harmony import */ var _page_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_page_module_scss__WEBPACK_IMPORTED_MODULE_3__);\n\nvar _s = $RefreshSig$();\n\n\n\nconst HiddenMap = ()=>{\n    _s();\n    const { isLoaded  } = (0,_react_google_maps_api__WEBPACK_IMPORTED_MODULE_2__.useLoadScript)({\n        googleMapsApiKey: \"AIzaSyBxDOIU7ucS-xy9GenrajkWINWsjVGNUi4\",\n        mapIds: [\n            \"35bc84e349dca82f\"\n        ]\n    });\n    if (!isLoaded) {\n        return null;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_react_google_maps_api__WEBPACK_IMPORTED_MODULE_2__.GoogleMap, {\n            mapContainerClassName: (_page_module_scss__WEBPACK_IMPORTED_MODULE_3___default().map),\n            options: _page_consts__WEBPACK_IMPORTED_MODULE_1__.OPTIONS,\n            zoom: 12\n        }, void 0, false, {\n            fileName: \"/Users/martin.svatek/Development/dobrey-repo/app/learning/hidden-map/page.tsx\",\n            lineNumber: 20,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false);\n};\n_s(HiddenMap, \"0WnOjCnOubliry/bcWK4XUbomlA=\", false, function() {\n    return [\n        _react_google_maps_api__WEBPACK_IMPORTED_MODULE_2__.useLoadScript\n    ];\n});\n_c = HiddenMap;\n/* harmony default export */ __webpack_exports__[\"default\"] = (HiddenMap);\nvar _c;\n$RefreshReg$(_c, \"HiddenMap\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1jbGllbnQpLy4vYXBwL2xlYXJuaW5nL2hpZGRlbi1tYXAvcGFnZS50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBRWtFO0FBRTFCO0FBQ0E7QUFFeEMsTUFBTUksWUFBZ0IsSUFBTTs7SUFDMUIsTUFBTSxFQUFFQyxTQUFRLEVBQUUsR0FBR0oscUVBQWFBLENBQUM7UUFDakNLLGtCQUFrQkMseUNBQStCO1FBQ2pERyxRQUFRO1lBQUM7U0FBbUI7SUFDOUI7SUFFQSxJQUFJLENBQUNMLFVBQVU7UUFDYixPQUFPLElBQUk7SUFDYixDQUFDO0lBRUQscUJBQ0U7a0JBQ0UsNEVBQUNMLDZEQUFTQTtZQUFDVyx1QkFBdUJSLDhEQUFVO1lBQUVVLFNBQVNYLGlEQUFPQTtZQUFFWSxNQUFNOzs7Ozs7O0FBRzVFO0dBZk1WOztRQUNpQkgsaUVBQWFBOzs7S0FEOUJHO0FBaUJOLCtEQUFlQSxTQUFTQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9sZWFybmluZy9oaWRkZW4tbWFwL3BhZ2UudHN4PzAxN2QiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuXG5pbXBvcnQgeyBHb29nbGVNYXAsIHVzZUxvYWRTY3JpcHQgfSBmcm9tICdAcmVhY3QtZ29vZ2xlLW1hcHMvYXBpJztcbmltcG9ydCB7IEZDIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgT1BUSU9OUyB9IGZyb20gJy4vcGFnZS5jb25zdHMnO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3BhZ2UubW9kdWxlLnNjc3MnO1xuXG5jb25zdCBIaWRkZW5NYXA6IEZDID0gKCkgPT4ge1xuICBjb25zdCB7IGlzTG9hZGVkIH0gPSB1c2VMb2FkU2NyaXB0KHtcbiAgICBnb29nbGVNYXBzQXBpS2V5OiBwcm9jZXNzLmVudi5HT09HTEVfTUFQU19BUElfS0VZISxcbiAgICBtYXBJZHM6IFsnMzViYzg0ZTM0OWRjYTgyZiddLFxuICB9KTtcblxuICBpZiAoIWlzTG9hZGVkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8R29vZ2xlTWFwIG1hcENvbnRhaW5lckNsYXNzTmFtZT17c3R5bGVzLm1hcH0gb3B0aW9ucz17T1BUSU9OU30gem9vbT17MTJ9IC8+XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIaWRkZW5NYXA7XG4iXSwibmFtZXMiOlsiR29vZ2xlTWFwIiwidXNlTG9hZFNjcmlwdCIsIk9QVElPTlMiLCJzdHlsZXMiLCJIaWRkZW5NYXAiLCJpc0xvYWRlZCIsImdvb2dsZU1hcHNBcGlLZXkiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX01BUFNfQVBJX0tFWSIsIm1hcElkcyIsIm1hcENvbnRhaW5lckNsYXNzTmFtZSIsIm1hcCIsIm9wdGlvbnMiLCJ6b29tIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-client)/./app/learning/hidden-map/page.tsx\n"));

/***/ })

});