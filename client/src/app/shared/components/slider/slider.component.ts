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

  @Output() valueChanged = new EventEmitter<number>();

  value: number;
  step = 1;

  constructor() { }

  ngOnInit() {
    if (this.initialValue) {
      this.value = this.initialValue;
    } else {
      this.value = this.min;
    }

    const range = this.max - this.min;
    if (range > 0) {
      this.step = range / 50;
    }
  }

  onValueChanged(event) {
    console.log('changed', event);
    this.value = event.value;
    this.valueChanged.next(this.value);
  }

  // getStep() {
  //   let step = 1;
  //   const range = this.max - this.min;
  //   if (range > 0) {
  //     step = range / 50;
  //   }
  //   console.log('step', step, range);
  //   return step;
  // }

}
