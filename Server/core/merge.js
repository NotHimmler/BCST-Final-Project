"use strict";

var isObject = require('./is-object.js');

// merge JSON
let merge = function() {
    let arg = arguments;
    let len = arg.length;
    // no parameters
    if (!len) {
        return {};
    }
    // deep merge depend on last parameter
    let deep = true;
    if (arg[len - 1] === false) {
        deep = false;
    }

    // ===================================

    let mergeArray = function(item, base) {
        // merge array to base
        let size = item.length;
        for (let k = 0; k < size; k++) {
            let vk = item[k];
            if (deep && isObject(vk)) {
                base[k] = merge(base[k], vk);
            } else {
                base[k] = vk;
            }
        }
        // length fixing for array
        base.length = size;
    };

    let mergeObject = function(item, base) {
        // merge object to base
        Object.keys(item).forEach(function(n) {
            let v = item[n];
            if (base.hasOwnProperty(n) && deep && isObject(v)) {
                base[n] = merge(base[n], v);
            } else {
                base[n] = v;
            }
        });
    };

    let mergeAO = function(item, base) {
        // merge to base
        if (item instanceof Array) {
            mergeArray(item, base);
        } else {
            mergeObject(item, base);
        }
    };

    let mergeList = function() {
        // base merge result
        let base = null;
        for (let i = 0; i < len; i++) {
            let item = arg[i];
            // only for valid object or array
            if (!isObject(item)) {
                continue;
            }
            // base type depend on first parameter
            if (base === null) {
                base = (item instanceof Array) ? [] : {};
            }
            mergeAO(item, base);
        }
        return base;
    };

    let base = mergeList();

    return base;
};

module.exports = merge;