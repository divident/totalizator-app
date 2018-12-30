import { Pipe, PipeTransform } from '@angular/core';
import { BetStatus } from './shared/bet';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: number): string {
    if(BetStatus.LOSE == value) {
      return "przegrana";
    } else if(BetStatus.WIN == value) {
      return "wygrana";
    } else {
      return "oczekuje";
    }
  }

}
