import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Product} from '../../models/product';
import {ProductService} from '../../product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
    products: Product[];
    products$;
    filteredProducts: any[];
    subscription: Subscription;
    items: Product[] = [];
    itemCount: number;
    id;

    constructor(private productService: ProductService, private route: ActivatedRoute) {

        this.id = this.route.snapshot.paramMap.get('id');

        this.subscription = this.productService.getAll().subscribe(
            products => {this.filteredProducts = this.products = products},
            (error) => console.log(error));
    }

    ngOnInit() {
        this.productService.getAll().subscribe(
            product => {this.products$ = product},

            (error) => console.log(error)
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    filter(query: string) {
        console.log(query);
        this.filteredProducts = (query) ?
            this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;

    }

}
