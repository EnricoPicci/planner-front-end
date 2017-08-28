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
  @Input() max: number;
  @Input() initialValue: number;
  @Input() step;

  @Output() valueChanged = new EventEmitter<number>();

  value: number;

  constructor() { }

  ngOnInit() {
    if (this.initialValue) {
      this.value = this.initialValue;
    } else {
      this.value = this.min;
    }

    if (!this.step) {
      const range = this.max - this.min;
      if (range > 0) {
        this.step = range / 50;
      }
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
    if (this.initialValue) {
      ret = ret + ' - ' + this.initialValue;
    }
    return ret;
  }

  getValue() {
    let ret = this.initialValue;
    if (!this.initialValue) {
      ret = 0;
    }
    return ret;
  }

}
