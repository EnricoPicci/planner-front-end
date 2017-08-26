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

  view: any[] = [900, 260];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Anni';
  showYAxisLabel = true;
  yAxisLabel = 'Valore';
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
    return offsetX;
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
