import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessProviderService } from './business/business-provider.service';
import { HttpErrorApiService } from './business/http-error-api.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    BusinessProviderService,
    HttpErrorApiService
  ],
  exports: [
  ]
})
export class CrossCuttingModule { }
