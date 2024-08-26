import { ObjectKeysPipe } from './object-keys.pipe';

describe('ObjectKeysPipe', () => {
  let pipe: ObjectKeysPipe;

  beforeEach(() => {
    pipe = new ObjectKeysPipe();
  });

  it('should return keys of an object', () => {
    const testObject = { a: 1, b: 2, c: 3 };
    const result = pipe.transform(testObject);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should return an empty array if the value is an empty object', () => {
    const result = pipe.transform({});
    expect(result).toEqual([]);
  });

  it('should return an empty array if the value is an array', () => {
    const testArray = [1, 2, 3];
    const result = pipe.transform(testArray);
    expect(result).toEqual([]);
  });

  it('should log a warning if the value is not a proper object', () => {
    spyOn(console, 'warn');
    const invalidValue = 42;
    const result = pipe.transform(invalidValue as any);
    expect(console.warn).toHaveBeenCalledWith('The provided object\'s keys can\'t be extracted:', invalidValue);
    expect(result).toEqual([]);
  });

  it('should handle empty objects correctly', () => {
    const emptyObject = {};
    const result = pipe.transform(emptyObject);
    expect(result).toEqual([]);
  });

  it('should return keys for nested objects correctly', () => {
    const nestedObject = { a: 1, b: { c: 2 }, d: 3 };
    const result = pipe.transform(nestedObject);
    expect(result).toEqual(['a', 'b', 'd']);
  });
});
