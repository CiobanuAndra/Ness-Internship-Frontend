import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResourcesService } from '../services/resources/resources.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar-layout.component.html',
  styleUrls: ['./navbar-layout.component.scss']

})
export class NavbarLayoutComponent {
  constructor(private router: Router, private resourcesService: ResourcesService){}
  openPageModal(path:string){
    this.router.navigate([`${path}`]);
  }
  show=true;
  title = 'admin-fe';
  currentUser= "Ciobanu andra";
  showSidenav(): boolean {
    return this.resourcesService.getShowSidenav();
  }
}
