'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _toArray = require('rc-util/lib/Children/toArray');

var _toArray2 = _interopRequireDefault(_toArray);

var _rcMenu = require('rc-menu');

var _rcMenu2 = _interopRequireDefault(_rcMenu);

var _domScrollIntoView = require('dom-scroll-into-view');

var _domScrollIntoView2 = _interopRequireDefault(_domScrollIntoView);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DropdownMenu = function (_React$Component) {
  (0, _inherits3['default'])(DropdownMenu, _React$Component);

  function DropdownMenu() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, DropdownMenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).call.apply(_ref, [this].concat(args))), _this), _this.scrollActiveItemToView = function () {
      // scroll into view
      var itemComponent = (0, _reactDom.findDOMNode)(_this.firstActiveItem);
      var props = _this.props;

      if (itemComponent) {
        var scrollIntoViewOpts = {
          onlyScrollIfNeeded: true
        };
        if ((!props.value || props.value.length === 0) && props.firstActiveValue) {
          scrollIntoViewOpts.alignWithTop = true;
        }

        (0, _domScrollIntoView2['default'])(itemComponent, (0, _reactDom.findDOMNode)(_this.refs.menu), scrollIntoViewOpts);
      }
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  (0, _createClass3['default'])(DropdownMenu, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.lastInputValue = this.props.inputValue;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scrollActiveItemToView();
      this.lastVisible = this.props.visible;
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (!nextProps.visible) {
        this.lastVisible = false;
      }
      // freeze when hide
      return nextProps.visible;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var props = this.props;
      if (!prevProps.visible && props.visible) {
        this.scrollActiveItemToView();
      }
      this.lastVisible = props.visible;
      this.lastInputValue = props.inputValue;
    }
  }, {
    key: 'renderMenu',
    value: function renderMenu() {
      var _this2 = this;

      var props = this.props;
      var menuItems = props.menuItems,
          defaultActiveFirstOption = props.defaultActiveFirstOption,
          value = props.value,
          prefixCls = props.prefixCls,
          multiple = props.multiple,
          onMenuSelect = props.onMenuSelect,
          inputValue = props.inputValue,
          firstActiveValue = props.firstActiveValue;

      if (menuItems && menuItems.length) {
        var menuProps = {};
        if (multiple) {
          menuProps.onDeselect = props.onMenuDeselect;
          menuProps.onSelect = onMenuSelect;
        } else {
          menuProps.onClick = onMenuSelect;
        }

        var selectedKeys = (0, _util.getSelectKeys)(menuItems, value);
        var activeKeyProps = {};

        var clonedMenuItems = menuItems;
        if (selectedKeys.length || firstActiveValue) {
          if (props.visible && !this.lastVisible) {
            activeKeyProps.activeKey = selectedKeys[0] || firstActiveValue;
          }
          var foundFirst = false;
          // set firstActiveItem via cloning menus
          // for scroll into view
          var clone = function clone(item) {
            if (!foundFirst && selectedKeys.indexOf(item.key) !== -1 || !foundFirst && !selectedKeys.length && firstActiveValue.indexOf(item.key) !== -1) {
              foundFirst = true;
              return (0, _react.cloneElement)(item, {
                ref: function ref(_ref2) {
                  _this2.firstActiveItem = _ref2;
                }
              });
            }
            return item;
          };

          clonedMenuItems = menuItems.map(function (item) {
            if (item.type.isMenuItemGroup) {
              var children = (0, _toArray2['default'])(item.props.children).map(clone);
              return (0, _react.cloneElement)(item, {}, children);
            }
            return clone(item);
          });
        }

        // clear activeKey when inputValue change
        if (inputValue !== this.lastInputValue) {
          activeKeyProps.activeKey = '';
        }

        return _react2['default'].createElement(
          _rcMenu2['default'],
          (0, _extends3['default'])({
            ref: 'menu',
            style: this.props.dropdownMenuStyle,
            defaultActiveFirst: defaultActiveFirstOption
          }, activeKeyProps, {
            multiple: multiple,
            focusable: false
          }, menuProps, {
            selectedKeys: selectedKeys,
            prefixCls: prefixCls + '-menu'
          }),
          clonedMenuItems
        );
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var renderMenu = this.renderMenu();
      return renderMenu ? _react2['default'].createElement(
        'div',
        {
          style: { overflow: 'auto' },
          onFocus: this.props.onPopupFocus,
          onMouseDown: _util.preventDefaultEvent
        },
        renderMenu
      ) : null;
    }
  }]);
  return DropdownMenu;
}(_react2['default'].Component);

DropdownMenu.propTypes = {
  defaultActiveFirstOption: _propTypes2['default'].bool,
  value: _propTypes2['default'].any,
  dropdownMenuStyle: _propTypes2['default'].object,
  multiple: _propTypes2['default'].bool,
  onPopupFocus: _propTypes2['default'].func,
  onMenuDeSelect: _propTypes2['default'].func,
  onMenuSelect: _propTypes2['default'].func,
  prefixCls: _propTypes2['default'].string,
  menuItems: _propTypes2['default'].any,
  inputValue: _propTypes2['default'].string,
  visible: _propTypes2['default'].bool
};
exports['default'] = DropdownMenu;


DropdownMenu.displayName = 'DropdownMenu';
module.exports = exports['default'];