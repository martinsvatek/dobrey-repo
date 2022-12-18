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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _react_google_maps_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @react-google-maps/api */ \"(app-client)/./node_modules/@react-google-maps/api/dist/esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-client)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _page_consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page.consts */ \"(app-client)/./app/learning/hidden-map/page.consts.ts\");\n/* harmony import */ var _page_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./page.module.scss */ \"(app-client)/./app/learning/hidden-map/page.module.scss\");\n/* harmony import */ var _page_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_page_module_scss__WEBPACK_IMPORTED_MODULE_4__);\n\nvar _s = $RefreshSig$();\n\n\n\n\nconst HiddenMap = ()=>{\n    _s();\n    const { isLoaded  } = (0,_react_google_maps_api__WEBPACK_IMPORTED_MODULE_3__.useLoadScript)({\n        googleMapsApiKey: \"AIzaSyBxDOIU7ucS-xy9GenrajkWINWsjVGNUi4\",\n        mapIds: [\n            \"35bc84e349dca82f\"\n        ]\n    });\n    const [map, setMap] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const onLoad = useCallback(function callback(map) {\n        // This is just an example of getting and using the map instance!!! don't just blindly copy!\n        const bounds = new window.google.maps.LatLngBounds(center);\n        map.fitBounds(bounds);\n        setMap(map);\n    }, []);\n    const onUnmount = useCallback(function callback(map) {\n        setMap(null);\n    }, []);\n    if (!isLoaded) {\n        return null;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_react_google_maps_api__WEBPACK_IMPORTED_MODULE_3__.GoogleMap, {\n            center: _page_consts__WEBPACK_IMPORTED_MODULE_2__.CENTER,\n            mapContainerClassName: (_page_module_scss__WEBPACK_IMPORTED_MODULE_4___default().map),\n            onLoad: onLoad,\n            onUnmount: onUnmount,\n            options: _page_consts__WEBPACK_IMPORTED_MODULE_2__.OPTIONS,\n            zoom: 12\n        }, void 0, false, {\n            fileName: \"/Users/martin.svatek/Development/dobrey-repo/app/learning/hidden-map/page.tsx\",\n            lineNumber: 34,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false);\n};\n_s(HiddenMap, \"mbUTBXEWAtqNqgdBHGXG/ALHJLU=\", false, function() {\n    return [\n        _react_google_maps_api__WEBPACK_IMPORTED_MODULE_3__.useLoadScript\n    ];\n});\n_c = HiddenMap;\n/* harmony default export */ __webpack_exports__[\"default\"] = (HiddenMap);\nvar _c;\n$RefreshReg$(_c, \"HiddenMap\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1jbGllbnQpLy4vYXBwL2xlYXJuaW5nL2hpZGRlbi1tYXAvcGFnZS50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFFa0U7QUFDN0I7QUFDVztBQUNSO0FBRXhDLE1BQU1NLFlBQWdCLElBQU07O0lBQzFCLE1BQU0sRUFBRUMsU0FBUSxFQUFFLEdBQUdOLHFFQUFhQSxDQUFDO1FBQ2pDTyxrQkFBa0JDLHlDQUErQjtRQUNqREcsUUFBUTtZQUFDO1NBQW1CO0lBQzlCO0lBRUEsTUFBTSxDQUFDQyxLQUFLQyxPQUFPLEdBQUdaLCtDQUFRQSxDQUFDLElBQUk7SUFFbkMsTUFBTWEsU0FBU0MsWUFBWSxTQUFTQyxTQUFTSixHQUFHLEVBQUU7UUFDaEQsNEZBQTRGO1FBQzVGLE1BQU1LLFNBQVMsSUFBSUMsT0FBT0MsTUFBTSxDQUFDQyxJQUFJLENBQUNDLFlBQVksQ0FBQ0M7UUFDbkRWLElBQUlXLFNBQVMsQ0FBQ047UUFFZEosT0FBT0Q7SUFDVCxHQUFHLEVBQUU7SUFFTCxNQUFNWSxZQUFZVCxZQUFZLFNBQVNDLFNBQVNKLEdBQUcsRUFBRTtRQUNuREMsT0FBTyxJQUFJO0lBQ2IsR0FBRyxFQUFFO0lBRUwsSUFBSSxDQUFDUCxVQUFVO1FBQ2IsT0FBTyxJQUFJO0lBQ2IsQ0FBQztJQUVELHFCQUNFO2tCQUNFLDRFQUFDUCw2REFBU0E7WUFDUnVCLFFBQVFwQixnREFBTUE7WUFDZHVCLHVCQUF1QnJCLDhEQUFVO1lBQ2pDVSxRQUFRQTtZQUNSVSxXQUFXQTtZQUNYRSxTQUFTdkIsaURBQU9BO1lBQ2hCd0IsTUFBTTs7Ozs7OztBQUlkO0dBcENNdEI7O1FBQ2lCTCxpRUFBYUE7OztLQUQ5Qks7QUFzQ04sK0RBQWVBLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2xlYXJuaW5nL2hpZGRlbi1tYXAvcGFnZS50c3g/MDE3ZCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5cbmltcG9ydCB7IEdvb2dsZU1hcCwgdXNlTG9hZFNjcmlwdCB9IGZyb20gJ0ByZWFjdC1nb29nbGUtbWFwcy9hcGknO1xuaW1wb3J0IHsgRkMsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ0VOVEVSLCBPUFRJT05TIH0gZnJvbSAnLi9wYWdlLmNvbnN0cyc7XG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vcGFnZS5tb2R1bGUuc2Nzcyc7XG5cbmNvbnN0IEhpZGRlbk1hcDogRkMgPSAoKSA9PiB7XG4gIGNvbnN0IHsgaXNMb2FkZWQgfSA9IHVzZUxvYWRTY3JpcHQoe1xuICAgIGdvb2dsZU1hcHNBcGlLZXk6IHByb2Nlc3MuZW52LkdPT0dMRV9NQVBTX0FQSV9LRVkhLFxuICAgIG1hcElkczogWyczNWJjODRlMzQ5ZGNhODJmJ10sXG4gIH0pO1xuXG4gIGNvbnN0IFttYXAsIHNldE1hcF0gPSB1c2VTdGF0ZShudWxsKTtcblxuICBjb25zdCBvbkxvYWQgPSB1c2VDYWxsYmFjayhmdW5jdGlvbiBjYWxsYmFjayhtYXApIHtcbiAgICAvLyBUaGlzIGlzIGp1c3QgYW4gZXhhbXBsZSBvZiBnZXR0aW5nIGFuZCB1c2luZyB0aGUgbWFwIGluc3RhbmNlISEhIGRvbid0IGp1c3QgYmxpbmRseSBjb3B5IVxuICAgIGNvbnN0IGJvdW5kcyA9IG5ldyB3aW5kb3cuZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKGNlbnRlcik7XG4gICAgbWFwLmZpdEJvdW5kcyhib3VuZHMpO1xuXG4gICAgc2V0TWFwKG1hcCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBvblVubW91bnQgPSB1c2VDYWxsYmFjayhmdW5jdGlvbiBjYWxsYmFjayhtYXApIHtcbiAgICBzZXRNYXAobnVsbCk7XG4gIH0sIFtdKTtcblxuICBpZiAoIWlzTG9hZGVkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8R29vZ2xlTWFwXG4gICAgICAgIGNlbnRlcj17Q0VOVEVSfVxuICAgICAgICBtYXBDb250YWluZXJDbGFzc05hbWU9e3N0eWxlcy5tYXB9XG4gICAgICAgIG9uTG9hZD17b25Mb2FkfVxuICAgICAgICBvblVubW91bnQ9e29uVW5tb3VudH1cbiAgICAgICAgb3B0aW9ucz17T1BUSU9OU31cbiAgICAgICAgem9vbT17MTJ9XG4gICAgICAvPlxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSGlkZGVuTWFwO1xuIl0sIm5hbWVzIjpbIkdvb2dsZU1hcCIsInVzZUxvYWRTY3JpcHQiLCJ1c2VTdGF0ZSIsIkNFTlRFUiIsIk9QVElPTlMiLCJzdHlsZXMiLCJIaWRkZW5NYXAiLCJpc0xvYWRlZCIsImdvb2dsZU1hcHNBcGlLZXkiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX01BUFNfQVBJX0tFWSIsIm1hcElkcyIsIm1hcCIsInNldE1hcCIsIm9uTG9hZCIsInVzZUNhbGxiYWNrIiwiY2FsbGJhY2siLCJib3VuZHMiLCJ3aW5kb3ciLCJnb29nbGUiLCJtYXBzIiwiTGF0TG5nQm91bmRzIiwiY2VudGVyIiwiZml0Qm91bmRzIiwib25Vbm1vdW50IiwibWFwQ29udGFpbmVyQ2xhc3NOYW1lIiwib3B0aW9ucyIsInpvb20iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-client)/./app/learning/hidden-map/page.tsx\n"));

/***/ })

});