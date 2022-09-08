import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../app/material';
import { ListComponent } from './list.component';

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule],
  declarations: [ListComponent],
  exports: [ListComponent],
})
export class ListModule {}
