import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { NotFoundPageComponent } from './container/not-found-page.component';
import { NavigationMenuComponent } from './components/navigation-menu.component';
import { MaterialModule } from '../material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthButtonComponent,
    NotFoundPageComponent,
    NavigationMenuComponent,
  ],
  exports: [AuthButtonComponent, NavigationMenuComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class CoreModule {}
