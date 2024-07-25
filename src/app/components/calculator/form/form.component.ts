import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CalculatorService } from '../../../services/calculator-service.service';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})

export class FormComponent {

  amount: number | null = null;
  term: number | null = null;
  rate: number | null = null;
  mortgageType: string = '';

  isValid: boolean = false;

  resultpayload: {monthlyPayment: number | null, totalPayment: number | null, isValid: boolean} = {
    monthlyPayment: 0,
    totalPayment: 0,
    isValid: false
  }

  reloadResultpayload: {monthlyPayment: number | null, totalPayment: number | null, isValid: boolean} = {
    monthlyPayment: 0,
    totalPayment: 0,
    isValid: false
  }

  constructor(private calculatorService: CalculatorService) {
  }

  // method handling form submission
  onSubmit(f: NgForm) {
    console.log(f)

    if (this.amount != null && this.rate != null && this.term != null && this.mortgageType != "" && this.resultpayload.monthlyPayment != null) {
      this.isValid = true
      this.calculateRepayment(f.value.amount, f.value.rate, f.value.term, f.value.mortgageType)
    }
    else {
      this.isValid = false
      throw new Error("Invalid input provided")
    }

  }

  // method to get the input values
  getValue(userInput: NgModel) {

    if (userInput == null) return

    if (userInput.name == "amount") {
      this.amount = userInput.value
    }
    if (userInput.name == "term") {
      this.term = userInput.value
    }
    if (userInput.name == "rate") {
      this.rate = userInput.value
    }
    if (userInput.name == "mortgageType") {
      this.mortgageType = userInput.value
    }
  }

  //method to calculate payment
  calculateRepayment(amount: number, rate: number, term: number, mortgageType: string) {

    if (amount == null) return;
    if (rate == null) return;
    if (term == null) return;
    if (mortgageType == null) return;

    const monthlyRate = rate / 100 / 12;
    const totalPayments = term * 12;

    if (amount === 0 && rate == 0 && term == 0) {
      this.resultpayload.monthlyPayment = 0
      return
    }

    if (mortgageType === 'repayment') {
      this.resultpayload.monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
      this.resultpayload.totalPayment = this.resultpayload.monthlyPayment * totalPayments
    } else if (mortgageType === 'interestOnly') {
      this.resultpayload.monthlyPayment = amount * monthlyRate;
      this.resultpayload.totalPayment = this.resultpayload.monthlyPayment * totalPayments
    }
  }

  //method to scroll down
  scrollToBottom(){
    window.scrollTo({
      top: 100000,
      behavior: 'smooth'
    })
  }

  //method to send out result
  sendResultOut(){
    this.calculatorService.changeData(this.resultpayload)
  }

  //method to clear calculator and result
  clearCalcAndResult(){
    this.calculatorService.changeData(this.reloadResultpayload)
  }

  checkValid(){
    if (this.amount != null && this.rate != null && this.term != null && this.mortgageType != "" && this.resultpayload.monthlyPayment != null){
      return true
    }
    else{
      return false;
    }
  }

}

