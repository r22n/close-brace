

export type Opt = {
    left: string;
    right: string;
}

export const defaultOption: Opt = {
    left: '(',
    right: ')'
};

export default function (src: string, opt?: Opt) {
    opt = Object.assign({}, defaultOption, opt);

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
    
    const l = 0, r = 1;
    const lr: number[] = [];
    for (const c of src) {
        if (c === opt.left) {
            lr.push(l);
        } else if (c === opt.right) {
            lr.push(r);
        }
    }

    for (let i = lr.length - 2; i >= 0; i--) {
        if (lr[i] === l && lr[i + 1] === r) {
            lr.splice(i, 2);
            i++;
        }
    }

    const left = lr.indexOf(l);
    const right = lr.lastIndexOf(r);
    if (right === -1) {
        // l*
        return src + opt.right.repeat(lr.length);
    } else if (left === -1) {
        // r*
        return opt.left.repeat(lr.length) + src;
    } else {
        // r*l*
        return opt.left.repeat(right + 1) + src + opt.right.repeat(lr.length - left);
    }
}