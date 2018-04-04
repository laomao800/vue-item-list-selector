(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue-property-decorator"));
	else if(typeof define === 'function' && define.amd)
		define("item-list-selector", ["vue-property-decorator"], factory);
	else if(typeof exports === 'object')
		exports["item-list-selector"] = factory(require("vue-property-decorator"));
	else
		root["ItemListSelector"] = factory(root["VuePropertyDecorator"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_9__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _vuePropertyDecorator = __webpack_require__(9);

var _markMatch = __webpack_require__(10);

var _markMatch2 = _interopRequireDefault(_markMatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ItemListSelector = function (_Vue) {
    _inherits(ItemListSelector, _Vue);

    function ItemListSelector() {
        _classCallCheck(this, ItemListSelector);

        var _this = _possibleConstructorReturn(this, (ItemListSelector.__proto__ || Object.getPrototypeOf(ItemListSelector)).apply(this, arguments));

        _this.keyword = '';
        _this.curPage = 1;
        _this.optionActiveIndex = -1;
        return _this;
    }
    /**
     * 返回当前可选项分页后用于展示的数据
     *
     * @readonly
     * @type {Object[]}
     * @memberof ItemListSelector
     */


    _createClass(ItemListSelector, [{
        key: "onKeywordChanged",

        /**
         * 关键字有变动则结果重设回第一页
         *
         * @memberof ItemListSelector
         */
        value: function onKeywordChanged() {
            this.curPage = 1;
            this.optionActiveIndex = -1;
        }
        /**
         * 设置当前组件选项值，原有已选项会被覆盖
         *
         * @param {(item: Object) => Boolean} filterFunc 筛选函数，内部应用于 Array.filter()
         * @memberof ItemListSelector
         */

    }, {
        key: "setSelection",
        value: function setSelection(filterFunc) {
            // istanbul ignore if
            if (typeof filterFunc !== 'function') {
                throw Error('[item-list-selector] "setSelection()" accept a function as argument.');
            }
            var newSelection = this.data.filter(filterFunc);
            this.$emit('selection-change', newSelection);
        }
        /**
         * 添加当前组件选项值，在原有已选项上添加
         *
         * @param {(item: Object) => Boolean} filterFunc 筛选函数，内部应用于 Array.filter()
         * @memberof ItemListSelector
         */

    }, {
        key: "addSelection",
        value: function addSelection(filterFunc) {
            var _this2 = this;

            // istanbul ignore if
            // tslint:disable-next-line
            if (typeof filterFunc !== 'function') {
                throw Error('[item-list-selector] "addSelection()" accept a function as argument.');
            }
            var filtedSelection = this.data.filter(function (item) {
                return filterFunc(item) && !_this2.isSelected(item);
            });
            var newSelection = [].concat(_toConsumableArray(this.selection), _toConsumableArray(filtedSelection));
            this.$emit('selection-change', newSelection);
        }
        /**
         * 在已选项中匹配命中 filterFunc 的选项
         *
         * @param {(item: Object) => Boolean} filterFunc 筛选函数，内部应用于 Array.filter()
         * @memberof ItemListSelector
         */

    }, {
        key: "removeSelection",
        value: function removeSelection(filterFunc) {
            // istanbul ignore if
            // tslint:disable-next-line
            if (typeof filterFunc !== 'function') {
                throw Error('[item-list-selector] "removeSelection()" accept a function as argument.');
            }
            var newSelection = this.selection.filter(function (item) {
                return !filterFunc(item);
            });
            this.$emit('selection-change', newSelection);
        }
        /**
         * 重置组件状态
         *
         * @memberof ItemListSelector
         */

    }, {
        key: "reset",
        value: function reset() {
            this.curPage = 1;
            this.keyword = '';
            this.$emit('selection-change', []);
        }
        /**
         * 匹配高亮关键字，用于筛选时生成选项
         *
         * @private
         * @param {string} text 待处理字符
         * @returns {string} 匹配高亮后的字符
         * @memberof ItemListSelector
         */

    }, {
        key: "highlightMatch",
        value: function highlightMatch(text, config) {
            return this.keyword ? (0, _markMatch2.default)(text, this.keyword, config) : text;
        }
        /**
         * 判断选项数据是否处于选中状态
         *
         * @private
         * @param {Object} item 待判断数据
         * @returns {boolean} 是否处于选中状态
         * @memberof ItemListSelector
         */

    }, {
        key: "isSelected",
        value: function isSelected(item) {
            return this.selection && this.selection.indexOf(item) > -1;
        }
        /**
         * 输入框键盘特殊键位处理，包括：上下移动高亮选项、前后翻页、回车选中高亮选项
         *
         * @private
         * @param {KeyboardEvent} e KeyboardEvent
         * @memberof ItemListSelector
         */

    }, {
        key: "handleKeywordInput",
        value: function handleKeywordInput(e) {
            switch (e.keyCode) {
                case 38:
                    this.activePrevOptions();
                    break;
                case 40:
                    this.activeNextOptions();
                    break;
                case 33:
                    e.preventDefault();
                    this.goPrevPage();
                    break;
                case 34:
                    e.preventDefault();
                    this.goNextPage();
                    break;
                case 13:
                    this.toggleSelection(this.optionActiveIndex);
                    break;
            }
        }
    }, {
        key: "goPrevPage",
        value: function goPrevPage() {
            this.optionActiveIndex = -1;
            this.curPage = Math.max(this.curPage - 1, 1);
        }
    }, {
        key: "goNextPage",
        value: function goNextPage() {
            this.optionActiveIndex = -1;
            this.curPage = Math.min(this.curPage + 1, this.totalPage);
        }
        /**
         * 往前移动高亮光标
         *
         * @private
         * @memberof ItemListSelector
         */

    }, {
        key: "activePrevOptions",
        value: function activePrevOptions() {
            if (this.optionActiveIndex < 1) {
                this.optionActiveIndex = this.showingData.length - 1;
            } else {
                this.optionActiveIndex--;
            }
        }
        /**
         * 往后移动高亮光标
         *
         * @private
         * @memberof ItemListSelector
         */

    }, {
        key: "activeNextOptions",
        value: function activeNextOptions() {
            if (this.optionActiveIndex < this.showingData.length - 1) {
                this.optionActiveIndex++;
            } else {
                this.optionActiveIndex = 0;
            }
        }
        /**
         * 切换选项选中状态，
         * 用于切换当前高亮选项选中状态、鼠标点击选项
         *
         * @private
         * @memberof ItemListSelector
         */

    }, {
        key: "toggleSelection",
        value: function toggleSelection(targetIndex) {
            var item = this.showingData[targetIndex];
            // istanbul ignore if
            if (!item) {
                return;
            }
            var index = this.selection.indexOf(item);
            var newSelection = [].concat(_toConsumableArray(this.selection));
            if (index > -1) {
                newSelection.splice(index, 1);
                this.$emit('selection-remove', item, newSelection);
            } else {
                newSelection.push(item);
                this.$emit('selection-add', item, newSelection);
            }
            this.$emit('selection-change', newSelection);
        }
    }, {
        key: "showingData",
        get: function get() {
            if (this.usePage) {
                return [].concat(_toConsumableArray(this.filtedData)).splice((this.curPage - 1) * this.pageSize, this.pageSize);
            } else {
                return this.filtedData;
            }
        }
        /**
         * 根据关键字返回匹配过滤结果
         *
         * @readonly
         * @type {Object[]}
         * @memberof ItemListSelector
         */

    }, {
        key: "filtedData",
        get: function get() {
            var _this3 = this;

            return this.keyword === '' ? [].concat(_toConsumableArray(this.data)) : this.data.filter(function (r) {
                return _this3.optionTemplate(r).toLowerCase().indexOf(_this3.keyword.toLowerCase()) > -1;
            });
        }
        /**
         * 根据过滤结果计算分页总页码
         *
         * @readonly
         * @type {number}
         * @memberof ItemListSelector
         */

    }, {
        key: "totalPage",
        get: function get() {
            return this.usePage ? Math.ceil(this.filtedData.length / this.pageSize) || 1 : 1;
        }
    }]);

    return ItemListSelector;
}(_vuePropertyDecorator.Vue);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Array, default: function _default() {
        return [];
    } }), (0, _vuePropertyDecorator.Model)('selection-change')], ItemListSelector.prototype, "selection", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Array, default: function _default() {
        return [];
    } })], ItemListSelector.prototype, "data", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Boolean, default: true })], ItemListSelector.prototype, "usePage", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: Number, default: 10 })], ItemListSelector.prototype, "pageSize", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: String, default: '无匹配记录' })], ItemListSelector.prototype, "notFoundText", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: String, default: '请输入搜索关键字' })], ItemListSelector.prototype, "searchText", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: String, default: '上一页' })], ItemListSelector.prototype, "prevPageText", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({ type: String, default: '下一页' })], ItemListSelector.prototype, "nextPageText", void 0);
__decorate([(0, _vuePropertyDecorator.Prop)({
    type: Function,
    default: function _default(option) {
        return option && option.label ? option.label : '';
    }
})], ItemListSelector.prototype, "optionTemplate", void 0);
__decorate([(0, _vuePropertyDecorator.Watch)('keyword')], ItemListSelector.prototype, "onKeywordChanged", null);
ItemListSelector = __decorate([_vuePropertyDecorator.Component], ItemListSelector);
exports.default = ItemListSelector;
module.exports = exports["default"];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _itemListSelector = __webpack_require__(2);

var _itemListSelector2 = _interopRequireDefault(_itemListSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _itemListSelector2.default;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_ts_loader_transpileOnly_false_node_modules_vue_loader_lib_selector_type_script_index_0_item_list_selector_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_ts_loader_transpileOnly_false_node_modules_vue_loader_lib_selector_type_script_index_0_item_list_selector_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_ts_loader_transpileOnly_false_node_modules_vue_loader_lib_selector_type_script_index_0_item_list_selector_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_ts_loader_transpileOnly_false_node_modules_vue_loader_lib_selector_type_script_index_0_item_list_selector_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_ts_loader_transpileOnly_false_node_modules_vue_loader_lib_selector_type_script_index_0_item_list_selector_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6f9ac224_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_item_list_selector_vue__ = __webpack_require__(11);
function injectStyle (ssrContext) {
  __webpack_require__(3)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_ts_loader_transpileOnly_false_node_modules_vue_loader_lib_selector_type_script_index_0_item_list_selector_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6f9ac224_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_item_list_selector_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(6)("7280466c", content, true, {});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(false);
// imports


// module
exports.push([module.i, "\n.item-selector {\n  position: relative;\n  height: 100%;\n  line-height: 1;\n  /* 分页 */\n}\n.item-selector__searchbar {\n  background-color: #fff;\n  padding: 8px;\n}\n.item-selector__searchbar-inner {\n  position: relative;\n}\n.item-selector__searchbar-inner input {\n  width: 100%;\n  height: 30px;\n  padding: 0 8px;\n  border: 1px solid #eee;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  outline: none;\n  background-color: transparent;\n  font-size: 12px;\n}\n.item-selector__searchbar-inner input:focus {\n  border-color: #66afe9;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);\n}\n.item-selector__searchbar-clean {\n  width: 20px;\n  height: 20px;\n  line-height: 20px;\n  position: absolute;\n  top: 50%;\n  right: 5px;\n  margin-top: -10px;\n  text-align: center;\n  cursor: pointer;\n  opacity: .6;\n}\n.item-selector__searchbar-clean:hover {\n  opacity: 1;\n}\n.item-selector__searchbar-clean::before,\n.item-selector__searchbar-clean::after {\n  content: '';\n  position: absolute;\n  width: 16px;\n  height: 1px;\n  background-color: #999;\n  left: 50%;\n  top: 50%;\n  margin-left: -8px;\n}\n.item-selector__searchbar-clean::before {\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n}\n.item-selector__searchbar-clean::after {\n  -webkit-transform: rotate(-45deg);\n          transform: rotate(-45deg);\n}\n.item-selector__options {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.item-selector__option {\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 1.8em;\n  display: block;\n  clear: both;\n  padding: 5px 30px 5px 10px;\n  cursor: pointer;\n  text-align: left;\n  word-break: break-all;\n  color: #333;\n  border-top: 1px solid #efefef;\n  position: relative;\n}\n.item-selector__option:hover {\n  background-color: #f7f7f7;\n}\n.item-selector__option:hover::after {\n  display: block;\n}\n.item-selector__option::after {\n  position: absolute;\n  top: 50%;\n  right: 15px;\n  display: none;\n  width: 4px;\n  height: 12px;\n  margin-top: -8px;\n  content: '';\n  -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n  text-align: center;\n  border: solid #ddd;\n  border-width: 0 3px 2px 0;\n}\n.item-selector .option-checked {\n  background-color: #eaf8fe;\n  color: #666;\n  border-top: 1px solid #d8eef7;\n  border-bottom: 1px solid #d8eef7;\n  z-index: 1;\n  margin-bottom: -1px;\n}\n.item-selector .option-checked.select__option-active {\n  background-color: #dff6ff;\n}\n.item-selector .option-checked::after {\n  display: block;\n  border-color: #2db7f5;\n}\n.item-selector .option-checked:hover {\n  background-color: #dff6ff;\n}\n.item-selector .option-active {\n  background-color: #dff6ff;\n}\n.item-selector .option-active::after {\n  display: block;\n}\n.item-selector .option-active:hover {\n  background-color: #e6f8ff;\n}\n.item-selector__option-notfound {\n  font-size: 12px;\n  font-weight: 400;\n  line-height: 1.8em;\n  padding: 10px 0;\n  text-align: center;\n}\n.item-selector .match {\n  color: #000;\n  background-color: #ff6;\n}\n.item-selector__page {\n  font-size: 12px;\n  line-height: 2em;\n  padding: 5px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  text-align: center;\n  background-color: #f9f9f9;\n  border-top: 1px solid #ddd;\n}\n.item-selector .pagelink {\n  padding: 0 5px;\n  color: #333;\n}\n.item-selector .pagelink:hover {\n  cursor: pointer;\n  background-color: #efefef;\n}\n.item-selector .pagelink-disabled {\n  color: #999;\n}\n.item-selector .pagelink-disabled:hover {\n  cursor: not-allowed;\n  background-color: transparent;\n}\n.item-selector .pagelink-prev {\n  float: left;\n}\n.item-selector .pagelink-prev::after {\n  padding: 0 5px;\n}\n.item-selector .pagelink-next {\n  float: right;\n}\n.item-selector .pagelink-next::after {\n  padding: 0 5px;\n}\n.item-selector .pagenum .spe {\n  padding: 0 5px;\n}\n", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(7)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = markMatch;
/**
 * 标记关键字
 * @param  {String} text    待处理字符串
 * @param  {String} keyword 关键字
 * @param  {Object} config  { tag: 生成标记 html 标签, className: 生成标记 html 标签 class 属性值 }
 * @return {String}         标记出关键字后的字符串
 */
function markMatch(text, keyword) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _config$tag = config.tag,
        tag = _config$tag === undefined ? 'span' : _config$tag,
        _config$className = config.className,
        className = _config$className === undefined ? 'match' : _config$className;
    // tslint:disable-next-line

    if (!keyword || !(keyword = keyword.trim())) {
        return text;
    } else {
        var escapedKeyword = keyword.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        var reg = new RegExp(escapedKeyword, 'gi');
        return text.replace(reg, function (match) {
            return '<' + tag + ' class="' + className + '">' + match + '</' + tag + '>';
        });
    }
}
module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"item-selector"},[_c('div',{staticClass:"item-selector__searchbar"},[_c('div',{staticClass:"item-selector__searchbar-inner"},[(_vm.keyword !== '')?_c('div',{staticClass:"item-selector__searchbar-clean",on:{"click":function($event){_vm.keyword = ''}}}):_vm._e(),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.trim",value:(_vm.keyword),expression:"keyword",modifiers:{"trim":true}}],attrs:{"type":"text","placeholder":_vm.searchText},domProps:{"value":(_vm.keyword)},on:{"keyup":function($event){_vm.handleKeywordInput($event)},"input":function($event){if($event.target.composing){ return; }_vm.keyword=$event.target.value.trim()},"blur":function($event){_vm.$forceUpdate()}}})])]),_vm._v(" "),_c('div',{staticClass:"item-selector__result"},[_c('ul',{staticClass:"item-selector__options"},[(_vm.showingData.length === 0)?_c('li',{staticClass:"item-selector__option-notfound"},[_vm._v(_vm._s(_vm.notFoundText))]):_vm._e(),_vm._v(" "),_vm._l((_vm.showingData),function(item,index){return _c('li',{key:index,class:[
          'item-selector__option',
          {
            'option-checked': _vm.isSelected(item),
            'option-active': index === _vm.optionActiveIndex
          }
        ],domProps:{"innerHTML":_vm._s(_vm.highlightMatch(_vm.optionTemplate(item)))},on:{"click":function($event){_vm.toggleSelection(index)}}})})],2)]),_vm._v(" "),(_vm.usePage)?_c('div',{staticClass:"item-selector__page"},[_c('span',{class:['pagelink', 'pagelink-prev', { 'pagelink-disabled': _vm.curPage === 1 }],on:{"click":_vm.goPrevPage}},[_vm._v(_vm._s(_vm.prevPageText))]),_vm._v(" "),_c('span',{staticClass:"page-num"},[_c('span',{staticClass:"cur"},[_vm._v(_vm._s(_vm.curPage))]),_vm._v(" "),_c('span',{staticClass:"spe"},[_vm._v("/")]),_vm._v(" "),_c('span',{staticClass:"total"},[_vm._v(_vm._s(_vm.totalPage))])]),_vm._v(" "),_c('span',{class:['pagelink', 'pagelink-next', { 'pagelink-disabled': _vm.curPage === _vm.totalPage }],on:{"click":_vm.goNextPage}},[_vm._v(_vm._s(_vm.nextPageText))])]):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })
/******/ ]);
});