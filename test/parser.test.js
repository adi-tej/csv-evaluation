import { parseExpression} from "../src/parser.js";
import { test } from "@jest/globals";
import { expect } from "expect";

test('parse expression', () => {
    expect(parseExpression('A + B',[1,2])).toBe(3);
});

test('parse expression with sub-expression', () => {
    expect(parseExpression('A + (B * C)',[1,2,3])).toBe(7);
});

test('parse expression with sub-expression at start', () => {
    expect(parseExpression('(A / B) - C',[4,2,1])).toBe(1);
});

