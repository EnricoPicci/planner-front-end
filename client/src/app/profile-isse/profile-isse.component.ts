import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'planner-profile-isse',
  templateUrl: './profile-isse.component.html',
  styleUrls: ['./profile-isse.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileISSEComponent implements OnInit {
  year: number;
  _dataForAllYears;

  isseGraphData;
  @Input() set isseData(dataForAllYears) {
    this._dataForAllYears = dataForAllYears;
    this.year = 2;
    this.setIsseDataForYear();
  }

  view: any[] = [1200, 800];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Probabilità di avere una certa ricchezza ad inizio del periodo selezionato';
  showYAxisLabel = false;
  yAxisLabel = '';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() { }

  ngOnInit() {
  }

  setIsseDataForYear() {
    this.isseGraphData = this._dataForAllYears
              .find(s => s.year === this.year)
              .data
              // tslint:disable-next-line:arrow-return-shorthand
              .map(d => {return {
                  name: d.assex,
                  series: [
                    {
                      name: 'invest',
                      value: d.invest === -999999 ? 0 : d.invest
                    },
                    {
                      name: 'cc',
                      value: d.cc === -999999 ? 0 : d.cc
                    },
                    {
                      name: 'debito',
                      value: d.debito === -999999 ? 0 : d.debito
                    }
                  ]
                };
              });
  }

  getMaxAnno() {
    return this._dataForAllYears.length;
  }

  setYear(event) {
    this.year = event.value;
    this.setIsseDataForYear();
  }

}
