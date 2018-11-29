import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';

/**
 * Import [Site] compoents for the application;
 */
import { AboutComponent } from './about/about.component';
import { AppIntroComponent } from './app-intro/app-intro.component';
import { ArticleComponent } from './article/article.component';
import { CardComponent } from './card/card.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DarkContentComponent } from './dark-content/dark-content.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { EventTrackerDirective } from './event-tracker.directive';
import { FooterComponent } from './footer/footer.component';
import { LandingIntroComponent } from './landing-intro/landing-intro.component';
import { LicenseComponent } from './license/license.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ModalLargeComponent } from './modal-large/modal-large.component';
import { ModalSmallComponent } from './modal-small/modal-small.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TabsOnCardComponent } from './tabs-on-card/tabs-on-card.component';
import { TabsWithBackgroundOnCardComponent } from './tabs-with-background-on-card/tabs-with-background-on-card.component';
import { TwoColumnContentComponent } from './two-column-content/two-column-content.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    AboutComponent,
    AppIntroComponent,
    ArticleComponent,
    CardComponent,
    CarouselComponent,
    DarkContentComponent,
    DatePickerComponent,
    EventTrackerDirective,
    FooterComponent,
    LandingIntroComponent,
    LicenseComponent,
    MainContentComponent,
    ModalLargeComponent,
    ModalSmallComponent,
    NavBarComponent,
    TabsOnCardComponent,
    TabsWithBackgroundOnCardComponent,
    TwoColumnContentComponent
  ],
  exports: [
    AboutComponent,
    AppIntroComponent,
    ArticleComponent,
    CardComponent,
    CarouselComponent,
    DarkContentComponent,
    DatePickerComponent,
    EventTrackerDirective,
    FooterComponent,
    LandingIntroComponent,
    LicenseComponent,
    MainContentComponent,
    ModalLargeComponent,
    ModalSmallComponent,
    NavBarComponent,
    TabsOnCardComponent,
    TabsWithBackgroundOnCardComponent,
    TwoColumnContentComponent
  ]
})
export class SiteModule {}
