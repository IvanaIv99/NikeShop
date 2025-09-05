import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function allowedFormValuesValidator(allowedValues: any[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || control.value.length === 0) return { required: true };

    const invalid = control.value.some((val: any) => !allowedValues.includes(val));
    return invalid ? { invalidValue: true } : null;
  };
}

export function allowedExtensionsValidator(allowedExtensions: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file: File = control.value;
    if (!file) return null;
    const ext = file.name.split('.').pop()?.toLowerCase();
    return allowedExtensions.includes(ext || '') ? null : { invalidExtension: true };
  };
}
