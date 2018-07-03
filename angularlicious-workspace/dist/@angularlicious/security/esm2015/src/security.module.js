/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularliciousLoggingModule, AngularliciousLoggingService } from '@angularlicious/logging';
import { AngularliciousFoundationModule } from '@angularlicious/foundation';
import { AngularliciousCoreModule } from '@angularlicious/core';
import { SecurityBusinessProviderService } from './business/security-business-provider.service';
import { SecurityApiService } from './business/security-api.service';
import { RegisterSubscriberComponent } from './components/register-subscriber/register-subscriber.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
export class AngularliciousSecurityModule {
}
AngularliciousSecurityModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    AngularliciousLoggingModule,
                    AngularliciousFoundationModule,
                    AngularliciousCoreModule,
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    HttpClientModule
                ],
                declarations: [RegisterSubscriberComponent],
                exports: [RegisterSubscriberComponent],
                providers: [
                    AngularliciousLoggingService,
                    SecurityApiService,
                    SecurityBusinessProviderService
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJpdHkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5LyIsInNvdXJjZXMiOlsic3JjL3NlY3VyaXR5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUNMLDJCQUEyQixFQUMzQiw0QkFBNEIsRUFDN0IsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNoRyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUM3RyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFzQnhELE1BQU07OztZQW5CTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLDJCQUEyQjtvQkFDM0IsOEJBQThCO29CQUM5Qix3QkFBd0I7b0JBQ3hCLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLGdCQUFnQjtpQkFDakI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsMkJBQTJCLENBQUM7Z0JBQzNDLE9BQU8sRUFBRSxDQUFDLDJCQUEyQixDQUFDO2dCQUN0QyxTQUFTLEVBQUU7b0JBQ1QsNEJBQTRCO29CQUM1QixrQkFBa0I7b0JBQ2xCLCtCQUErQjtpQkFFaEM7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge1xyXG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ01vZHVsZSxcclxuICBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlXHJcbn0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0ZvdW5kYXRpb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzQ29yZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9jb3JlJztcclxuaW1wb3J0IHsgU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZSB9IGZyb20gJy4vYnVzaW5lc3Mvc2VjdXJpdHktYnVzaW5lc3MtcHJvdmlkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFNlY3VyaXR5QXBpU2VydmljZSB9IGZyb20gJy4vYnVzaW5lc3Mvc2VjdXJpdHktYXBpLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcmVnaXN0ZXItc3Vic2NyaWJlci9yZWdpc3Rlci1zdWJzY3JpYmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG4vLyBpbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEh0dHBCYXNlU2VydmljZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nTW9kdWxlLFxyXG4gICAgQW5ndWxhcmxpY2lvdXNGb3VuZGF0aW9uTW9kdWxlLFxyXG4gICAgQW5ndWxhcmxpY2lvdXNDb3JlTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgSHR0cENsaWVudE1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbUmVnaXN0ZXJTdWJzY3JpYmVyQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbUmVnaXN0ZXJTdWJzY3JpYmVyQ29tcG9uZW50XSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsXHJcbiAgICBTZWN1cml0eUFwaVNlcnZpY2UsIC8vUFJPVklERSBJTlRFUk5BTCBTRVJWSUNFUyBGT1IgVEhFIE1PRFVMRTsgU0NPUEVEIFRPIFRISVMgTU9EVUxFO1xyXG4gICAgU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZSAvL1BST1ZJREUgSU5URVJOQUwgU0VSVklDRVMgRk9SIFRIRSBNT0RVTEU7IFNDT1BFRCBUTyBUSElTIE1PRFVMRTtcclxuICAgIC8vIEh0dHBCYXNlU2VydmljZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzU2VjdXJpdHlNb2R1bGUge31cclxuIl19