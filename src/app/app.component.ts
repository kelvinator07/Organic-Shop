import { Component } from '@angular/core';
//import {UserService} from './user.service';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {UserService} from './user.service';
//import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private authService: AuthService, private router: Router, private  userService: UserService) {
        authService.user$.subscribe( user => {
            if (!user) return;

            userService.save(user);

            const returnUrl = localStorage.getItem('returnUrl');
            if (!returnUrl) return;

            localStorage.removeItem('returnUrl');
            router.navigateByUrl(returnUrl);
        });
    }
}
