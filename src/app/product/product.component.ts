import { Component, computed, effect, signal } from '@angular/core';
import { single } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  price: number = 8000;
  quantity = signal<number>(6);
  total = computed( () => this.price * this.quantity())

  counter = signal(0);
  constructor() {
    // Effect permet de capaturer les changements des signals 
    effect(() => {
      console.log("Quantity: " + this.quantity());
      this.counter.set(4) ;
    }, {allowSignalWrites: true}) // pour pouvoir modifier la valeur d'un signal dans un effect
  }
  increment() {
    this.quantity.update(currentValue => currentValue + 1) ;
  }

  decrement() {
    this.quantity.set(this.quantity() - 1) ;
  }
}
