import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { NotFoundPageComponent } from './container/not-found-page.component';
import { NavigationMenuComponent } from './components/navigation-menu.component';
import { MaterialModule } from '../material';
import { RouterModule } from '@angular/router';
import { AppComponent } from './container/app.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    AuthButtonComponent,
    NotFoundPageComponent,
    NavigationMenuComponent,
  ],
  exports: [AuthButtonComponent, NavigationMenuComponent],
  imports: [CommonModule, MaterialModule, RouterModule, NgxUiLoaderModule],
})
export class CoreModule {}
