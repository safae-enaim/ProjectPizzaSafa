import { ActivatedRoute, Router } from "@angular/router";
import { PizzaService } from "./../providers/pizza-service/pizza-service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-edit-pizza",
  templateUrl: "./edit-pizza.page.html",
  styleUrls: ["./edit-pizza.page.scss"],
})
export class EditPizzaPage implements OnInit {
  //

  pizza: any;
  mydetial: any;
  pizzaingredient: any;
  pig = new Array();
  editForm: FormGroup;
  ingredients: any;

  constructor(
    private pizzaService: PizzaService,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.mydetial = parseInt(this.actRoute.snapshot.paramMap.get("idpizza"));
    this.pizzaService.getById(this.mydetial).subscribe((pizzas) => {
      this.pizza = pizzas;
      this.editForm.setValue(pizzas);
      console.log(this.pizza);
    });
    this.pizzaService.getAllingredients().subscribe((ingrdt) => {
      this.ingredients = ingrdt;
      //console.log("Pizzas :" + this.pizzaTab);
    });
    // this.getPizza();
    this.editForm = this.fb.group({
      id: [""],
      nom: [""],
      prix: [""],
      photo: [""],
      ingredients: [],
    });
  }

  submitForm() {
    console.log(this.editForm.value);
    var formData: any = new FormData();
    formData.append("nom", this.editForm.get("nom").value);
    formData.append("prix", this.editForm.get("prix").value);
    formData.append("photo", this.editForm.get("photo").value);
    formData.append("ingredients", this.editForm.get("ingredients").value);


    this.pizzaService.updatepizza(this.editForm.value).subscribe(() => {
      console.log(formData);
      this.router.navigateByUrl("/administration");
    });
  }


  ngOnInit() {}
}
