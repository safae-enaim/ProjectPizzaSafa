import { Component, OnInit } from "@angular/core";
import { Pizza } from "../models/pizza";
import { PizzaService } from "../providers/pizza-service/pizza-service";
import { Router } from "@angular/router";
@Component({
  selector: "app-administration",
  templateUrl: "./administration.page.html",
  styleUrls: ["./administration.page.scss"],
})
export class AdministrationPage implements OnInit {
  pizzaTab: Pizza[] = [];
  constructor(private pizzaService: PizzaService, private router: Router) {
    this.pizzaService.getAllPizzas().subscribe((pizzas) => {
      this.pizzaTab = pizzas;
      //console.log("Pizzas :" + this.pizzaTab);
    });
  }

  ngOnInit() {}

  RemovePizza(idpz: number) {
    if (confirm("Voulez vous sur supprimer cette pizza ")) {
      this.pizzaService.deletepizza(idpz).subscribe(() => {
        console.log("deleted item" + idpz);
        this.pizzaTab;
      });
      this.router.navigateByUrl("/administration");
      window.location.reload();
    }
  }
}
