# Decimal Number Maths

This is a small lightweight library used to work around floating point math errors when working with decimals in javascript. The library follows BODMAS/PEMDAS.



## Setup

**Loading file:**

```html
<script type='module' src='./DecimalNumberMaths.js'></script>
```



## Usage

```javascript
import { dMaths } from './DecimalNumberMaths.js';

let equation = '1 + 2 - 8 * 8';
let result = dMaths(equation); // => -61
```



```javascript
dMaths('0.1 + 0.2') // => 0.3
```



## Supported Operators

-   Parentheses or brackets as **'('** and **')'**
-   Exponents or orders of as **'\*\*'**
-   Division as **'/'**
-   Multiplication as **'*'**
-   Addition as **'+'**
-   Subtraction as **'-'**

**Other javascript math operators such as Math.floor() may not work. 



## Other Notes

-   To support square-roots cube-roots etc. and exponent operator followed by a fraction in brackets will be treated as an exponent for BODMAS/PEMDAS purposes. This means that:

    ```javascript
    dMaths('8 ** (1 / 3)') // => 2
    ```

    and

    ```javascript
    dMaths('8 ** 1 / 3') // =>  8 / 3 => 2.6666666666666665
    ```

-   Spacing is important to the library. I have included a fixSpacing function which is called automatically through calling dMaths however it may not cover all cases. To avoid issues format strings with spaces between operators and numbers with the exception of open and close brackets which do not have a space between the following and proceeding numbers respectively. Here are some examples:

    ```javascript
    '8   ** 1/3' => '8 ** 1 / 3'
    '8**( 1 / 3)' => '8 ** (1 / 3)'
    '2+-3' => '2 + -3'
    ```

