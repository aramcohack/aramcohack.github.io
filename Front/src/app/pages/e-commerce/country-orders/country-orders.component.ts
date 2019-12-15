import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { CountryOrderData } from '../../../@core/data/country-order';
import { IResearch, ResearchService } from '../../layout/research.service';

@Component({
  selector: 'ngx-country-orders',
  providers: [ResearchService],
  styleUrls: ['./country-orders.component.scss'],
  template: `
    <nb-card [size]="'giant'">
      <nb-card-header>Wells map</nb-card-header>
      <nb-card-body *ngIf="data">
      <ngx-country-orders-map (select)="selectCountryById($event)"
                              countryId="USA" [data]="data" [newdata]="newdata">
      </ngx-country-orders-map>

      <nb-list>
        <nb-list-item class="item" *ngFor="let item of (data | async)">
          <span>{{ item.SAMPLE_ID }}</span>
          <span>{{ item.GAS_C1 }}</span>
          <span class="delta" [class.up]="true" [class.down]="false">
            🛢{{ item.value }}K
          </span>
        </nb-list-item>
      </nb-list>

      </nb-card-body>
    </nb-card>
  `,
})
export class CountryOrdersComponent implements OnDestroy, OnInit {

  private alive = true;

  countryName = '';
  countryData: number[] = [];
  countriesCategories: string[];
  breakpoint: NbMediaBreakpoint = { name: '', width: 0 };
  breakpoints: any;
  data: Observable<IResearch[]>;
  newdata: Observable<IResearch[]>;

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              private countryOrderService: CountryOrderData,
              private researchService: ResearchService) {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
    this.countryOrderService.getCountriesCategories()
      .pipe(takeWhile(() => this.alive))
      .subscribe((countriesCategories) => {
        this.countriesCategories = countriesCategories;
      });
  }

  selectCountryById(countryName: string) {
    this.countryName = countryName;

    this.countryOrderService.getCountriesCategoriesData(countryName)
      .pipe(takeWhile(() => this.alive))
      .subscribe((countryData) => {
        this.countryData = countryData;
      });
  }

  ngOnInit() {
    this.data = this.researchService.load();
    this.newdata = this.researchService.loadTests();
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
