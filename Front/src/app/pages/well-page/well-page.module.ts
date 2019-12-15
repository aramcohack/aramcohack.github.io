import { NgModule } from "@angular/core";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import {
    NbAccordionModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbListModule,
    NbProgressBarModule,
    NbSelectModule,
    NbTabsetModule,
    NbUserModule
} from "@nebular/theme";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ChartModule } from "angular2-chartjs";
import { NgxEchartsModule } from "ngx-echarts";
import { ThemeModule } from "../../@theme/theme.module";
import { ResearchService } from "../layout/research.service";
import { WellPageComponent } from "./well-page.component";

@NgModule({
    imports: [
        ThemeModule,
        NbCardModule,
        NbUserModule,
        NbButtonModule,
        NbAccordionModule,
        NbIconModule,
        NbTabsetModule,
        NbSelectModule,
        NbListModule,
        ChartModule,
        NbProgressBarModule,
        NgxEchartsModule,
        NgxChartsModule,
        LeafletModule
    ],
    declarations: [WellPageComponent],
    providers: [ResearchService]
})
export class WellPageModule {}
