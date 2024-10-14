import { Component, computed, OnInit, signal } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  selected: boolean;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {


  products =signal<Product[]>([]) ;

  selectedProducts = computed<number>(() => this.products().filter(p => p.selected).length);
  total = computed<number>(() => this.products()
                                     .filter(p => p.selected)
                                     .reduce((sum, current) => sum + current.price, 0)
                          );

  constructor() {

  }

  ngOnInit(): void {
    this.products.set([
      {id: 1, name: "computer", price: 4200, selected: false},
      {id: 2, name: "Printer", price: 1200, selected: true},
      {id: 3, name: "Smart Phone", price: 800, selected:true}
    ]);
  }

  select(product: Product) {
    this.products.update(prods => {
      return prods.map(p => p.id === product.id ? {...p, selected: !p.selected} : p);
    }) 
  }
}
