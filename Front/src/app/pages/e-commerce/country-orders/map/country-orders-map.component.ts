import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import * as L from 'leaflet';
import { Observable } from 'rxjs';
import { IResearch } from '../../../layout/research.service';
// import 'leaflet/dist/images/marker-icon.png';
// import 'leaflet/dist/images/marker-shadow.png';
import { CountryOrdersMapService } from './country-orders-map.service';



@Component({
  selector: 'ngx-country-orders-map',
  styleUrls: ['./country-orders-map.component.scss'],
  template: `
    <div *ngIf="options" leaflet [leafletOptions]="options" [leafletLayers]="layers" (leafletMapReady)="mapReady($event)"></div>
  `,
})
export class CountryOrdersMapComponent implements OnDestroy, OnInit {

  @Input() countryId: string;
  @Input() data: Observable<IResearch[]>;
  @Input() newdata: Observable<IResearch[]>;

  @Output() select: EventEmitter<any> = new EventEmitter();

  layers = [];
  loaded = false;
  currentTheme: any;
  alive = true;
  selectedCountry;

  options;

  constructor(private ecMapService: CountryOrdersMapService,
              private router: Router,
              private ngZone: NgZone,
              private theme: NbThemeService) {

    // combineLatest([
      // this.ecMapService.getCords(),
    //   this.theme.getJsTheme(),
    // ]);
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe(([cords, config]: [any, any]) => {
    //     this.currentTheme = config.variables.countryOrders;
    //     this.layers = [this.createGeoJsonLayer(cords)];
    //     this.selectFeature(this.findFeatureLayerByCountryId(this.countryId));
    //   });
  }

  mapReady(map: L.Map) {
    map.addControl(L.control.zoom({position: 'bottomright'}));
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }

  private selectFeature(featureLayer) {
    this.data.subscribe(r => {
      const id = r.find(i => i.WELL_NAME === featureLayer.options.neverReadData).SAMPLE_ID;
      this.ngZone.run(() => this.router.navigate(['pages', 'well', id])).then();
    });
    this.newdata.subscribe(r => {
      const id = r.find(i => i.WELL_NAME === featureLayer.options.neverReadData).SAMPLE_ID;
      this.ngZone.run(() => this.router.navigate(['pages', 'well', id])).then();
    });
  }

  ngOnInit() {
    console.log(this.newdata);

    this.data.subscribe((r: IResearch[]) => {
    this.newdata.subscribe((tr: IResearch[]) => {
      const l = [
          L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
            L.marker([56.739966, 2.306901], {
              icon: L.icon({
                iconSize: [25, 41],
                iconAnchor: [13, 41],
                iconUrl: 'assets/images/marker.png',
              }),
            }),
        ];

      r.forEach(i => {
        const marker = L.marker([Number(i.WH_LAT), Number(i.WH_LONG)], {
          // @ts-ignore
          neverReadData: i.WELL_NAME,
          icon: L.icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/images/marker.png',
          }),
        });

        marker.bindTooltip(`
          <b>${i.WELL_NAME}</b><br>
          <i>Predicted values</i><br>
          <hr/>
          Gas C1: ${i.GAS_C1} <br>
          Gas C2: ${i.GAS_C2} <br>
          Gas C3: ${i.GAS_C3} <br>
          Gas IC4: ${i.GAS_IC4} <br>
          Gas NC4: ${i.GAS_NC4} <br>
          Gas IC5: ${i.GAS_IC5} <br>
          Gas NC5: ${i.GAS_NC5} <br>
        `)
          .openTooltip();

        marker.on({
          click: (e) => this.selectFeature(e.target),
        });

        l.push(marker);
      });

      tr.forEach(i => {
        const marker = L.marker([Number(i.WH_LAT), Number(i.WH_LONG)], {
          // @ts-ignore
          neverReadData: i.WELL_NAME,
          icon: L.icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/images/marker-2.png',
          }),
        });

        marker.bindTooltip(`
          <b>${i.WELL_NAME}</b><br>
          <i>Predicted values</i><br>
          <hr/>
          Gas C1: ${i.GAS_C1} <br>
          Gas C2: ${i.GAS_C2} <br>
          Gas C3: ${i.GAS_C3} <br>
          Gas IC4: ${i.GAS_IC4} <br>
          Gas NC4: ${i.GAS_NC4} <br>
          Gas IC5: ${i.GAS_IC5} <br>
          Gas NC5: ${i.GAS_NC5} <br>
        `)
          .openTooltip();

        marker.on({
          click: (e) => this.selectFeature(e.target),
        });

        l.push(marker);
      });

      this.options = {
        zoom: 6,
        minZoom: 2,
        zoomControl: false,
        center: L.latLng(56.739966, 2.306909),
        layers: l,
      };

      this.loaded = true;
    });
  });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
