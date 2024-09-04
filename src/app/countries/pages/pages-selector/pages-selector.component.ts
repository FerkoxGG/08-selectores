import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CountriesService } from "../../services/countries.service";
import { Region, SmallCountry } from "../../interfaces/country.interfaces";
import { filter, switchMap, tap } from "rxjs";

@Component({
  selector: "app-pages-selector",
  templateUrl: "./pages-selector.component.html",
  styleUrl: "./pages-selector.component.css"
})
export class PagesSelectorComponent implements OnInit {
  public countriesByRegion: SmallCountry[] = [];

  public borders: SmallCountry[] = [];

  public myForm: FormGroup = this.fb.group({
    region: ["", Validators.required],
    country: ["", Validators.required],
    border: ["", Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}
  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  onRegionChanged(): void {
    this.myForm.get("region")!.valueChanges
      .pipe(
        tap(() => this.myForm.get("country")!.setValue("")), //para que se limpie el campo
        tap(() => (this.borders = [])), //para que se limpie el campo
        switchMap(region => this.countriesService.getCountriesByRegion(region)) //para que se actualice el campo
      )
      .subscribe(countries => {
        this.countriesByRegion = countries;
      });
  }

  onCountryChanged(): void {
    this.myForm.get("country")!.valueChanges
      .pipe(
        tap(() => this.myForm.get("border")!.setValue("")),
        filter((alphaCode: string) => alphaCode.length > 0),
        switchMap((
          alphaCode //para que se limpie el campo
        ) => this.countriesService.getCountryByCode(alphaCode)),
        switchMap(country =>
          this.countriesService.getCountryBordersByCodes(country.borders)
        )
      ) //para que se actualice el campo
      .subscribe(countries => {
        this.borders = countries;
      });
  }
}
