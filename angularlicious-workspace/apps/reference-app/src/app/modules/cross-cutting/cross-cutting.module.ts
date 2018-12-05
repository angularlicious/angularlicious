import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessProviderService } from './business/business-provider.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    BusinessProviderService
  ],
  exports: [
  ]
})
export class CrossCuttingModule { }
