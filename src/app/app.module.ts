import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { TreenodeModule } from './treenode/treenode.module'
import { PageNotFoundComponent }   from './not-found.component';
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TreenodeModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
