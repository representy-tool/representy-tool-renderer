'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logWith = require('log-with');

var _logWith2 = _interopRequireDefault(_logWith);

var _markdown = require('markdown');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const logger = (0, _logWith2.default)(module);

class Renderer {

  static render(payload, options) {
    return _asyncToGenerator(function* () {
      if (_lodash2.default.isEmpty(options.engine)) {
        options.engine = _path2.default.extname(options.file).slice(1);
      }
      const filePath = _path2.default.resolve(process.cwd(), options.file);
      switch (options.engine) {
        case 'ejs':
        case 'html':
          options.engine = 'ejs';
          return new Promise(function (resolve, reject) {
            _ejs2.default.renderFile(filePath, payload, options.options, function (err, output) {
              if (err) {
                return reject(err);
              }
              return resolve(output);
            });
          });
          break;
        case 'markdown':
        case 'md':
          options.engine = 'markdown';
          const input = fs.readFileSync(filePath);
          return _markdown.markdown.parse(input);
          break;
        case 'pug':
        case 'jade':
          options.engine = 'pug';
          return _pug2.default.renderFile(filePath, payload);
          break;
        default:
          logger.error('Not supported ext for template engine');
      }
    })();
  }
}

exports.default = Renderer;