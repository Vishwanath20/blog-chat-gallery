// import { Pipe, PipeTransform, ModuleWithComponentFactories } from '@angular/core';
// import * as moment from 'moment';

// @Pipe({
//   name: 'fromNow'
// })
// export class FromNowPipe implements PipeTransform {
//  transform(value: any, args?: any): string {
//  return moment(value).fromNow();

//   }

// }


import {formatDate} from '@angular/common';
import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Pipe({
    name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

    constructor(@Inject(LOCALE_ID) private locale: string) {
    }

    transform(timestamp: Timestamp, format?: string): string {
        if (!timestamp || !timestamp.toDate) {
            return;
        }
        return formatDate(timestamp.toDate(), format || 'medium', this.locale);
    }
}