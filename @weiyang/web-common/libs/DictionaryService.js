/**
 * Created by pengj on 2018-4-12.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _iotRequest = require('./iotRequest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DictionaryService = function () {
  function DictionaryService() {
    (0, _classCallCheck3.default)(this, DictionaryService);
  }

  (0, _createClass3.default)(DictionaryService, null, [{
    key: 'optionsByDicTypeCode',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dicTypeCode) {
        var result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _iotRequest.http.post('/api/ziot/tms/datadictionaryvalue/select-data-dictionary-value-group', { dicTypeCode: dicTypeCode });

              case 2:
                result = _context.sent;
                return _context.abrupt('return', result);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function optionsByDicTypeCode(_x) {
        return _ref.apply(this, arguments);
      }

      return optionsByDicTypeCode;
    }()
  }, {
    key: 'query',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var cond = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var result;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _iotRequest.http.post('/api/ziot/tms/datadictionaryvalue/get-data-dictionary-value', cond);

              case 2:
                result = _context2.sent;
                return _context2.abrupt('return', result);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function query() {
        return _ref2.apply(this, arguments);
      }

      return query;
    }()
  }]);
  return DictionaryService;
}();

// DictionaryService.optionsByDicTypeCode().then(console.log, console.log);


exports.default = DictionaryService;