// import { provideHttpClient } from '@angular/common/http';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';
// import { AppComponent } from './app/app.component';
// import { bootstrapApplication } from '@angular/platform-browser';
// // import { appConfig } from './app/app.config';

// // bootstrapApplication(AppComponent, appConfig)
// //   .catch((err) => console.error(err));

// export const appConfig = {
//   providers: [
//     provideHttpClient(),  // Provide HttpClientModule here
//     provideRouter(routes), // Provide router if using routing
//     // Additional services or configurations can go here
//   ],
// };
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
  ]
});

