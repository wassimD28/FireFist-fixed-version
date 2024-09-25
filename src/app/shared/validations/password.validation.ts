import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidation {
  static passwordMinLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      return value.length >= minLength ? null : { minLength: true };
    };
  }

  static passwordUpperCase(minUpperCase: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      const upperCaseCount = (value.match(/[A-Z]/g) || []).length;
      return upperCaseCount >= minUpperCase ? null : { upperCase: { required: minUpperCase, actual: upperCaseCount } };
    };
  }

  static passwordLowerCase(minLowerCase: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      const lowerCaseCount = (value.match(/[a-z]/g) || []).length;
      return lowerCaseCount >= minLowerCase ? null : { lowerCase: { required: minLowerCase, actual: lowerCaseCount } };
    };
  }

  static passwordDigit(minDigits: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      const digitCount = (value.match(/\d/g) || []).length;
      return digitCount >= minDigits ? null : { digit: { required: minDigits, actual: digitCount } };
    };
  }

  static passwordSpecialChar(minSpecialChars: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      const specialCharCount = (value.match(/[@$!%*?&]/g) || []).length;
      return specialCharCount >= minSpecialChars ? null : { specialChar: { required: minSpecialChars, actual: specialCharCount } };
    };
  }
  static passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
}
