import {Injectable} from '@angular/core';
import {ColumnType} from '../../../../shared/enums/column-type';
import {IColumn} from "../../../../shared/inferfaces/i-column";

@Injectable({
  providedIn: 'root'
})
export class BlProductsTableService {

  columns: IColumn[] = [
    {
      index: "id",
      title: "# ID"
    },
    {
      index: "image",
      title: "",
      type: ColumnType.image
    },
    {
      index: "name",
      title: "Name"
    },
    {
      index: "categories",
      title: "Categories",
      type: ColumnType.list
    },
    {
      index: "price",
      title: "Price"
    },
    {
      index: "created_at",
      title: "Created At",
      type: ColumnType.date
    },
    {
      index: "actions",
      title: "Actions",
      type: ColumnType.action
    }
  ];

  displayedColumns: string[] = this.columns.map(x => x.index);
  pageSizeOptions: number[] = [5, 10, 20];

}
