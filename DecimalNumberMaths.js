/**
 *
 * @param {String} equation Equation as string eg. '(5 * 4 - (7 ** 2 + 6) / 6)'
 * @returns {Number} Result of the equation string following BODMAS
 * @Note This function only supports the following operators:  Parentheses: ( ), Exponent: **, Mulitplication: *,
 * Division: /, Addition: +, Subraction: -
 */
 export function dMaths(equation) {
    // Set to true to see step by step working
    const DEBUG = false;

    // Fixes spacing between operators and numbers
    equation = fixSpacing(equation);

    if (DEBUG) {
        console.log(equation);
    }

    // Removes surrounging brackets eg. (5 * 4 - (7 ** 2 + 6) / 6) => 5 * 4 - (7 ** 2 + 6) / 6
    let surroundingBracketRegex = /^\((?![-0-9.]+ [+-/*]+ [-0-9.]+\)).+\)$|^\([-0-9.]+ [*/+-]+ [-0-9.]+\)$/g;
    if (surroundingBracketRegex.test(equation)) {
        equation = equation.replace(/^\(|\)$/g, '');
    }

    let decimalRegex = /\./;
    let rootRegex = /\*\* \([-0-9]+ \/ [-0-9]+\)/;
    let boRegexCheck = /\([-0-9 .*/+-]+\)|\*\* \([-0-9]+ \/ [-0-9]+\)/;
    let topORegex = /([-0-9.]+|\([-0-9]+ \/ [-0-9]+\)) \*\* ([-0-9.]+|\([-0-9]+ \/ [-0-9]+\))$/;

    let bRegex = /\([-0-9 .*/+-]+\)/;
    let oRegex = /(([-0-9.]+|\([-0-9]+ \/ [-0-9]+\)) \*\* ([-0-9.]+|\([-0-9]+ \/ [-0-9]+\)))( \*\* ([-0-9.]+|\([-0-9]+ \/ [-0-9]+\)))*/;
    let dmRegex = /[-0-9.]+ [*/] [-0-9.]+/;
    let asRegex = /[-0-9.]+ [+-] [-0-9.]+/;

    /*
    Test for brackets and call this function recursively until all blocks have been resolved.
    Skip exponent blocks with inverse powers.
    */
    if (bRegex.test(equation)) {
        if (!rootRegex.test(equation.match(boRegexCheck)[0])) {
            equation = equation.replace(bRegex, dMaths(equation.match(bRegex)[0]));
        }
    }

    /*
    Test for exponents and replace first block with result. Call this function recursively until all
    blocks have been resolved. Solves Exponent blocks from the top down.
    */
    if (oRegex.test(equation)) {
        let eq = equation.match(oRegex)[0].match(topORegex)[0];
        let result = eval(eq);

        if (rootRegex.test(equation) && DEBUG) {
            console.log(eq);
            console.log(result);
        }

        equation = equation.replace(eq, result);
        return dMaths(equation);
    }

    /*
    Test for multiplication/division and replace first block with result. Call this function recursively
    until all blocks have been resolved.
    */
    if (dmRegex.test(equation)) {
        let result = '';
        let eq = equation.match(dmRegex)[0];

        /*
        Test for decimal value. Find smallest factor of 10 that will make both sides of the working block a
        whole number, evaluate block, convert back to decimal then replace block in equation string with result.
        */
        if (decimalRegex.test(eq)) {
            let eqArr = equation.split(' ');
            let decimalPlaces = 0;
            if (decimalRegex.test(eqArr[0])) {
                decimalPlaces = eqArr[0].length - eqArr[0].indexOf('.') - 1;
            }
            if (decimalRegex.test(eqArr[2]) && (eqArr[2].length - eqArr[2].indexOf('.')) > decimalPlaces) {
                decimalPlaces = eqArr[2].length - eqArr[2].indexOf('.') - 1;
            }
            console.log(decimalPlaces);
            let factor = 10 ** decimalPlaces;
            eqArr[0] = eqArr[0] * factor;
            eqArr[2] = eqArr[2] * factor;
            eq = eqArr.join(' ');
            result = eval(eq);
            result = result
            if (eqArr[1] === '*') {
                result = result / factor / factor;
            }
        } else {
            result = eval(eq);
        }

        if (DEBUG) {
            console.log(eq);
        }

        equation = equation.replace(dmRegex, result);
        return dMaths(equation);
    }

    /*
    Test for addition/subtraction and replace first block with result. Call this function recursively
    until all blocks have been resolved.
    */
    if (asRegex.test(equation)) {
        let result = '';
        let eq = equation.match(asRegex)[0];

        /*
        Test for decimal value. Find smallest factor of 10 that will make both sides of the working block a
        whole number, evaluate block, convert back to decimal then replace block in equation string with result.
        */
        if (decimalRegex.test(eq)) {
            let eqArr = equation.split(' ');
            let decimalPlaces = 0;
            if (decimalRegex.test(eqArr[0])) {
                decimalPlaces = eqArr[0].length - eqArr[0].indexOf('.') - 1;
            }
            if (decimalRegex.test(eqArr[2]) && (eqArr[2].length - eqArr[2].indexOf('.')) > decimalPlaces) {
                decimalPlaces = eqArr[2].length - eqArr[2].indexOf('.') - 1;
            }
            let factor = 10 ** decimalPlaces;
            eqArr[0] = eqArr[0] * factor;
            eqArr[2] = eqArr[2] * factor;
            eq = eqArr.join(' ');
            result = eval(eq);
            result = result / factor;
        } else {
            result = eval(eq);
        }

        if (DEBUG) {
            console.log(eq);
        }

        equation = equation.replace(asRegex, result);
        return dMaths(equation);
    }

    return equation;
}

/**
 *
 * @param {String} equation Equation as string
 * @returns {String} Equation string
 * @Note This function only supports the following operators:  Parentheses: ( ), Exponent: **, Mulitplication: *,
 * Division: /, Addition: +, Subraction: -
 */
function fixSpacing(equation) {
    equation.replace(/ {2,}/g, ' ');

    let operatorRegex = /[)*/+][-0-9]|[-0-9.][(*/+-]|[*/+-]\(|\)[*/+-]|[)*/+-][-]/;
    if (operatorRegex.test(equation)) {
        let eq = equation.match(operatorRegex)[0];
        let string = eq[0] + ' ' + eq[1];
        equation = equation.replace(eq, string);
        return fixSpacing(equation);
    }

    let bracketRegex = /\( [-0-9]|[-0-9.] \)/;
    if (bracketRegex.test(equation)) {
        let eq = equation.match(bracketRegex)[0];
        let string = eq[0] + eq[2];
        equation = equation.replace(eq, string);

        return fixSpacing(equation);
    }

    return equation
}