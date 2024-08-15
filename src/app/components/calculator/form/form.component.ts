import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CalculatorService } from '../../../services/calculator-service.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  resultPayload = { monthlyPayment: 0, totalPayment: 0 };

  constructor(private fb: FormBuilder, private calculatorService: CalculatorService) {
    this.form = this.fb.group({
      amount: [null, Validators.required],
      term: [null, [Validators.required, Validators.min(0)]],
      rate: [null, [Validators.required, Validators.min(0)]],
      mortgageType: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log(this.form.value);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { amount, rate, term, mortgageType } = this.form.value;
    this.calculateRepayment(amount, rate, term, mortgageType);
    this.sendResultOut();
    this.scrollToBottom();
    console.log(this.form.value);
  }

  calculateRepayment(amount: number, rate: number, term: number, mortgageType: string) {
    const monthlyRate = rate / 100 / 12;
    const totalPayments = term * 12;

    if (mortgageType === 'repayment') {
      this.resultPayload.monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
      this.resultPayload.totalPayment = this.resultPayload.monthlyPayment * totalPayments;
    } else if (mortgageType === 'interestOnly') {
      this.resultPayload.monthlyPayment = amount * monthlyRate;
      this.resultPayload.totalPayment = this.resultPayload.monthlyPayment * totalPayments;
    }
  }

  scrollToBottom() {
    if (this.form.valid) {
      window.scrollTo({
        top: 100000,
        behavior: 'smooth'
      });
    }
  }

  sendResultOut() {
    this.calculatorService.changeData(this.resultPayload);
  }

  clearCalcAndResult() {
    this.calculatorService.changeData({ monthlyPayment: 0, totalPayment: 0 });
    this.form.reset();
  }
}
