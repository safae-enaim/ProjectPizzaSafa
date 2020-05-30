import { Pizza } from "./../models/pizza";
import { PizzaService } from "./../providers/pizza-service/pizza-service";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-cart-modal",
  templateUrl: "./cart-modal.page.html",
  styleUrls: ["./cart-modal.page.scss"],
})
export class CartModalPage implements OnInit {
  cart: Pizza[] = [];

  constructor(
    private pizzaService: PizzaService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.cart = this.pizzaService.getCart();
  }

  decreaseCartItem(product) {
    this.pizzaService.decreasePizzaa(product);
  }

  increaseCartItem(product) {
    this.pizzaService.addPizzaa(product);
  }

  removeCartItem(product) {
    this.pizzaService.removePizzaa(product);
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.prix * j.amount, 0);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  checkout() {}
}
