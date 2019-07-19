import {Component, OnDestroy, OnInit} from '@angular/core';//
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/product';
import { switchMap } from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {ProductService} from '../product.service';
import {ShoppingCartService} from '../shopping-cart.service';
import {ShoppingCart} from '../models/shopping-cart';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    categories$;
    cart$: Observable<ShoppingCart>;
    cart: any;
    products: Product[] = [];
    filteredProducts: Product[] = [];
    category: string;
    subscription: Subscription;

    constructor(private route: ActivatedRoute, private productService: ProductService, private shoppingCartService: ShoppingCartService) {
    }

    async ngOnInit() {
        this.cart$ = await this.shoppingCartService.getCart();
        this.populateProducts();
    }

    private populateProducts() {
        this.productService
            .getAll()
            .pipe(switchMap(products => {
                this.products = products;
                return this.route.queryParamMap;
            }))
            .subscribe(params => {
                this.category = params.get('category');
                this.applyFilter();
            });
    }

    private applyFilter() {
        this.filteredProducts = (this.category) ?
            this.products.filter(p => p.category === this.category) :
            this.products;
    }

}
