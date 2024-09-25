import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/sevices/auth.service';
import { Itoken } from '../../core/interfaces/itoken';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private _Router=inject(Router)
  private _authservice=inject(AuthService)
logout(){
  localStorage.removeItem('usertoken');
this._authservice.userdata={}as Itoken;
this._Router.navigate(['/login'])
}
}
