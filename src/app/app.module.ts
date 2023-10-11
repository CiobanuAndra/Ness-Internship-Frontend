import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/shared/material-module/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { InitialsCustomepipePipe } from './pipes/initials-customepipe.pipe';
import { ResourcesModule } from './resources/resources.module';
import { UsersModule } from './users/users/users.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent, InitialsCustomepipePipe],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatIconModule,
    MatTabsModule,
    DashboardModule,
    MatTableModule,
    DashboardModule,
    ResourcesModule,
    UsersModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
