// src/interfaces/props/select.interface.ts

export interface SelectProps {
    labelKey: string;
    valueKey: string | number;
    iconKey?: string;
    disabled?: boolean;
    options: Array<{ [key: string]: string | number }>;
}
