import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { PizzaService } from "../providers/pizza-service/pizza-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-pizza",
  templateUrl: "./add-pizza.page.html",
  styleUrls: ["./add-pizza.page.scss"],
})
export class AddPizzaPage implements OnInit {
  //
  form: FormGroup;
  pizzaingredient: any;
  ingredients: any;

  constructor(
    public fb: FormBuilder,
    private pizzaService: PizzaService,
    public router: Router
  ) {
    this.form = this.fb.group({
      nom: [""],
      prix: [""],
      photo: [""],
      ingredients: [],
    });
    //
    this.pizzaService.getAllingredients().subscribe((ingrdt) => {
      this.ingredients = ingrdt;
      //console.log("Pizzas :" + this.pizzaTab);
    });
  }



  submitForm() {
    console.log(this.form.value);
    var formData: any = new FormData();
    formData.append("nom", this.form.get("nom").value);
    formData.append("prix", this.form.get("prix").value);
    formData.append("photo", this.form.get("photo").value);
    formData.append("ingredients", this.form.get("ingredients").value);


    this.pizzaService.createpizza(this.form.value).subscribe(() => {
      console.log(formData);
      this.router.navigateByUrl("/administration");
    });
  }

  ngOnInit() {}
}
