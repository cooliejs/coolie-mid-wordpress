/**
 * 适配 wordpress
 * @author ydr.me
 * @create 2018年08月07日09:34:36
 */


'use strict';

var path = require('path');
var fs = require('fs');
var object = require('blear.utils.object');
var string = require('blear.utils.string');

var pkg = require('./package.json');

var defaults = {
    /**
     * 目标主题名称，为 `null` 表示根据目录名自动生成
     * @type string | null
     */
    destThemeName: null
};


module.exports = function (configs) {
    configs = object.assign({}, defaults, configs);
    return function (options) {
        return preStatic(
            postConfig(options, configs),
            configs
        );
    };
};
module.exports.package = pkg;
module.exports.defaults = defaults;

// ====================================
/**
 * 配置后置
 * @param options
 * @param configs
 * @returns {*}
 */
function postConfig(options, configs) {
    if (options.progress !== 'post-config') {
        return options;
    }

    var destDirname = options.configs.destDirname;
    var destName = path.basename(options.configs.dest.dirname);
    var destHost = options.configs.destHost;
    var themeName = configs.themeName || destName;

    if (destHost === '/') {
        options.configs.destHost = '/wp-content/themes/' + destName + '/';
    }

    var cssFile = path.join(destDirname, 'style.css');
    var charset = 'utf-8';
    var cssData = fs.readFileSync(path.join(__dirname, './style.css'), charset);
    cssData = string.assign(cssData, {
        themeName: themeName
    });
    fs.writeFileSync(cssFile, cssData, charset);

    return options;
}


/**
 * 静态前置
 * @param options
 * @param configs
 * @returns {*}
 */
function preStatic(options, configs) {
    if (options.progress !== 'pre-static') {
        return options;
    }

    options.path = options.path.replace(/\/wp-content\/themes\/[^/]+\//, '/');
    return options;
}
