# close-brace

Close a brace in your text.

```
input   =>  output
-------------------
(2+3    =>  (2+3)
1)1)(2) =>  ((1)1)(2)
(2)(1(1 =>  (2)(1(1))
2)+((3  =>  (2)+((3))
```

## how to use

```
import close from 'close-brace';

close('2)+((3') => '(2)+((3))'
```