/**
 * 适配 wordpress
 * @author ydr.me
 * @create 2018年08月07日09:34:36
 */


'use strict';

var path = require('path');
var fs = require('fs');
var string = require('blear.utils.string');

var pkg = require('./package.json');

var defaults = {};

/**
 * 后置处理配置
 * @returns {Function}
 */
exports.postConfig = function () {
    var mid = function (options) {
        if (options.progress !== 'post-config') {
            return options;
        }

        var destDirname = options.configs.destDirname;
        var destName = path.basename(options.configs.dest.dirname);
        var destHost = options.configs.destHost;

        if (destHost === '/') {
            options.configs.destHost = '/wp-content/themes/' + destName + '/';
        }

        var cssFile = path.join(destDirname, 'style.css');
        var charset = 'utf-8';
        var cssData = fs.readFileSync(path.join(__dirname, './style.css'), charset);
        cssData = string.assign(cssData, {
           themeName: destName
        });
        fs.writeFileSync(cssFile, cssData, charset);

        return options;
    };

    mid.package = pkg;
    return mid;
};


/**
 * 前置处理静态资源
 * @returns {Function}
 */
exports.preStatic = function () {
    var mid = function (options) {
        if (options.progress !== 'pre-static') {
            return options;
        }

        options.path = options.path.replace(/\/wp-content\/themes\/[^/]+\//, '/');
        return options;
    };

    mid.package = pkg;
    return mid;
};

