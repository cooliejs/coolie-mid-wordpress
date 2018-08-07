/**
 * 适配 wordpress
 * @author ydr.me
 * @create 2018年08月07日09:34:36
 */


'use strict';

var object = require('blear.utils.object');

var pkg = require('./package.json');

var defaults = {};

/**
 * 后置处理配置
 * @returns {Function}
 */
exports.postInit = function () {
    return function (options) {
        if (options.progress !== 'post-config') {
            return options;
        }

        var destName = path.basename(options.configs.dest.dirname);
        var destHost = options.configs.destHost;

        if (destHost === '/') {
            options.configs.destHost = '/wp-content/themes/' + destName + '/';
        }

        return options;
    };
};
exports.postInit.package = pkg;


/**
 * 前置处理静态资源
 * @returns {Function}
 */
exports.preStatic = function () {
    return function (options) {
        if (options.progress !== 'pre-static') {
            return options;
        }

        options.path = options.path.replace(/\/wp-content\/themes\/[^/]+\//, '/');
        return options;
    };
};
exports.preStatic.package = pkg;

