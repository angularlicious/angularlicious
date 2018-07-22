import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';

/** APPLICATION MODULES:
 * Use this section to import application specific modules that are [NOT] 3rd-party and/or Angular specific.
 * Importing this module is required to allow access to the public accessible
 * members of the imported module (i.e., PageLayoutModule contains a CardComponent).
 */
// import { AngularliciousSecurityModule, AngularliciousSecurityService } from '@angularlicious/security';
import { SiteModule } from '../site/site.module';
import { MarkdownEditorModule } from '@angularlicious/markdown-editor';
import { MarkdownEditorOptions } from '@angularlicious/markdown-editor';
import { BlogModule } from '../blog/blog.module';

/** SERVICES:
 * Import the [service] and add to the [providers] list. This will make the specified
 * service globally available to the application as a singleton/single instance.
 */
// BASE APPLICATION SERVICES;
import { HttpBaseService } from '@angularlicious/foundation';
import {
  AngularliciousLoggingModule,
  AngularliciousLoggingService
} from '@angularlicious/logging';

// SERVICES (SHARED):

const editorConfig = {
  initialValue: 'Hello Editor...write something amazing.',
  autoDownloadFontAwesome: true
};

/**
 * Use the @NgModule attribute to configure the module members:
 *
 * - declarations: a list of declarable items belonging to the module (components, directives, or pipes).
 * - imports: import routes or modules;
 * - exports: list of components, directives, or pipes to make public to application;
 * - providers: initializes a single instance of the specified service providers;
 * - bootstrap (use for root module only): N/A
 */
@NgModule({
  imports: [
    BlogModule,
    AngularliciousLoggingModule,
    // AngularliciousSecurityModule, // Angularlicious: A WEB SECURITY MODULE FOR SUBSCRIPTION, ACCOUNT, LOGIN, AND PASSWORD MANAGEMENT
    CommonModule,
    MarkdownEditorModule.forRoot(editorConfig),
    SiteModule
  ],
  declarations: [],
  exports: [SiteModule],
  providers: [
    // AngularliciousSecurityService, // Angularlicious: SECURITY SERVICE FOR SUBSCRIBERS, ACCOUNT, LOGIN, AND PASSWORD MANAGEMENT;
    HttpBaseService, // Angularlicious; REQUIRED BASE FOR HTTP API COMMUNICATION TO WEB API END POINTS;
    AngularliciousLoggingService
  ]
})
export class CoreModule {
  /**
   * Use the check to determine if the [CoreModule] has been loaded in the parentModule (AppModule root).
   */
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        `CoreModule is already loaded. Import it in the AppModule only.`
      );
    }
  }
}
