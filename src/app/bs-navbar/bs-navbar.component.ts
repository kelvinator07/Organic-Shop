import {Component} from '@angular/core';
import {AuthService} from '../auth.service';
import {AppUser} from '../models/app-user';
import {ShoppingCartService} from '../shopping-cart.service';
import {ShoppingCart} from '../models/shopping-cart';
import {Observable} from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

    appUser: AppUser;
    cart$: Observable<ShoppingCart>;

  constructor(private authService: AuthService, private shoppingCartService: ShoppingCartService) {
      //authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  async ngOnInit() {
      this.authService.appUser$.subscribe(appUser => this.appUser = appUser);

      this.cart$ = await this.shoppingCartService.getCart();
      // this.cart$.subscribe( cart => {
      //     let count = cart.totalItemsCount();
      // });
  }

    logout() {
        console.log('Logged Out');
        this.authService.logout();
    }
}
