export interface ItemListConfiguration<T extends Record<string, any>> {
    title: string;
    headers: Set<string>;
    data: T[];
    sortFields?: string[];
    actions?: { action: string, callback: (action: string, item: T, ...args: any[]) => any, disabled?: (item: T, ...args: any) => boolean }[];
}
