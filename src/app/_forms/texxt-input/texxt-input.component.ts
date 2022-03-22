import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-texxt-input',
  templateUrl: './texxt-input.component.html',
  styleUrls: ['./texxt-input.component.css'],
})
export class TexxtInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() type = 'text';
  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
