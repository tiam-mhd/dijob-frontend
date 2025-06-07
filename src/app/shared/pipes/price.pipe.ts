import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  transform(value: number | string, currency: 'rial' | 'toman' = 'toman'): string {
    if (value == null || value === '') return '';

    let amount = +value;

    // if (currency === 'toman') {
    //   amount = Math.floor(amount / 10); // چون هر ۱۰ ریال = ۱ تومان
    // }

    // const formatted = amount.toLocaleString('fa-IR');
    const formatted = amount.toLocaleString('en-US');

    return `${formatted} ${currency === 'toman' ? 'تومان' : 'ریال'}`;
  }
}