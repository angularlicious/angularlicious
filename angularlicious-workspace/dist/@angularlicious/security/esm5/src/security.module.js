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
var AngularliciousSecurityModule = /** @class */ (function () {
    function AngularliciousSecurityModule() {
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
    return AngularliciousSecurityModule;
}());
export { AngularliciousSecurityModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJpdHkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5LyIsInNvdXJjZXMiOlsic3JjL3NlY3VyaXR5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUNMLDJCQUEyQixFQUMzQiw0QkFBNEIsRUFDN0IsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNoRyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUM3RyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7O2dCQUd2RCxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLDJCQUEyQjt3QkFDM0IsOEJBQThCO3dCQUM5Qix3QkFBd0I7d0JBQ3hCLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGdCQUFnQjtxQkFDakI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsMkJBQTJCLENBQUM7b0JBQzNDLE9BQU8sRUFBRSxDQUFDLDJCQUEyQixDQUFDO29CQUN0QyxTQUFTLEVBQUU7d0JBQ1QsNEJBQTRCO3dCQUM1QixrQkFBa0I7d0JBQ2xCLCtCQUErQjtxQkFFaEM7aUJBQ0Y7O3VDQW5DRDs7U0FvQ2EsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nTW9kdWxlLFxyXG4gIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2VcclxufSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzRm91bmRhdGlvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNDb3JlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2NvcmUnO1xyXG5pbXBvcnQgeyBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi9idXNpbmVzcy9zZWN1cml0eS1idXNpbmVzcy1wcm92aWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VjdXJpdHlBcGlTZXJ2aWNlIH0gZnJvbSAnLi9idXNpbmVzcy9zZWN1cml0eS1hcGkuc2VydmljZSc7XHJcbmltcG9ydCB7IFJlZ2lzdGVyU3Vic2NyaWJlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9yZWdpc3Rlci1zdWJzY3JpYmVyL3JlZ2lzdGVyLXN1YnNjcmliZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbi8vIGltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgSHR0cEJhc2VTZXJ2aWNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBBbmd1bGFybGljaW91c0xvZ2dpbmdNb2R1bGUsXHJcbiAgICBBbmd1bGFybGljaW91c0ZvdW5kYXRpb25Nb2R1bGUsXHJcbiAgICBBbmd1bGFybGljaW91c0NvcmVNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtSZWdpc3RlclN1YnNjcmliZXJDb21wb25lbnRdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSxcclxuICAgIFNlY3VyaXR5QXBpU2VydmljZSwgLy9QUk9WSURFIElOVEVSTkFMIFNFUlZJQ0VTIEZPUiBUSEUgTU9EVUxFOyBTQ09QRUQgVE8gVEhJUyBNT0RVTEU7XHJcbiAgICBTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlIC8vUFJPVklERSBJTlRFUk5BTCBTRVJWSUNFUyBGT1IgVEhFIE1PRFVMRTsgU0NPUEVEIFRPIFRISVMgTU9EVUxFO1xyXG4gICAgLy8gSHR0cEJhc2VTZXJ2aWNlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhcmxpY2lvdXNTZWN1cml0eU1vZHVsZSB7fVxyXG4iXX0=