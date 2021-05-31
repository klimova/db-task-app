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
  columnDefs;
  defaultColDef;
  rowSelection;
  paginationPageSize;

  constructor(private ngxCsvParser: NgxCsvParser) {
    this.columnDefs = [
      { field: 'Code', sortable: true, filter: true },
      { field: 'Description', sortable: true, filter: true },
      { field: 'Level', sortable: true, filter: true },
      { field: 'Order', sortable: true, filter: true },
      { field: 'Parent', sortable: true, filter: true },
      { field: 'Reference', sortable: true, filter: true },
      { field: 'Rulings', sortable: true, filter: true },
      { field: 'This item also includes', sortable: true, filter: true },
      { field: 'This item excludes', sortable: true, filter: true },
      { field: 'This item includes', sortable: true, filter: true },
    ];
    this.defaultColDef = {
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
