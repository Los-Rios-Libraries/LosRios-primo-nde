import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayUtilsService {

  /**
   * Shuffles an array in place using the Fisher-Yates algorithm.
   * Returns the entire shuffled array.
   */
  shuffle<T>(originalArray: readonly T[]): T[] {
    const array = [...originalArray]; 
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}