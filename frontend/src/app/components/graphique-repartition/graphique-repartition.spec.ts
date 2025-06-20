import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphiqueRepartition } from './graphique-repartition';

describe('GraphiqueRepartition', () => {
  let component: GraphiqueRepartition;
  let fixture: ComponentFixture<GraphiqueRepartition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphiqueRepartition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphiqueRepartition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
