import { computed, Signal } from '@angular/core';

type ValidatorFn = (value: any, ...rest: any[]) => string | null;

export function CreateValidation<TFields extends Record<string, Signal<any>>>(
  fields: TFields,
  validators: Record<keyof TFields, ValidatorFn>
) {
  const errors = {} as Record<keyof TFields, Signal<string | null>>;

  for (const key in validators) {
    const validator = validators[key];
    if (key === 'confirmPassword') {
      // campo especial que depende de outro
      errors[key] = computed(() =>
        validator(fields['password']?.(), fields['confirmPassword']?.())
      );
    } else {
      errors[key] = computed(() => validator(fields[key]?.()));
    }
  }

  const isValid = computed(() => Object.values(errors).every((e) => !e()));

  return {
    ...errors,
    isValid,
  };
}
