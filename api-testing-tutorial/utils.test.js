import addTwo from "./addTwo";
import squareValue from "./squareValue";

describe('addTwo', () => {
  test('should add two', () => {
    expect(addTwo(2)).toBe(4);
    expect(addTwo(3)).toBe(5);
    expect(addTwo(4)).toBe(6);
  })
})

describe('squareValue', () => {
  test('should square value', () => {
    expect(squareValue(2)).toBe(4);
    expect(squareValue(3)).toBe(9);
    expect(squareValue(4)).toBe(16);
  })
})