import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResourcesService } from '../services/resources/resources.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
  
})
export class NavbarComponent {
  show=true;
  title = 'admin-fe';
  currentUser= "Ciobanu andra";

  constructor(private router: Router, private resourcesService: ResourcesService){}
  
  showSidenav(): boolean {
    return this.resourcesService.getShowSidenav();
  }
}
