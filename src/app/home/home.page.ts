import { Component, ViewChild, ElementRef } from "@angular/core";
import { Pizza } from "../models/pizza";
import { PizzaService } from "../providers/pizza-service/pizza-service";
import { BehaviorSubject } from "rxjs";
import { ModalController } from "@ionic/angular";
import { CartModalPage } from "../cart-modal/cart-modal.page";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  pizzaTab: Pizza[] = [];
  panier: number[];
  presentation: any;

  cart = [];
  cartItemCount: BehaviorSubject<number>;

  @ViewChild("cart", { static: false, read: ElementRef }) fab: ElementRef;

  constructor(
    private pizzaService: PizzaService,
    private modalCtrl: ModalController
  ) {
    this.pizzaService.getAllPizzas().subscribe((pizzas) => {
      this.pizzaTab = pizzas;
      //console.log("Pizzas :" + this.pizzaTab);
    });
    this.cart = this.pizzaService.getCart();
    this.cartItemCount = this.pizzaService.getCartItemCount();
  }

  addPizza(id: number) {
    this.pizzaService.addPizzaToCart(id);
  }

  rmPizza(numb: number) {
    this.pizzaService.deletePizzaFromCart(numb);
  }

  /* */

  addToCart(product) {
    this.animateCSS("tada");
    this.pizzaService.addPizzaa(product);
  }

  async openCart() {
    this.animateCSS("bounceOutLeft", true);

    let modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: "cart-modal",
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove("animated", "bounceOutLeft");
      this.animateCSS("bounceInLeft");
    });
    modal.present();
  }

  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add("animated", animationName);

    //https://github.com/daneden/animate.css
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove("animated", animationName);
      }
      node.removeEventListener("animationend", handleAnimationEnd);
    }
    node.addEventListener("animationend", handleAnimationEnd);
  }
}
