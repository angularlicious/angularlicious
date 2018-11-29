import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistComponent } from './playlist/playlist.component';

import { SiteModule } from './../site/site.module';
import { SharedModule } from './../shared/shared.module';
import { SetupComponent } from './setup/setup.component';
import { PodcastProvidersComponent } from './podcast-providers/podcast-providers.component';

@NgModule({
  imports: [CommonModule, SharedModule, SiteModule],
  declarations: [PlaylistComponent, SetupComponent, PodcastProvidersComponent],
  exports: [PlaylistComponent, PodcastProvidersComponent, SetupComponent]
})
export class PodcastModule {}
