import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "details/:detailId",
    loadChildren: () =>
      import("./details/details.module").then((m) => m.DetailsPageModule),
  },
  {
    path: "panier",
    loadChildren: () =>
      import("./panier/panier.module").then((m) => m.PanierPageModule),
  },
  {
    path: "cart-modal",
    loadChildren: () =>
      import("./cart-modal/cart-modal.module").then(
        (m) => m.CartModalPageModule
      ),
  },
  {
    path: "administration",
    loadChildren: () =>
      import("./administration/administration.module").then(
        (m) => m.AdministrationPageModule
      ),
  },
  {
    path: "add-pizza",
    loadChildren: () =>
      import("./add-pizza/add-pizza.module").then((m) => m.AddPizzaPageModule),
  },
  {
    path: "edit-pizza/:idpizza",
    loadChildren: () =>
      import("./edit-pizza/edit-pizza.module").then(
        (m) => m.EditPizzaPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
