import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonItemComponent } from './pokemon/pokemon-list/pokemon-item/pokemon-item.component';
import { PokemonDetailComponent } from './pokemon/pokemon-detail/pokemon-detail.component';

@NgModule({
  declarations: [AppComponent, PokemonListComponent, PokemonItemComponent, PokemonDetailComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
