import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { random } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResearch } from './research.service';

export interface IResearch {
  value?: number;
  Country: string;
  WELL_NAME: string;
  'OGA Well Name': string;
  WH_SITETYPE: string;
  WH_FIELD: string;
  WH_BLOCK: string;
  WH_LAT: string;
  WH_LONG: string;
  WH_COORD_SYS: string;
  WH_OPERATOR: string;
  WH_SPUD_DATE: string;
  WH_SPUD_YEAR: string;
  WH_COMP_DATE: string;
  WH_TD_M: string;
  WH_DR_ELEV_M: string;
  WH_DEPTH_REF: string;
  WH_WATER_DEPTH_M: string;
  SAMPLE_ID: string;
  SH_DEPTH_TOP_FT: string;
  SH_DEPTH_BOT_FT: string;
  SH_SAMPLE_TYPE: string;
  SH_SAMPLE_SUB_TYPE: string;
  SH_ORIG: string;
  SH_ORIG_DESC: string;
  SH_TREATMENT: string;
  SH_TREATMENT_DESC: string;
  SH_LITH: string;
  SH_AGE: string;
  SH_AGE_BOT: string;
  SH_FORM: string;
  SH_FORM_BOT: string;
  SH_CDATE: string;
  SH_COMMENT: string;
  SAMPLE_ID_GM: string;
  SAMPLE_ID_GDB: string;
  SAMPLE_ID_SAM: string;
  EXT_SAMPLE_VENDOR: string;
  SAMPLE_ID_EXT: string;
  GAS_METHOD: string;
  GAS_LAB: string;
  GAS_ACQ_DATE: string;
  GAS_TOTAL_CONCENTRATION: string;
  GAS_AIR: string;
  GAS_C1: string;
  GAS_C2: string;
  C2_UNSAT: string;
  GAS_C3: string;
  C3_UNSAT: string;
  GAS_IC4: string;
  GAS_NC4: string;
  C4_UNSAT: string;
  GAS_NEOC5: string;
  GAS_IC5: string;
  GAS_NC5: string;
  C5_UNSAT: string;
  GAS_NC5_PLUS: string;
  GAS_C6PLUS: string;
  GAS_O2: string;
  GAS_CO2: string;
  GAS_H2: string;
  GAS_H2S: string;
  GAS_HE: string;
  GAS_N2: string;
  D_G_METHOD: string;
  D_G_LAB: string;
  D_G_DATA_TYPE: string;
  D_G_ACQ_DATE: string;
  CSIA_CONC_C1: string;
  CSIA_NC1: string;
  CSIA_NC2: string;
  CSIA_NC3: string;
  CSIA_IC4: string;
  CSIA_NC4: string;
  CSIA_NEOC5: string;
  CSIA_IC5: string;
  CSIA_NC5: string;
  CSIA_ETHENE: string;
  CSIA_PROPENE: string;
  DC_G_CO2: string;
  DO_G_CO2: string;
  DS_G_H2S: string;
  DD_G_H2: string;
  DN_G_N2: string;
  DD_G_GAS: string;
  DD_G_NC1: string;
  DD_G_NC2: string;
  DD_G_NC3: string;
  DD_G_IC4: string;
  DD_G_NC4: string;
  DD_G_IC5: string;
  DD_G_NC5: string;
}

@Injectable()
export class ResearchService {

  constructor(private http: HttpClient) {}

  load(): Observable<IResearch[]> {
    return this.http
      .get<IResearch[]>('assets/data/convertcsv.json')
      .pipe(
        map((r: IResearch[]) => r
        .filter(i => !!i.WH_LAT && !!i.WH_LONG)
        .filter(i => !isNaN(Number(i.WH_LAT)) && !isNaN(Number(i.WH_LONG)))
        .slice(0, 200).map(i => ({...i, value: random(100, 500)})),
        ),
      );
  }

  loadTests(): Observable<IResearch[]> {
    return this.http
      .get<IResearch[]>('assets/data/tests.json')
      .pipe(
        map((r: IResearch[]) => r
        .filter(i => !!i.WH_LAT && !!i.WH_LONG)
        .filter(i => !isNaN(Number(i.WH_LAT)) && !isNaN(Number(i.WH_LONG)))
        .map(i => ({...i, value: random(100, 500)})),
        ),
      );
  }
}


