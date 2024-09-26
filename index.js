"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOption = void 0;
exports.default = default_1;
exports.defaultOption = {
    left: '(',
    right: ')'
};
function default_1(src, opt) {
    opt = Object.assign({}, exports.defaultOption, opt);
    // we can consider 4 patterns for closing braces.
    // and by collapsing 'lr' chars, we can see 'close'.
    //          0123456789ab    collapse     close
    // both     .).).)..(.(.
    //           r r r  l l     rrrll        lll>rrrll<rr
    // left     .).).(.)....
    //           r r l r        rr           ll>rr
    // right    .(.).(.(.... 
    //           l r l l        ll           ll<rr
    // keep     ............
    //           -              -
    // example 1
    // llrllrllr    expect  llrllrllr<rrr 
    //  ^  ^  ^     collepase lr
    // lll          lll'<rrr'
    // 
    // example 2
    // rrrllrrll    expect lll>rrrllrrll<rr
    //     ^        collapse lr
    // rrrlrll    
    //    ^
    // rrrll        'lll>'rrrll'<rr'
    var l = 0, r = 1;
    var lr = [];
    for (var _i = 0, src_1 = src; _i < src_1.length; _i++) {
        var c = src_1[_i];
        if (c === opt.left) {
            lr.push(l);
        }
        else if (c === opt.right) {
            lr.push(r);
        }
    }
    for (var i = lr.length - 2; i >= 0; i--) {
        if (lr[i] === l && lr[i + 1] === r) {
            lr.splice(i, 2);
            i++;
        }
    }
    var left = lr.indexOf(l);
    var right = lr.lastIndexOf(r);
    if (right === -1) {
        // l*
        return src + opt.right.repeat(lr.length);
    }
    else if (left === -1) {
        // r*
        return opt.left.repeat(lr.length) + src;
    }
    else {
        // r*l*
        return opt.left.repeat(right + 1) + src + opt.right.repeat(lr.length - left);
    }
}
