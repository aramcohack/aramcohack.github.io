import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { ProgressInfo, StatsProgressBarData } from '../../../@core/data/stats-progress-bar';

@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent implements OnDestroy, OnInit {

  namesMap = {
    '1': 'Reconnaissance',
    '2': 'Weaponization',
    '3': 'Delivery',
    '4': 'Exploitation',
    '5': 'Installation',
    '6': 'C & C',
    '7': 'Actions on Objective',
  };

  private alive = true;

  progressInfoData: ProgressInfo[];
  @Input() attacks;
  @Input() selectedAttack;
  @Output() onSelect = new EventEmitter();

  constructor(private statsProgressBarService: StatsProgressBarData, private http: HttpClient) {
    this.statsProgressBarService.getProgressInfoData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.progressInfoData = data;
      });
  }

  hs(e) {
    this.onSelect.emit(e);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
