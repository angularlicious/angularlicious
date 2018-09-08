import { ControlValueAccessor } from '@angular/forms';

export class NgControlBase implements ControlValueAccessor {
  public onTouchedCallback: () => {};
  public onChangeCallback: (_: any) => {};
  public innerValue: any;

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      if (this.onChangeCallback) {
        this.onChangeCallback(v);
      }
    }
  }

  get value(): any {
    return this.innerValue;
  }

  writeValue(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
