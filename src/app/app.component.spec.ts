import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;

  const testSampleData = [
    {
      Code: 'A',
      Description: 'AGRICULTURE, FORESTRY AND FISHING',
      Level: '1',
      Order: '398481',
      Parent: '',
      Reference: 'A',
      Rulings: '',
      'This item also includes': '',
      'This item excludes': '',
      'This item includes':
        'This section includes the exploitation of vegetal and animal natural resources, comprising the activities of growing of crops, raising and breeding of animals, harvesting of timber and other plants, animals or animal products from a farm or their natural habitats.',
    },
    {
      Code: '01',
      Description:
        'Crop and animal production, hunting and related service activities',
      Level: '1',
      Order: '3984821',
      Parent: 'A',
      Reference: '01',
      Rulings: '',
      'This item also includes':
        'This division also includes service activities incidental to agriculture, as well as hunting, trapping and related activities.',
      'This item excludes':
        'Agricultural activities exclude any subsequent processing of the agricultural products (classified under divisions 10 and 11 (Manufacture of food products and beverages) and division 12 (Manufacture of tobacco products)), beyond that needed to prepare them for the primary markets. The preparation of products for the primary markets is included here.The division excludes field construction (e.g. agricultural land terracing, drainage, preparing rice paddies etc.) classified in section F (Construction) and buyers and cooperative associations engaged in the marketing of farm products classified in section G. Also excluded is the landscape care and maintenance, which is classified in class 81.30.',
      'This item includes':
        'This division includes two basic activities, namely the production of crop products and production of animal products, covering also the forms of organic agriculture, the growing of genetically modified crops and the raising of genetically modified animals. This division includes growing of crops in open fields as well in greenhouses. Group 01.5 (Mixed farming) breaks with the usual principles for identifying main activity. It accepts that many agricultural holdings have reasonably balanced crop and animal production, and that it would be arbitrary to classify them in one category or the other.',
    },
  ];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AppModule],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;
        });
    })
  );

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    fixture.detectChanges();
    const title = fixture.nativeElement;
    expect(title.querySelector('h1').textContent).toContain(
      'Nomenclature of Economic Activities'
    );
  });

  it('should display table header', () => {
    component.csvRecords = testSampleData;
    fixture.detectChanges();
    const headerCode = el.query(
        By.css('.ag-header-cell[col-id="Code"] .ag-header-cell-text')
      ),
      headerDescription = el.query(
        By.css('.ag-header-cell[col-id="Description"] .ag-header-cell-text')
      ),
      headerLevel = el.query(
        By.css('.ag-header-cell[col-id="Level"] .ag-header-cell-text')
      ),
      headerOrder = el.query(
        By.css('.ag-header-cell[col-id="Order"] .ag-header-cell-text')
      );

    const headerParent = el.query(
        By.css('.ag-header-cell[col-id="Parent"] .ag-header-cell-text')
      ),
      headerReference = el.query(
        By.css('.ag-header-cell[col-id="Reference"] .ag-header-cell-text')
      ),
      headerRulings = el.query(
        By.css('.ag-header-cell[col-id="Rulings"] .ag-header-cell-text')
      ),
      headerAlsoIncludes = el.query(
        By.css(
          '.ag-header-cell[col-id="This item also includes"] .ag-header-cell-text'
        )
      ),
      headerExcludes = el.query(
        By.css(
          '.ag-header-cell[col-id="This item excludes"] .ag-header-cell-text'
        )
      ),
      headerIncludes = el.query(
        By.css(
          '.ag-header-cell[col-id="This item includes"] .ag-header-cell-text'
        )
      );

    expect(headerCode.nativeElement.textContent).toBe('Code');
    expect(headerDescription.nativeElement.textContent).toBe('Description');
    expect(headerLevel.nativeElement.textContent).toBe('Level');
    expect(headerOrder.nativeElement.textContent).toBe('Order');
    expect(headerParent.nativeElement.textContent).toBe('Parent');
    expect(headerReference.nativeElement.textContent).toBe('Reference');
    expect(headerRulings.nativeElement.textContent).toBe('Rulings');
    expect(headerAlsoIncludes.nativeElement.textContent).toBe(
      'This Item Also Includes'
    );
    expect(headerExcludes.nativeElement.textContent).toBe('This Item Excludes');
    expect(headerIncludes.nativeElement.textContent).toBe('This Item Includes');
  });

  it('should display table rows', () => {
    component.csvRecords = testSampleData;
    fixture.detectChanges();
    const table = el.queryAll(By.css('.ag-center-cols-container .ag-row'));

    expect(table).toBeTruthy('Could not find table');
    expect(table.length).toBe(2, 'No table rows found');
  });

  it('should display the first row', () => {
    component.csvRecords = testSampleData;
    fixture.detectChanges();

    const firstRow = component.csvRecords[0];

    const row1 = el.query(By.css('.ag-center-cols-container .ag-row-first')),
      code = row1.query(By.css('[col-id="Code"]')),
      description = row1.query(By.css('[col-id="Description"]')),
      level = row1.query(By.css('[col-id="Level"]')),
      order = row1.query(By.css('[col-id="Order"]')),
      parent = row1.query(By.css('[col-id="Parent"]')),
      reference = row1.query(By.css('[col-id="Reference"]')),
      rulings = row1.query(By.css('[col-id="Rulings"]')),
      alsoIncludes = row1.query(By.css('[col-id="This item also includes"]')),
      excludes = row1.query(By.css('[col-id="This item excludes"]')),
      includes = row1.query(By.css('[col-id="This item includes"]'));

    expect(row1).toBeTruthy('Could not find row');
    expect(code.nativeElement.textContent).toBe(firstRow.Code);
    expect(description.nativeElement.textContent).toBe(firstRow.Description);
    expect(level.nativeElement.textContent).toBe(firstRow.Level);
    expect(order.nativeElement.textContent).toBe(firstRow.Order);
    expect(parent.nativeElement.textContent).toBe(firstRow.Parent);
    expect(reference.nativeElement.textContent).toBe(firstRow.Reference);
    expect(rulings.nativeElement.textContent).toBe(firstRow.Rulings);
    expect(alsoIncludes.nativeElement.textContent).toBe(
      firstRow['This item also includes']
    );
    expect(excludes.nativeElement.textContent).toBe(
      firstRow['This item excludes']
    );
    expect(includes.nativeElement.textContent).toBe(
      firstRow['This item includes']
    );
  });
});
