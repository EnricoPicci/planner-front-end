import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {Subscription} from 'rxjs/Rx';

import {LineSeriesComponent, LineChartComponent} from '@swimlane/ngx-charts';

import { DropEvent } from 'ng2-drag-drop';

import {GoalTypeInterface} from '../shared/model/goal-type.interface';
import {GoalInterface} from '../shared/model/goal.interface';
import {ProfileInterface} from '../shared/model/profile.interface';
import {SessionService} from '../shared/services/session.service';
import {SavingsEvolutionService} from '../shared/services/savings-evolution.service';

@Component({
  selector: 'planner-profile-plan',
  templateUrl: './profile-plan.component.html',
  styleUrls: ['./profile-plan.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePlanComponent implements OnInit, OnDestroy {
  // @Input()
  projection: any;
  @Input() profile: ProfileInterface;
  maxAge: number;

  @ViewChild('chartdiv') chartdiv;
  // @ViewChild('chart') chart: LineChartComponent;
  @ViewChild('chart') chart;
  @ViewChild(LineSeriesComponent) lineSeriesComponent;

  selectedGoalSubscription: Subscription;
  profileSubscription: Subscription;

  // view: any[] = [900, 260];
  view: any[];
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

  constructor(private element: ElementRef,
              private session: SessionService,
              private cdr: ChangeDetectorRef,
              private savingsEvolution: SavingsEvolutionService) { }

  ngOnInit() {
    this.selectedGoalSubscription = this.session.selectedGoal$.subscribe(selectedGoal =>
                                          this.refreshSavingsEvolution());
    this.profileSubscription = this.session.profile$.subscribe(profile =>
                                          this.refreshSavingsEvolution());
    const dims = this.element.nativeElement.parentNode.getBoundingClientRect();
    this.view = [dims.width, dims.height];
    // this.maxAge = this.profile.age + this.profile.planDuration;
    // this.refreshSavingsEvolution();
  }
  ngOnDestroy() {
    if (this.selectedGoalSubscription) {
      this.selectedGoalSubscription.unsubscribe();
    }
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

  onDrop(event: DropEvent) {
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
    const age = this.profile.age;
    const goalYear = this.round((goalPositionX / chartWidth) * (this.maxAge - age)) + age;

    let goal: GoalInterface;
    // if a GoalType is dropped, as a result of moving a GoalType into the drop area, then a new Goal is created
    // otherwise if a Goal is dropped, as a result of moving around an already created Goal to change the year,
    // then no new Goal is created
    if (this.isGoalType(event.dragData)) {
      const goalType: GoalTypeInterface = event.dragData;
      goal = {
        name: goalType.name,
        icon: goalType.icon,
        type: goalType,
        age: goalYear,
        value: goalType.value,
        cashComponent: 0,
        debtComponent: 0,
        debtYearlyRate: 0,
        debtDuration: 0,
        debtInterest: 0,
        investmentComponent: 0,
        investmentInterest: 0
      };
      this.profile.goals.push(goal);
    } else {
      goal = event.dragData;
      goal.age = goalYear;
    }
    this.session.goalSelectedChanged(goal);
    this.refreshSavingsEvolution();
  }
  // return true if the object passed in as parameter is of type GoalTypeInterface, otherwise false
  private isGoalType(goalOrGoalType) {
    return goalOrGoalType.code !== undefined;
  }

  onSelect(event) {
    // console.log('select event', event);
  }
  onActivate(event) {
    // console.log('activate event', event);
  }

  private round(x: number, multipleOf?: number) {
    if (!multipleOf) {
      multipleOf = 1;
    }
    return Math.ceil(x / multipleOf) * multipleOf;
  }

  private getxOffsetForGoal(goal: GoalInterface) {
    console.log('do I pass here ============');
    const chartOffsetX = this.getChartXOffset() + this.getChartdivXOffest();
    let chartWidth = 0;
    if (this.chart) {
      chartWidth = this.chart.dims.width;
    }
    const age = this.profile.age;
    const ageXOffset = (goal.age - age) / (this.maxAge - age) * chartWidth;
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

  private refreshSavingsEvolution() {
    if (!this.profile) {
      return null;
    }
    this.maxAge = this.profile.age + this.profile.planDuration;
    const projectionTemp = [];
    const savings = this.savingsEvolution.calculateSavingsEvolution(this.profile);
    const savingsChartData = [];
    const profileAge = this.profile.age;
    for (let i = 0; i < savings.length; i++) {
      const year = i + profileAge;
      const yearlySavings = {
        'name': year,
        'value': savings[i]
      };
      savingsChartData.push(yearlySavings);
    }
    projectionTemp.push({
      'name': 'Liquidità',
      'series': savingsChartData
    });
    this.projection = projectionTemp;
    this.cdr.detectChanges();
  }

}
