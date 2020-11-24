import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PivotViewModule } from '@syncfusion/ej2-angular-pivotview'
import { HttpClientModule } from '@angular/common/http';
import { DropDownListModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { PivotViewAllModule, PivotFieldListAllModule } from '@syncfusion/ej2-angular-pivotview';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PivotTableComponent } from './pivot-table/pivot-table.component';

@NgModule({
  declarations: [
    AppComponent,
    PivotTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PivotViewModule,
    HttpClientModule,
    DropDownListModule,
    MultiSelectModule,
    ButtonModule,
    PivotFieldListAllModule,
    PivotViewAllModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
