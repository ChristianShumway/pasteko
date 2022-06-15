import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterComponent),
      multi: true
    }
  ]
})

export class CounterComponent implements OnInit, ControlValueAccessor {
  _stock: number | undefined;
  @Input() set stock(data: number | undefined) {
    this._stock = data;
  }
  currentValue: number = 0;
  onChange = (_: any) => { };
  onTouch = () => { };
  isDisabled!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  add() {
    this.currentValue = this.currentValue + 1;
    this.onTouch();
    this.onChange(this.currentValue);
  }

  sub() {
    this.currentValue = this.currentValue - 1;
    this.onTouch();
    this.onChange(this.currentValue);
  }

  writeValue(value: number): void {
    if(value) {
      this.currentValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

  setDisabledState(state: boolean): void {
    console.log(state);
    this.isDisabled = state;
  }

}
