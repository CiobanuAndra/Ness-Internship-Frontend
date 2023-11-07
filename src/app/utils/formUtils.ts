import { AbstractControl, Validators } from '@angular/forms';

function emailDomain(control: AbstractControl): { [key: string]: boolean } | null {
  const domain = control.value ? control.value.substring(control.value.lastIndexOf('@') + 1) : null;
  return domain && domain.toLowerCase() === 'ness.com' ? null : { 'emailDomain': true };
};

function specialChars(control: AbstractControl): { [key: string]: boolean } | null {
  const specialChars = /[!@#$%^&*`()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return (control.value && specialChars.test(control.value)) ? { 'specialChars': true } : null;
};

export { emailDomain, specialChars };