import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesSelectorComponent } from "./pages/pages-selector/pages-selector.component";
import { CountriesRoutingModule } from "./countries-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [PagesSelectorComponent],
  imports: [CommonModule, CountriesRoutingModule, ReactiveFormsModule]
})
export class CountriesModule {}
