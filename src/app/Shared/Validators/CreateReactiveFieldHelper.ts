import { computed, signal, Signal, WritableSignal } from '@angular/core';

export interface ReactiveField {
  value: WritableSignal<string>;
  touched: Signal<boolean>;
  error: Signal<string | null>;
  setTouched: () => void;
}

export function CreateReactiveField(
  field: WritableSignal<string>,
  validator: (value: string) => string | null
): ReactiveField {
  const touched = signal(false);
  const error = computed(() => validator(field()));

  const setTouched = () => touched.set(true);

  return {
    value: field,
    touched,
    error,
    setTouched,
  };
}
