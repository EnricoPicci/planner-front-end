import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'planner-profile-financial-plan',
  templateUrl: './profile-financial-plan.component.html',
  styleUrls: ['./profile-financial-plan.component.css']
})
export class ProfileFinancialPlanComponent implements OnInit {
  _dataForAllScelte;
  favoriteScelta;
  dataForFinancialPlanGraph;
  scelte = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  @Input() set financialPlanData(dataForAllScelte) {
    this._dataForAllScelte = dataForAllScelte;
    this.favoriteScelta = 1;
    this.setFinancialPlanDataForScelta();
  }

  view: any[] = [1200, 400];
  // view: any[];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Anni';
  showYAxisLabel = true;
  yAxisLabel = 'Ricchezza';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() { }

  ngOnInit() {
  }

  setScelta(event) {
    this.favoriteScelta = event.value;
    this.setFinancialPlanDataForScelta();
  }

  setFinancialPlanDataForScelta() {
    const dataForScelta = this._dataForAllScelte.find(data => data.scelta === this.favoriteScelta).data;
    console.log('dataForScelta', dataForScelta);
    this.dataForFinancialPlanGraph = [];
    const dataForFinancialPlanGraphBest = {
      name: 'Scenario migliore',
      series: dataForScelta.map(d => {
        return {
          name: d.year,
          value: d.val_best
        };
      })
    };
    const dataForFinancialPlanGraphWorst = {
      name: 'Scenario peggiore',
      series: dataForScelta.map(d => {
        return {
          name: d.year,
          value: d.val_worst
        };
      })
    };
    const dataForFinancialPlanGraphAverage = {
      name: 'Scenario medio',
      series: dataForScelta.map(d => {
        return {
          name: d.year,
          value: d.val_avg
        };
      })
    };
    const dataForFinancialPlanGraphSenza = {
      name: 'Scenario senza impieghi/debito',
      series: dataForScelta.map(d => {
        return {
          name: d.year,
          value: d.val_senza
        };
      })
    };
    this.dataForFinancialPlanGraph.push(dataForFinancialPlanGraphBest);
    this.dataForFinancialPlanGraph.push(dataForFinancialPlanGraphWorst);
    this.dataForFinancialPlanGraph.push(dataForFinancialPlanGraphAverage);
    this.dataForFinancialPlanGraph.push(dataForFinancialPlanGraphSenza);
  }

}
