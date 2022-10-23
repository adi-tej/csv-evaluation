import * as fs from 'fs';
import Papa from 'papaparse';
import { getIndexFromChar } from "./helper.js";

/* read CSV file - default separator ',' */
export const readCSV = async (filePath, sep=',') => {
    const file = fs.readFileSync(filePath)
    const data = file.toString()
    return new Promise(resolve => {
        Papa.parse(data, {
            worker: true,
            skipEmptyLines: true,
            delimiter: sep,
            complete: results => resolve(results.data)
        });
    });
};

/* write CSV file */
export const writeToCSV = (data) => {
    if (!fs.existsSync('out')){
        fs.mkdirSync('out');
    }
    fs.writeFile('out/output.csv', Papa.unparse(data), 'utf8', function (err) {
        if (err) {
            console.error('Failed to write file', err);
        }
    });
}

/* parse expression string */
export const parseExpression = (exp, values) => {
    let solution = null;
    let operator = null;
    let i = 0;
    while (i < exp.length){
        const char = exp[i];
        let value;
        if('+-*/'.includes(char)){
            operator = char;
        }else if(char !== ' ') {
            if(char === '('){
                const closeIndex = exp.lastIndexOf(')');
                const subExpression = exp.substring(i+1, closeIndex);
                value = parseExpression(subExpression, values);
                i = closeIndex;
            }else if(char !== ' ') {
                value = parseInt(values[getIndexFromChar(char)]);
            }
            if (solution === null) {
                solution = value;
            } else {
                switch (operator) {
                    case '+':
                        solution += value;
                        break;
                    case '-':
                        solution -= value;
                        break;
                    case '*':
                        solution *= value;
                        break;
                    case '/':
                        solution /= value;
                        break;
                }
            }
        }
        i++;
    }
    return solution;
}

// can add other parsers below
