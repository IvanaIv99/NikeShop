import {Injectable} from '@angular/core';
import {ColumnType} from '../../../../shared/enums/column-type';
import {IColumn} from "../../../../shared/inferfaces/i-column";

@Injectable({
  providedIn: 'root'
})
export class BlOrdersTableService {

  public columns: IColumn[] = [
    {
      index: "id",
      title: "# ID"
    },
    {
      index: "fullname",
      title: "Customer",
      type: ColumnType.concatText,
      values: ['first_name', 'last_name']
    },
    {
      index: "email",
      title: "Email",
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
      title: "Details",
      type: ColumnType.action
    }
  ];

  displayedColumns: string[] = this.columns.map(x => x.index);
  pageSizeOptions: number[] = [5, 10];

}
