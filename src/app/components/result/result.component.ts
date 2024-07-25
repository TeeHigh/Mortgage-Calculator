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
  } = {
    monthlyPayment: 0, 
    totalPayment: 0,
  };

  isValid: boolean = true;



  constructor(private calculatorService: CalculatorService) {}

  ngOnInit(){
    this.calculatorService.currentData.subscribe(result => {
      this.receivedResult = result;
    })
    
  }
}
