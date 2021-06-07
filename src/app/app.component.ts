import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import 'ag-grid-enterprise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  csvRecords: any[] = [];
  header: boolean;
  style = {
    width: '100%',
    height: '100%',
    flex: '1 1 auto',
  };
  modules = [ClientSideRowModelModule];
  private gridApi;
  public columnDefs;
  public columnDefs2;
  public defaultColDef;
  public rowSelection;
  public paginationPageSize;
  public rowData2;

  constructor(private ngxCsvParser: NgxCsvParser) {
    this.columnDefs2 = [
      {
        field: 'make', // rowGroup: true, hide: true
      },
      { field: 'model' },
      {
        field: 'price',
        aggFunc: (params) => {
          let sum = 0;
          params.values.forEach((value) => (sum += value));
          console.log('Sum = ' + sum);
          return sum;
        },
      },
      // { field: 'price', aggFunc: 'sum' },
    ];

    this.rowData2 = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 },
      { make: 'Toyota', model: 'Prius', price: 25000 },
    ];

    this.columnDefs = [
      { field: 'Code' },
      {
        field: 'Description',
        width: 220,
      },
      {
        field: 'Level',
        // rowGroup: true,
        // hide: true,
      },
      {
        field: 'Order',
        // aggFunc: 'sum',
        // enableValue: true,
      },
      { field: 'Parent' },
      { field: 'Reference' },
      {
        field: 'Rulings',
        width: 220,
      },
      {
        field: 'This item also includes',
        width: 220,
      },
      {
        field: 'This item excludes',
        width: 220,
      },
      {
        field: 'This item includes',
        width: 220,
      },
    ];

    this.defaultColDef = {
      width: 100,
      sortable: true,
      editable: true,
      resizable: true,
      filter: true,
    };
    this.rowSelection = 'multiple';
    this.paginationPageSize = 100;
  }

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    this.ngxCsvParser
      .parse(files[0], { header: true, delimiter: ',' })
      .pipe()
      .subscribe(
        (result: Array<any>) => {
          console.log('Result', result);
          this.csvRecords = result;
        },
        (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      );
  }

  fillLarge() {
    this.setWidthAndHeight('100%', '100%');
  }

  fillMedium() {
    this.setWidthAndHeight('60%', '60%');
  }

  fillExact() {
    this.setWidthAndHeight('400px', '400px');
  }

  setWidthAndHeight(width, height) {
    this.style = {
      width: width,
      height: height,
      flex: '',
    };
  }
  onPaginationChanged() {
    console.log('onPaginationPageLoaded');
    if (this.gridApi) {
      setText('#lbPageSize', this.gridApi.paginationGetPageSize());
      setText('#lbCurrentPage', this.gridApi.paginationGetCurrentPage() + 1);
      setText('#lbTotalPages', this.gridApi.paginationGetTotalPages());
      setLastButtonDisabled(!this.gridApi.paginationIsLastPageFound());
    }
  }

  onBtFirst() {
    this.gridApi.paginationGoToFirstPage();
  }

  onBtLast() {
    this.gridApi.paginationGoToLastPage();
  }

  onBtNext() {
    this.gridApi.paginationGoToNextPage();
  }

  onBtPrevious() {
    this.gridApi.paginationGoToPreviousPage();
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }
}

function setText(selector, text) {
  document.querySelector(selector).innerHTML = text;
}

function setLastButtonDisabled(disabled) {
  (document.querySelector('#btLast') as HTMLButtonElement).disabled = disabled;
}
