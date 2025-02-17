import { Injectable } from '@angular/core';
import { ColumnType } from '../../../../shared/enums/column-type';
import {IColumn} from "../../../../shared/inferfaces/i-column";

@Injectable({
  providedIn: 'root'
})
export class BlOrdersTableService {

  columns: IColumn[] = [
    {
      index: "id",
      title: "# ID"
    },
    {
      index: "subtotal",
      title: "Subtotal"
    },
    {
      index: "status",
      title: "Status"
    },
    {
      index: "created_at",
      title: "Created",
      type: ColumnType.date
    },
    {
      index: "Details",
      title: "Actions",
      type: ColumnType.action
    }
  ];

  displayedColumns: string[] = this.columns.map(x => x.index);
  pageSizeOptions: number[] = [2, 5, 10, 20];

}
