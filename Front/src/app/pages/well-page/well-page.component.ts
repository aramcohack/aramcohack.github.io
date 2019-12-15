import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { random } from 'lodash';
import { IResearch, ResearchService } from '../layout/research.service';

@Component({
  selector: 'ngx-well-page',
  templateUrl: './well-page.component.html',
  styleUrls: ['./well-page.component.scss'],
})
export class WellPageComponent implements OnInit {

  constructor(private researchService: ResearchService, private router: Router, private route: ActivatedRoute) { }

  isComparing = false;
  data: IResearch;
  newdata: IResearch;
  comapredData: IResearch;
  type = 'bar';
  d;
  d1;
  d2;
  options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  options2 = {
    responsive: true,
    maintainAspectRatio: false,
  };

  toggleComaring() {
    this.isComparing = !this.isComparing;
  }

  ngOnInit() {
    this.route.params.subscribe(r => {
      console.log(r);

      this.researchService.load().subscribe(d => {
        this.researchService.loadTests().subscribe(d1 => {
          this.data = d1.find(item => item.SAMPLE_ID === r.id) || d.find(item => item.SAMPLE_ID === r.id);
          this.comapredData = d[random(0, 199)];

          const l = [];
          const a = [];
          const l1 = [];
          const a1 = [];
          const l2 = [];
          const a2 = [];

          if (!this.data) {
            this.router.navigate(['pages', '404']);
          }

          Object.entries(this.data)
          .filter((item, idx) => {
            const [key, value] = item;
            if (!!value && !isNaN(Number(value)) && key.split('_')[0] === 'GAS' && key.split('_')[1] !== 'C1') return true;
            return false;
          })
          .forEach(item => {
            l.push(item[0]);
            l2.push(item[0]);
            a.push(item[1]);
            a2.push([item[1], item[1] + 1]);
          });

          Object.entries(this.comapredData)
          .filter((item, idx) => {
            const [key, value] = item;
            if (!!value && !isNaN(Number(value)) && key.split('_')[0] === 'GAS' && key.split('_')[1] !== 'C1') return true;
            return false;
          })
          .forEach(item => {
            console.log(item);
            l1.push(item[0]);
            a1.push(item[1]);
          });

          this.d = {
            labels: l,
            datasets: [
              {
                label: 'Predicts data',
                data: a,
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(201, 203, 207, 0.2)'],
                'borderColor': ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
              },
            ],
          };
          this.d1 = {
            labels: l1,
            datasets: [
              {
                label: 'Predicts data',
                data: a1,
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(201, 203, 207, 0.2)'],
                'borderColor': ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
              },
            ],
          };

          this.d2 = {
            labels: l,
            datasets: [
              {
                label: 'Selected Well',
                data: a,
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(201, 203, 207, 0.2)'],
                'borderColor': ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
              },
              {
                label: 'Compared Well',
                data: a1,
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(201, 203, 207, 0.2)'],
                'borderColor': ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
              },
            ],
          };
        });
      });
    });
  }

}
