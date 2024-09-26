import close from '.';


describe('brace can be closed', () => {
    it('keep original braces', () => {
        expect(close('')).toEqual('');
        expect(close('(3)')).toEqual('(3)');
        expect(close('((3))')).toEqual('((3))');
        expect(close('(()(3))')).toEqual('(()(3))');
        expect(close('((3)())')).toEqual('((3)())');
    });

    it('close left braces', () => {
        expect(close(')')).toEqual('()');
        expect(close(')(3)')).toEqual('()(3)');
        expect(close(')(3)(2)')).toEqual('()(3)(2)');
        expect(close('))')).toEqual('(())');
        expect(close(')))()')).toEqual('((()))()');
        expect(close('1)')).toEqual('(1)');
        expect(close('1)(3)')).toEqual('(1)(3)');
        expect(close('1)(3)(2)')).toEqual('(1)(3)(2)');
        expect(close('1))')).toEqual('((1))');
        expect(close('1)))()')).toEqual('(((1)))()');
        expect(close('))1)()')).toEqual('((())1)()');
        expect(close('1)1)(2)')).toEqual('((1)1)(2)');
    });

    it('close right braces', () => {
        expect(close('(')).toEqual('()');
        expect(close('(2)(')).toEqual('(2)()');
        expect(close('(2)(3)(')).toEqual('(2)(3)()');
        expect(close('((')).toEqual('(())');
        expect(close('()(((')).toEqual('()((()))');
        expect(close('(1')).toEqual('(1)');
        expect(close('(2)(1')).toEqual('(2)(1)');
        expect(close('(2)(3)(1')).toEqual('(2)(3)(1)');
        expect(close('((1')).toEqual('((1))');
        expect(close('()(((1')).toEqual('()(((1)))');
        expect(close('()((1(')).toEqual('()((1()))');
        expect(close('(2)(1(1')).toEqual('(2)(1(1))');
    });

    it('close both side braces', () => {
        expect(close(')(')).toEqual('()()');
        expect(close(')2(')).toEqual('()2()');
        expect(close(')(2)(')).toEqual('()(2)()');
        expect(close('1)(2)(1')).toEqual('(1)(2)(1)');
        expect(close(')1)(2)(1(')).toEqual('(()1)(2)(1())');
        expect(close(')()(2)(1')).toEqual('()()(2)(1)');
        expect(close(')(2)(1()')).toEqual('()(2)(1())');
        expect(close('2)+((3')).toEqual('(2)+((3))');
    });

    it('option can change char', () => {
        expect(close(']][', { left: '[', right: ']' })).toEqual('[[]][]');
    });
});