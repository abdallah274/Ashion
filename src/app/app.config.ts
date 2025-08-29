import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';


import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { headersInterceptor } from './components/core/interceptors/headers-interceptor';
import { errorsInterceptor } from './components/core/interceptors/errors-interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingscreenInterceptor } from './components/core/interceptors/loadingscreen-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule),
    provideHttpClient(withInterceptors([headersInterceptor , errorsInterceptor , loadingscreenInterceptor])), 
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes ,      withInMemoryScrolling({
        scrollPositionRestoration: 'top', 
        anchorScrolling: 'enabled'        
      }),
       withHashLocation())
  ]
};
function provideNgxSpinner(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

