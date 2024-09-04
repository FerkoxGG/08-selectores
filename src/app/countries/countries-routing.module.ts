import { RouterModule, Routes } from "@angular/router";
import { PagesSelectorComponent } from "./pages/pages-selector/pages-selector.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "selector", component: PagesSelectorComponent },
      { path: "**", redirectTo: "selector" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule {}
