import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'planner-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit {
  @Input() title: string;
  @Input() min = 0;
  @Input() value: number;
  @Input() step: number;
  _max: number;

  @Output() valueChanged = new EventEmitter<number>();

  @Input()
  get max() {
    return this._max;
  }
  set max(data: number) {
    this._max = data;
    this.initializeStep();
  }

  // value: number;

  constructor() { }

  ngOnInit() {
    if (!this.value) {
      this.value = this.min;
    }
    this.initializeStep();
  }
  initializeStep() {
    const range = this._max - this.min;
    if (range > 0 && !this.step) {
      this.step = range / 50;
    }
  }

  onValueChanged(event) {
    console.log('changed', event);
    this.value = event.value;
    this.valueChanged.next(this.value);
    // this.changeDetectorRef.detectChanges();
  }

  getTitleValue() {
    let ret = this.title;
    if (this.value) {
      ret = ret + ' - ' + this.value.toLocaleString('it-IT');
    }
    return ret;
  }

  getValue() {
    let ret = this.value;
    if (!this.value) {
      ret = 0;
    }
    return ret;
  }

  formatNumber(number: number) {
    // return new Intl.NumberFormat().format(number);
    // return Number(number).toLocaleString();
    return number.toLocaleString('it-IT');
  }

}
