import { Pipe, PipeTransform } from '@angular/core';
import moment from 'jalali-moment';

@Pipe({
  name: 'persianDate'
})
export class PersianDatePipe implements PipeTransform {
  transform(value: any, format: string = 'jYYYY/jMM/jDD HH:mm'): string {
    if (!value) return '';
    return moment(value).locale('fa').format(format);
  }
}
