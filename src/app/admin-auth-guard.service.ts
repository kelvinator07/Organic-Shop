import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {UserService} from './user.service';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

    canActivate(): Observable<boolean> {
        return this.authService.appUser$.pipe(map(appUser => appUser.isAdmin));
    }
}
