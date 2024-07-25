import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../../services/calculator-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})

export class ResultComponent implements OnInit {
  receivedResult: {
    monthlyPayment: number, 
    totalPayment: number,
    isValid: boolean 
  } = {
    monthlyPayment: 0, 
    totalPayment: 0,
    isValid: false
  };

  isValid: boolean = true;

  setIsvalid(){
    if (this.receivedResult == null || !this.receivedResult.isValid){
      return true
    }
    else return false
  }

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit(){
    this.calculatorService.currentData.subscribe(result => {
      this.receivedResult = result;
    })
    
  }
}
