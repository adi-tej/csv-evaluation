import { parseExpression, readCSV, writeToCSV } from "./parser.js";

let csvFilePath = 'src/input.csv';
await process.stdin.on('data', data => {
    csvFilePath = data.toString()
    console.log(`You typed ${data.toString()}`);
    process.exit();
});
readCSV(csvFilePath).then(data => {
    const values = data[0];
    for (const [i, row] of data.entries()) {
        if (i > 0) {
            for (const [j, exp] of row.entries()) {
                try {
                    data[i][j] = parseExpression(exp, values);
                }catch (e) {
                    console.error(`Unable to parse expression: ${exp}`,e);
                }
            }
        }
    }
    writeToCSV(data);
}).catch(e => {
    console.error('Failed to read file', e);
});
