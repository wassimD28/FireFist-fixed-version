import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { Link } from '../../../core/models/interfaces/link.interface';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent implements OnInit{
  loggedIn: boolean = false;

  authService = inject(AuthService)
  router = inject(Router);

  links : Link[] = [
    {name: 'Exercises', url: '/secure/exercises', isCurrent: true},
    {name: 'show', url: '/secure/show-exer', isCurrent: false},
  ]
  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn()
  }
  onLinkClick(clickedLink :Link){
    this.links.forEach(link => link.isCurrent = false);
    clickedLink.isCurrent = true;
  }

  logout(){
    this.authService.logout().subscribe(()=>{
      this.loggedIn = false;
      this.router.navigate(['/login']);
    },(error)=>{
      console.error('Error logging out', error);
    });
  }

}
