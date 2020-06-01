import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Pizza } from "../../models/pizza";
import { Ingredient } from "../../models/ingredient";
import { map, catchError, tap } from "rxjs/operators";

import { BehaviorSubject, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  panier: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  private pizzasUrl = "https://api.ynov.jcatania.io/pizza";
  private ingredientsUrl = "https://api.ynov.jcatania.io/ingredient";
  private endpoint = "pizzas";

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor(private http: HttpClient) {
    console.log("Hello PizzaService ");
  }

  public getAllPizzas(): any {
    const url = this.pizzasUrl;
    return this.http.get<Pizza[]>(url);
  }

  public getAllingredients(): any {
    const url = this.ingredientsUrl;
    return this.http.get<Ingredient[]>(url);
  }

  addPizzaToCart(myNumb: number) {
    const tmp = this.panier.getValue();
    tmp.push(myNumb);
    this.panier.next(this.panier.getValue());
  }
  deletePizzaFromCart(myNumb: number) {
    const index = this.panier.getValue().indexOf(myNumb);
    this.panier.getValue().splice(index, 1);
    this.panier.next(this.panier.getValue());
  }

  public getById(id: number): any {
    const url = this.pizzasUrl + "/" + id;
    return this.http.get<Pizza>(url);
  }

  public getIngredientById(id: number) {
    const url = this.ingredientsUrl + "/" + id;
    return this.http.get<Ingredient>(url);
  }


  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addPizzaa(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreasePizzaa(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removePizzaa(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }

  createpizza(pizza: Pizza) {
    return this.http.post(this.pizzasUrl, pizza).pipe(
      tap((status) => console.log("status: " + status)),
      catchError(this.handleError)
    );
  }

  updatepizza(pizza: Pizza) {
    return this.http.put(this.pizzasUrl + "/" + pizza.id, pizza).pipe(
      tap((status) => console.log("status: " + status)),
      catchError(this.handleError)
    );
  }



  deletepizza(idpizza: number) {
    return this.http.delete(this.pizzasUrl + "/" + idpizza).pipe(
      tap((status) => console.log("status: " + status)),
      catchError(this.handleError)
    );
  }
  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}
