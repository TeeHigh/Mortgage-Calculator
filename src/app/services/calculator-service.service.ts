import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private dataSource = new BehaviorSubject<any>(null);
  currentData = this.dataSource.asObservable()

  constructor() { }

  changeData(data: {monthlyPayment: number | null, totalPayment: number | null}){
    this.dataSource.next(data);
  }
}
