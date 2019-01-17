'use strict';

/**
 * Created by Egema on 2018/4/16.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DictionaryService = exports.http = exports.createInstance = undefined;

var _iotRequest = require('./libs/iotRequest');

var _DictionaryService = require('./libs/DictionaryService');

var _DictionaryService2 = _interopRequireDefault(_DictionaryService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createInstance = _iotRequest.createInstance;
exports.http = _iotRequest.http;
exports.DictionaryService = _DictionaryService2.default;