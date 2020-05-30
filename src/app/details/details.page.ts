import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { PizzaService } from "../providers/pizza-service/pizza-service";
import { Pizza } from "../models/pizza";
import { Ingredient } from "../models/ingredient";
import { ActivatedRoute } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { ModalController } from "@ionic/angular";
import { CartModalPage } from "../cart-modal/cart-modal.page";
@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"],
})
export class DetailsPage implements OnInit {
  id: number;
  pizza: any;
  mydetial: any;
  pizzaingredient: any;
  pig = new Array();

  cart = [];
  cartItemCount: BehaviorSubject<number>;

  @ViewChild("cart", { static: false, read: ElementRef }) fab: ElementRef;

  constructor(
    private pizzaService: PizzaService,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController
  ) {
    this.mydetial = parseInt(
      this.activatedRoute.snapshot.paramMap.get("detailId")
    );

    this.getPizza();
    this.cart = this.pizzaService.getCart();
    this.cartItemCount = this.pizzaService.getCartItemCount();
  }

  getPizza() {
    this.pizzaService.getById(this.mydetial).subscribe((pizzas) => {
      this.pizza = pizzas;
      console.log("Pizzas :" + this.pizza.ingredients);
      for (let piz of this.pizza.ingredients) {
        this.pizzaService
          .getIngredientById(piz)
          .subscribe((ingredient_pizza) => {
            this.pizzaingredient = ingredient_pizza;
            this.pig.push(this.pizzaingredient);
            console.log(this.pizzaingredient);
          });
      }
    });
    console.log("mourad");
    console.log(this.pig);
  }

  ngOnInit() {}

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
