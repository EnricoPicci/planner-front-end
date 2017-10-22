import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'planner-profile-isse',
  templateUrl: './profile-isse.component.html',
  styleUrls: ['./profile-isse.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileISSEComponent implements OnInit {


  multi = [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          value: 7300000
        },
        {
          name: '2011',
          value: 8940000
        }
      ]
    },
    {
      name: 'USA',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },
    {
      name: 'France',
      series: [
        {
          name: '2010',
          value: 5000002
        },
        {
          name: '2011',
          value: 5800000
        }
      ]
    },
    {
      name: 'dd',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },
    {
      name: '11',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },
    {
      name: '22',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },
    {
      name: '33',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },
    {
      name: '44',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },
    {
      name: '55',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },
    {
      name: '66',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },
    {
      name: '77',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },
    {
      name: '88',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },
    {
      name: '99',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },
    {
      name: '00',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },
    {
      name: '12',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },
    {
      name: '23',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },
    {
      name: '34',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },
    {
      name: '45',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    },
    {
      name: '56',
      series: [
        {
          name: '2010',
          value: 7870000
        },
        {
          name: '2011',
          value: 8270000
        }
      ]
    }
  ];

  isseGraphData;
  @Input() set isseData(dataForAllYears) {
    // this.isseGraphData = dataForAllYears.filter(data => data['year'] === 1);
    // console.log('isseGraphData', this.isseGraphData);
    // this.isseGraphData = [];

    const dataY2 = dataForAllYears
                      .find(s => s.year === 2)
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
    this.isseGraphData = dataY2;
    console.log('dataForAllYears 2', dataY2);
    console.log('multi', this.multi);
  }

  view: any[] = [1200, 1000];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Probabilità di avere una certa ricchezza ad inizio del periodo selezionato';
  showYAxisLabel = false;
  yAxisLabel = 'Population';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() { }

  ngOnInit() {
  }

}
