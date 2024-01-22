import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService){}
  public isUserAuthenticated: boolean = false;

  ngOnInit(): void {
    // this.authService.currentUser$.subscribe({
    //   next:(res) =>{
    //     this.isUserAuthenticated = res != null ? true : false;
    //     console.log(this.isUserAuthenticated);
    //   },error:(err) =>{
    //     console.log(`An error occurred while setting isUserAuthenticated flag.`)
    //   }
    // })
  }
  public logout = () => {
    this.authService.logout();
  }
}
