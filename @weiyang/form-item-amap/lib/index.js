"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/modal/style/css");

var _modal = _interopRequireDefault(require("antd/es/modal"));

require("antd/es/row/style/css");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/input/style/css");

var _input = _interopRequireDefault(require("antd/es/input"));

require("antd/es/col/style/css");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/switch/style/css");

var _switch = _interopRequireDefault(require("antd/es/switch"));

require("antd/es/button/style/css");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/message/style/css");

var _message = _interopRequireDefault(require("antd/es/message"));

var _react = _interopRequireDefault(require("react"));

var _reactAmap = require("react-amap");

var _reactAmapPluginGeolocation = _interopRequireDefault(require("react-amap-plugin-geolocation"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultKey = "5c7d3a7dd3595b94b5686070144ba540";
var toolButtonSize = 'default';

var MapSelect =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MapSelect, _React$Component);

  function MapSelect(props) {
    var _this;

    _classCallCheck(this, MapSelect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MapSelect).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "openTool", function () {
      if (_this.state.lbs.type === 'Point') {
        _this.tool.marker();
      } else if (_this.state.lbs.type === 'Polygon') {
        _this.tool.polygon();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "convertInputs", function (lbs) {
      console.log(lbs);

      if (lbs) {
        var state = {
          lbs: lbs,
          zoom: lbs.properties.zoom
        };

        if (lbs.type === 'Point') {
          state.pointInfo = {
            longitude: lbs.coordinates[0],
            latitude: lbs.coordinates[1]
          };
        } else if (lbs.type === 'Polygon') {
          var paths = lbs.coordinates[0];
          state.polygonInfo = {
            active: false,
            path: paths.map(function (point) {
              return {
                longitude: point[0],
                latitude: point[1]
              };
            })
          };
        }

        return state;
      } else {
        return {};
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "convertOutputs", function () {
      var _this$state = _this.state,
          lbs = _this$state.lbs,
          pointInfo = _this$state.pointInfo,
          polygonInfo = _this$state.polygonInfo;
      var outputs = {
        type: lbs.type,
        properties: {
          zoom: _this.mapInstance.getZoom()
        }
      };

      if (lbs.type === 'Point') {
        var pointArr = [pointInfo.longitude, pointInfo.latitude];
        outputs.coordinates = pointArr;
      } else if (lbs.type === 'Polygon') {
        var polygonArr = polygonInfo.path.map(function (point) {
          return [point.longitude, point.latitude];
        });
        polygonArr.push(polygonArr[0]);
        outputs.coordinates = [polygonArr];
      }

      return outputs;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "triggerChange", function (changedValue) {
      // 反馈表单项数据
      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(_objectSpread({}, changedValue));
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSearch", function () {
      var address = _this.addressTextInput.current.input.value;

      if (address !== '') {
        if (_this.state.inputType === 0) {
          _this.geocoder.getLocation(address, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              var location = result.geocodes[0].location;

              _this.setState({
                lbs: _objectSpread({}, _this.state.lbs, {
                  type: 'Point'
                }),
                pointInfo: {
                  longitude: location.lng,
                  latitude: location.lat
                }
              }, function () {
                _this.onPointSelect();
              });
            } else {
              // 获取经纬度失败
              _message.default.error('获取经纬度失败，建议点击地图右上角自动定位或者直接地图取点的方式');
            }
          });
        } else {
          // 以逗号分隔坐标
          var lnglats = address.split(',');

          if (lnglats.length === 2) {
            _this.setState({
              lbs: _objectSpread({}, _this.state.lbs, {
                type: 'Point'
              }),
              pointInfo: {
                longitude: lnglats[0],
                latitude: lnglats[1]
              }
            }, function () {
              _this.onPointSelect();
            });
          } else {
            _message.default.error('坐标值请以单个半角逗号分隔');
          }
        }
      } else {
        _message.default.warn('请输入详细地址信息或者坐标');
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "openModalView", function () {
      _this.setState({
        visible: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOk", function () {
      // 转储信息，输出到表单外部
      _this.triggerChange(_this.convertOutputs());

      _this.setState({
        visible: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleCancel", function () {
      _this.setState({
        visible: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "disabledPolygonTool", function () {
      _this.setState({
        polygonInfo: _objectSpread({}, _this.state.polygonInfo, {
          active: false
        })
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onPointSelect", function () {
      if (_this.tool) {
        _this.tool.marker();

        _this.setState({
          lbs: _objectSpread({}, _this.state.lbs, {
            type: 'Point'
          }),
          label: '准备绘制坐标点',
          polygonInfo: _objectSpread({}, _this.state.polygonInfo, {
            active: false
          })
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onPolygonSelect", function () {
      if (_this.tool) {
        _this.tool.polygon();

        _this.setState({
          lbs: _objectSpread({}, _this.state.lbs, {
            type: 'Polygon'
          }),
          label: '准备绘制多边形',
          polygonInfo: _objectSpread({}, _this.state.polygonInfo, {
            active: false
          })
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "drawWhat", function (obj) {
      var text = '';
      obj.hide();

      switch (obj.CLASS_NAME) {
        case 'AMap.Marker':
          text = "\u4F60\u7ED8\u5236\u4E86\u4E00\u4E2A\u6807\u8BB0\uFF0C\u5750\u6807\u4F4D\u7F6E\u662F {".concat(obj.getPosition(), "}"); // 获取点信息，并隐藏掉组件绘制的覆盖物

          var point = obj.getPosition();

          _this.setState({
            label: text,
            pointInfo: {
              longitude: point.lng,
              latitude: point.lat
            }
          });

          break;

        case 'AMap.Polygon':
          var path = obj.getPath().map(function (pathPoint) {
            return {
              longitude: pathPoint.lng,
              latitude: pathPoint.lat
            };
          });
          text = "\u4F60\u7ED8\u5236\u4E86\u4E00\u4E2A\u591A\u8FB9\u5F62\uFF0C\u6709".concat(path.length, "\u4E2A\u7AEF\u70B9");

          _this.setState({
            label: text,
            polygonInfo: _objectSpread({}, _this.state.polygonInfo, {
              path: path
            })
          });

          break;

        default:
          text = '';
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "close", function () {
      _this.disabledPolygonTool();

      if (_this.tool) {
        _this.tool.close();
      }

      _this.setState({
        lbs: _objectSpread({}, _this.state.lbs, {
          type: 'null'
        }),
        label: '未选择模式'
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputTypeChange", function (checked) {
      _this.setState({
        inputType: checked ? 0 : 1
      });
    });

    _this.addressTextInput = _react.default.createRef();
    var label = '未选择模式';

    if (props.value && props.value.type === 'Point') {
      label = '准备绘制坐标点';
    } else if (props.value && props.value.type === 'Polygon') {
      label = '准备绘制多边形';
    }

    _this.state = _objectSpread({
      inputType: 0,
      // 0 代表地址，1代表坐标
      lbs: {
        coordinates: [],
        type: 'null',
        properties: {}
      },
      pointInfo: {
        // 预设坐标点信息
        longitude: '118.778177',
        latitude: '31.8383'
      },
      polygonInfo: {
        // 预设多边形信息
        path: [],
        active: false // 是否编辑模式

      },
      zoom: 15,
      label: label,
      visible: false
    }, _this.convertInputs(props.value));
    _this.toolEvents = {
      created: function created(tool) {
        _this.tool = tool;

        _this.openTool();
      },
      draw: function draw(_ref) {
        var obj = _ref.obj;

        _this.drawWhat(obj);
      }
    };
    _this.polygonEvents = {
      dblclick: function dblclick() {
        // 双击进行编辑
        _this.setState({
          polygonInfo: _objectSpread({}, _this.state.polygonInfo, {
            active: !_this.state.polygonInfo.active
          })
        });
      }
    };
    _this.mapPlugins = ['ToolBar'];
    _this.pluginProps = {
      enableHighAccuracy: true,
      timeout: 10000,
      showButton: true
    };
    _this.amapEvents = {
      created: function created(mapInstance) {
        var _window = window,
            AMap = _window.AMap;
        _this.mapInstance = mapInstance;
        AMap.service(['AMap.ToolBar', 'AMap.Scale', 'AMap.Geocoder'], function () {
          mapInstance.addControl(new AMap.ToolBar());
          mapInstance.addControl(new AMap.Scale());
          _this.geocoder = new AMap.Geocoder({});
        });
      }
    };
    return _this;
  }

  _createClass(MapSelect, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      // 此处比较nextProps和this.props 提高性能 待实现
      if ('value' in nextProps) {
        var value = nextProps.value;

        if (value) {
          this.setState(_objectSpread({}, this.convertInputs(value)));
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var mapKey = this.props.mapKey;
      return _react.default.createElement("div", null, _react.default.createElement(_row.default, null, _react.default.createElement(_button.default, {
        onClick: this.openModalView
      }, "\u5B9A\u4F4D"), _react.default.createElement(_col.default, {
        span: 24
      }, _react.default.createElement(_modal.default, {
        title: "\u5730\u56FE\u9009\u62E9",
        visible: this.state.visible,
        width: 800,
        destroyOnClose: "true",
        onOk: this.handleOk,
        onCancel: this.handleCancel
      }, _react.default.createElement(_row.default, null, _react.default.createElement(_col.default, {
        span: 2,
        style: {
          height: 32,
          lineHeight: '30px'
        }
      }, _react.default.createElement(_switch.default, {
        checkedChildren: "\u5730\u5740",
        unCheckedChildren: "\u5750\u6807",
        checked: this.state.inputType === 0,
        onChange: this.onInputTypeChange
      })), _react.default.createElement(_col.default, {
        span: 6
      }, _react.default.createElement(_input.default, {
        ref: this.addressTextInput
      })), _react.default.createElement(_col.default, {
        span: 2
      }), _react.default.createElement(_col.default, {
        span: 6
      }, _react.default.createElement(_button.default, {
        onClick: this.onSearch
      }, "\u641C\u7D22")), _react.default.createElement(_col.default, {
        span: 8,
        className: _index.default.buttonContainer
      }, _react.default.createElement(_button.default, {
        className: "opButton",
        type: this.state.lbs.type === 'Point' ? 'primary' : null,
        size: toolButtonSize,
        onClick: this.onPointSelect
      }, "\u9009\u70B9"), _react.default.createElement(_button.default, {
        className: "opButton",
        type: this.state.lbs.type === 'Polygon' ? 'primary' : null,
        size: toolButtonSize,
        onClick: this.onPolygonSelect
      }, "\u9009\u533A\u57DF"), _react.default.createElement(_button.default, {
        className: "opButton",
        type: this.state.lbs.type === 'null' ? 'primary' : null,
        size: toolButtonSize,
        onClick: this.close
      }, "\u53D6\u6D88\u64CD\u4F5C")), _react.default.createElement(_col.default, {
        span: 24
      }, _react.default.createElement("div", {
        style: {
          width: '100%',
          height: 500,
          marginTop: 8
        }
      }, _react.default.createElement(_reactAmap.Map, {
        plugins: this.mapPlugins,
        amapkey: mapKey || defaultKey,
        zoom: this.state.zoom,
        center: this.state.pointInfo,
        events: this.amapEvents
      }, _react.default.createElement("div", {
        className: _index.default.layerStyle
      }, this.state.label), _react.default.createElement(_reactAmap.MouseTool, {
        events: this.toolEvents
      }), _react.default.createElement(_reactAmapPluginGeolocation.default, this.pluginProps), this.state.lbs.type === 'Point' ? _react.default.createElement(_reactAmap.Marker, {
        position: this.state.pointInfo
      }) : null, this.state.lbs.type === 'Polygon' ? _react.default.createElement(_reactAmap.Polygon, {
        events: this.polygonEvents,
        path: this.state.polygonInfo.path
      }, _react.default.createElement(_reactAmap.PolyEditor, {
        active: this.state.polygonInfo.active
      })) : null))))))));
    }
  }]);

  return MapSelect;
}(_react.default.Component);

exports.default = MapSelect;
//# sourceMappingURL=index.js.map