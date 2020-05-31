import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPizzaPage } from './add-pizza.page';

describe('AddPizzaPage', () => {
  let component: AddPizzaPage;
  let fixture: ComponentFixture<AddPizzaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPizzaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPizzaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
