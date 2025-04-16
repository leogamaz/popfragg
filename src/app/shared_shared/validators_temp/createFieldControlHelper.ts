import { signal, Signal } from '@angular/core';

export function CreateFieldControl(value: Signal<string>) {
  const touched = signal(false);
  const setTouched = () => touched.set(true);
  return { touched, setTouched, value };
}
