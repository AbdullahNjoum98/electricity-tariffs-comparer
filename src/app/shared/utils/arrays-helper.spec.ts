import { ArraysHelper } from './arrays-helper';

describe('ArraysHelper', () => {
    it('should correctly compare numbers in ascending order', () => {
        const result = ArraysHelper.compare(5, 3, 'asc');
        expect(result).toBeGreaterThan(0);
    });

    it('should correctly compare numbers in descending order', () => {
        const result = ArraysHelper.compare(5, 3, 'desc');
        expect(result).toBeLessThan(0);
    });

    it('should correctly compare strings in ascending order', () => {
        const result = ArraysHelper.compare('apple', 'banana', 'asc');
        expect(result).toBeLessThan(0);
    });

    it('should correctly compare strings in descending order', () => {
        const result = ArraysHelper.compare('apple', 'banana', 'desc');
        expect(result).toBeGreaterThan(0);
    });

    it('should correctly compare dates in ascending order', () => {
        const date1 = new Date('2024-01-01');
        const date2 = new Date('2024-01-02');
        const result = ArraysHelper.compare(date1, date2, 'asc');
        expect(result).toBeLessThan(0);
    });

    it('should correctly compare dates in descending order', () => {
        const date1 = new Date('2024-01-01');
        const date2 = new Date('2024-01-02');
        const result = ArraysHelper.compare(date1, date2, 'desc');
        expect(result).toBeGreaterThan(1);
    });

    it('should correctly compare booleans in ascending order', () => {
        const result = ArraysHelper.compare(true, false, 'asc');
        expect(result).toBeGreaterThan(0);
    });

    it('should correctly compare booleans in descending order', () => {
        const result = ArraysHelper.compare(true, false, 'desc');
        expect(result).toBeLessThan(0);
    });

    it('should throw an error for unsupported types', () => {
        expect(() => ArraysHelper.compare(5, 'string' as any, 'asc')).toThrowError('Unsupported Types for Comparison');
        expect(() => ArraysHelper.compare('string', new Date() as any, 'asc')).toThrowError('Unsupported Types for Comparison');
        expect(() => ArraysHelper.compare({}, [], 'asc')).toThrowError('Unsupported Types for Comparison');
    });
});
