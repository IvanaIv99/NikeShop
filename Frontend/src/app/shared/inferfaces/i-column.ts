import { ColumnType } from "../enums/column-type";

export interface IColumn {
    index: string;
    title: string;
    type?: ColumnType;
}