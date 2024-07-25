import { Component } from '@angular/core';
import { FormComponent } from "./form/form.component";


@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})

export class CalculatorComponent {


}


