import { Component, OnInit, Input, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';

import {LineSeriesComponent, LineChartComponent} from '@swimlane/ngx-charts';

import { DropEvent } from 'ng2-drag-drop';

import {GoalTypeInterface} from '../shared/model/goal-type.interface';
import {GoalInterface} from '../shared/model/goal.interface';
import {ProfileInterface} from '../shared/model/profile.interface';

@Component({
  selector: 'planner-profile-plan',
  templateUrl: './profile-plan.component.html',
  styleUrls: ['./profile-plan.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePlanComponent implements OnInit {
  @Input() projection: any;
  @Input() profile: ProfileInterface;

  @ViewChild('chartdiv') chartdiv;
  // @ViewChild('chart') chart: LineChartComponent;
  @ViewChild('chart') chart;
  @ViewChild(LineSeriesComponent) lineSeriesComponent;

  // view: any[] = [700, 200];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  autoScale = true;

  constructor(private element: ElementRef) { }

  ngOnInit() {
  }

  onDrop(event: DropEvent) {
    const goalType: GoalTypeInterface = event.dragData;
    // X position of the drop event
    const dropX = event.nativeEvent.clientX;
    const chartWidth = this.chart.dims.width;
    // calculate where the area of the chart starts
    const chartOffsetX = this.getChartXOffset() + this.getChartdivXOffest();
    let goalPositionX;
    // if the drop is on the left of the chart area, then it is treated as it was at the beginning of the chart area
    if (dropX < chartOffsetX) {
      goalPositionX = 0;
    } else
    // if the drop is on the right of the chart area, then it is treated as it was at the end of the chart area
    if (dropX > chartOffsetX + chartWidth) {
      goalPositionX = chartWidth;
    } else {
      goalPositionX = dropX - chartOffsetX;
    }
    // tslint:disable-next-line:radix
    const age = parseInt(this.profile.age);
    const goalYear = (goalPositionX / chartWidth) * (100 - age) + age;
    console.log ('goalPositionX', goalPositionX);
    console.log ('goalYear', this.round(goalYear));

    const goal: GoalInterface = {
      name: goalType.name,
      icon: goalType.icon,
      age: goalYear
    };
    this.profile.goals.push(goal);
    // const left = this.chartdiv.nativeElement.getBoundingClientRect().left;
    // const right = this.chartdiv.nativeElement.getBoundingClientRect().right;
    // const width = right - left;
    // const dropX = event.nativeEvent.clientX;
    // console.log('drop event %', (dropX - left) / width *  100);
    // console.log('drop event', event);
    // console.log('drop event', left, right, width, dropX);
    // console.log('getBoundingClientRect()', this.chartdiv.nativeElement.getBoundingClientRect());
    // console.log('chartdiv', this.chartdiv);
    // console.log('lineSeriesComponent', this.lineSeriesComponent);
    // console.log('chart', this.chart);
    // console.log('chart element', this.chart.chartElement);
    // console.log('chart element rect', this.chart.chartElement.nativeElement.getBoundingClientRect());
    // console.log('getContainerDims()', this.chart.getContainerDims());
    // console.log('chart dims', this.chart.dims);
  }

  onSelect(event) {
    console.log('select event', event);
  }
  onActivate(event) {
    console.log('activate event', event);
  }

  private round(x: number, multipleOf?: number) {
    if (!multipleOf) {
      multipleOf = 1;
    }
    return Math.ceil(x / multipleOf) * multipleOf;
  }

  private getxOffsetForGoal(goal: GoalInterface) {
    const chartOffsetX = this.getChartXOffset() + this.getChartdivXOffest();
    let chartWidth = 0;
    if (this.chart) {
      chartWidth = this.chart.dims.width;
    }
    // const chartWidth = this.chart.dims.width;
    // tslint:disable-next-line:radix
    const age = parseInt(this.profile.age);
    const ageXOffset = (goal.age - age) / (100 - age) * chartWidth;
    return ageXOffset + this.getChartXOffset();
  }

  private getChartXOffset() {
    let offsetX = 0;
    if (this.chart) {
      offsetX = this.chart.dims.xOffset;
    }
    // const left = this.chartdiv.nativeElement.getBoundingClientRect().left;
    // const offsetX = this.chart.dims.xOffset;
    // it is not clear why, but it seems that there is a filler of 15 to be considered to calculate the X position of the chart
    const filler = 0;
    // calculate where the area of the chart starts
    return offsetX + filler;
  }
  private getChartdivXOffest() {
    let left = 0;
    if (this.chartdiv) {
      left = this.chartdiv.nativeElement.getBoundingClientRect().left;
    }
    return left;
  }

  private isChartDefined() {
    return this.chart != null;
  }

}
