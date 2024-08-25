import { SortDirection } from "../models/sort-direction";

export class ArraysHelper {
    static compare<T>(a: T, b: T, sort: SortDirection): number {
        if (typeof a === 'number' && typeof b === 'number') {
            if (sort === 'asc') return a - b;
            else return b - a;
          } else if (typeof a === 'string' && typeof b === 'string') {
            if (sort === 'asc') return a.localeCompare(b);
            else return b.localeCompare(a);
          } else if (a instanceof Date && b instanceof Date) {
            if (sort === 'asc') return a.getTime() - b.getTime();
            else return b.getTime() - a.getTime();
          } else if (typeof a === 'boolean' && typeof b === 'boolean') {
            if (sort === 'asc') return Number(a) - Number(b);
            else return Number(b) - Number(a);
          } else throw new Error('Unsupported Types for Comparison');
    }
} 
