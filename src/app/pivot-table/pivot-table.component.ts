import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DropDownList, MultiSelect,  CheckBoxSelectionService, FilteringEventArgs,  ChangeEventArgs, SelectEventArgs, RemoveEventArgs, PopupEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { IDataOptions, IDataSet,  PivotView, FieldListService, FilterType } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { FilterModel } from '@syncfusion/ej2-pivotview/src/pivotview/model/datasourcesettings-model';
import { Button } from '@syncfusion/ej2-buttons';

@Component({
  selector: 'app-pivot-table',
  templateUrl: './pivot-table.component.html',
  styleUrls: ['./pivot-table.component.scss'],
  providers: [FieldListService, CheckBoxSelectionService]
})
export class PivotTableComponent implements OnInit 
{

  @ViewChild('pivotview') public pivotObj: PivotView;

  public pivotData: IDataSet[] = [];
  public csvToRowArray: any = [];
  public dataSourceSettings: IDataOptions;
  public gridSettings: GridSettings;
  public ddfieldSource: string[] = [];
  
  public columns: string[] = [];
  public row = [];
  public post = {};
  public displayFlag: boolean = false;

  public fieldCollections: { [key: string]: { [key: string]: Object }[] } = {};
  public filterCollections: { [key: string]: FilterModel } = {};
  public isInitial: boolean = true;
  public type: string[] = ['Include', 'Exclude'];
  public values: { [key: string]: Object }[] = [];
  public fields: string[] = ['Country', 'Products', 'Year'];
  public fieldsddl: DropDownList;
  public typeddl: DropDownList;
  public valuesddl: MultiSelect;
  public applyBtn: Button;
  public filterField: string;
  public checkBoxData: Object[] =  [
    { id: 'Game1', sports: "\"Date\"" },
    { id: 'Game2', sports: "\"District\"" },
    { id: 'Game3', sports: "\"Institution\"" },
    { id: 'Game4', sports: "\"Equipment Name\"" }
  ];

  public cbfields: Object = { text: 'sports', value: 'id' };
  mode: string;

  
  constructor(private httpClient: HttpClient) 
  { }


  ngOnInit() 
  {

    this.mode = 'CheckBox';
    this.gridSettings = {
      columnWidth: 250
    } as GridSettings;

    this.httpClient.get("../assets/ExportedData.csv", {responseType: 'text'}).subscribe((response) =>
    {
      this.csvToRowArray = response.split("\n");
      this.columns = this.csvToRowArray[0].split(",");
      this.ddfieldSource = this.columns;
      console.log(this.ddfieldSource);

      this.columns.forEach((column) =>{
        this.post[column] = "";
      })

      for(var index = 1; index < this.csvToRowArray.length; index++)
      {
        this.pivotData[index - 1] = {};
        this.row = this.csvToRowArray[index].split(",");
        for(var j = 0; j < this.row.length; j++)
        {
          this.post[this.columns[j]] = this.row[j];
          this.pivotData[index - 1][this.columns[j]] = this.row[j];
        }
      }

      this.pivotData.pop();
      console.log(this.pivotData);

      this.dataSourceSettings = 
      {
        dataSource: this.pivotData,
        expandAll: false,
        columns: [{ name: "\"Date\"", caption: 'Date' }, { name: "\"District\"", caption: 'District' }],
        values: [{ name: "\"Institution\"", caption: 'Institution' }],
        rows: [{ name: "\"Equipment Name\"" }],
        filters: []
        
      };

      this.displayFlag = true;
    })
  }

  ddEvent(e: any)
  {
    console.log(e.itemData.value);
  }

  cbEvent(e: any)
  {
    console.log(e.value);
  }

  typeEvent(e: any)
  {
    console.log(e.itemData.value);
  }

  onClick(e: any)
  {
    console.log(this.pivotObj.dataSourceSettings);
  }
  
}
