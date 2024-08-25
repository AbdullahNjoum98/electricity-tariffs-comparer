export interface ItemListConfiguration<T extends Record<string, any>> {
    title: string;
    headers: Set<string>;
    data: T[];
    sortFields?: string[];
    actions?: { action: string, callback: (...args: any[]) => any, disabled?: (...args: any[]) => boolean }[];
}
