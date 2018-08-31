import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';

import { AboutComponent } from '../site/about/about.component';
import { AngularRulesEngineComponent } from '../angular-rules-engine/index/index.component';
import { AppComponent } from '../../app.component';
import { AngularliciousEventsComponent } from '../events/angularlicious-events/angularlicious-events.component';
import { PostComponent } from '../blog/post/post.component';
import { GuideComponent } from '../custom-angular-modules/guide/guide.component';
import { LicenseComponent } from '../site/license/license.component';
import { PlaylistComponent } from '../podcast/playlist/playlist.component';
import { SetupComponent } from '../podcast/setup/setup.component';
import { SignUpComponent } from '../subscriber/sign-up/sign-up.component';
import { SubscriberListComponent } from '../subscriber/subscriber-list/subscriber-list.component';
import { UnsubscribeComponent } from '../subscriber/unsubscribe/unsubscribe.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: []
  },
  {
    path: 'about',
    component: AboutComponent,
    pathMatch: 'full'
  },
  {
    path: 'blog',
    component: PostComponent,
    pathMatch: 'full'
  },
  {
    path: 'angularlicious-events',
    component: AngularliciousEventsComponent,
    pathMatch: 'full'
  },
  {
    path: 'podcast',
    component: PlaylistComponent
  },
  {
    path: 'podcast-setup',
    component: SetupComponent
  },
  {
    path: 'custom-angular-modules',
    component: GuideComponent
  },
  {
    path: 'angular-rules-engine',
    component: AngularRulesEngineComponent
  },
  {
    path: 'subscribe',
    component: SignUpComponent
  },
  {
    path: 'subscriber-list',
    component: AboutComponent
  },
  {
    path: 'unsubscribe',
    component: UnsubscribeComponent
  },
  {
    path: 'license',
    component: LicenseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [],
  declarations: []
})
export class AppRoutingModule {}
