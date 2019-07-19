import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import { of } from 'rxjs';
import {AppUser} from './models/app-user';
import {UserService} from './user.service';
import {ActivatedRoute} from '@angular/router';

@Injectable()
export class AuthService {
    user$: Observable<firebase.User>;

    constructor(private  afAuth: AngularFireAuth, private userService: UserService, private route: ActivatedRoute) {
        this.user$ = afAuth.authState;
    }

    login() {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        localStorage.setItem('returnUrl', returnUrl);
        //this.userService.save(this.user$);

        this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
        //.then(() => this.router.navigateByUrl(localStorage.getItem('returnUrl')) );
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    get appUser$(): Observable<AppUser> {
        return this.user$
            .pipe(switchMap(user => {
                if (user) return this.userService.get(user.uid);

                return of(null);
            }));
    }

}
