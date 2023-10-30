import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/shared/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { ResourcesModule } from './resources/resources.module';
import { UsersModule } from './users/users.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptors/interceptor-service.interceptor';
import { LogInModule } from './log-in/log-in.module';


@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatIconModule,
    MatTabsModule,
    DashboardModule,
    ResourcesModule,
    UsersModule,
    LogInModule,
  ],
  exports: [RouterModule],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: InterceptorService,
    multi: true
  }], 
  bootstrap: [AppComponent],
})
export class AppModule {}
