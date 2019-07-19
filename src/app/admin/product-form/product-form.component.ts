import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../category.service';
import {ProductService} from '../../product.service';
import { take } from 'rxjs/operators';
//import {FirebaseListObservable} from '@angular/fire/database-deprecated';
import {AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

    categories$;
    product = {};
    id;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private categoryService: CategoryService,
        private productService: ProductService) {

        this.categories$ = categoryService.getAll();
        //console.log(" NAME >>> " + categoryService.getAll());

        this.id = this.route.snapshot.paramMap.get('id');
        console.log("PRODUCT ID", this.id);

        if (this.id) this.productService.get(this.id).valueChanges().pipe(take(1)).subscribe(p => this.product = p);

        // if (this.id) {
        //     const example = this.productService.get(this.id).pipe(take(1));
        //     const subscribe = example.subscribe(prod => this.product = prod);
        // }

    }

    save(product) {
        if (this.id) this.productService.update(this.id, product);
        else this.productService.create(product);

        this.router.navigate(['/admin/products']);
    }

    delete() {
        if (!confirm('Are you sure you want to delete this product?')) return;

        this.productService.delete(this.id);
        this.router.navigate(['/admin/products']);
    }

    ngOnInit() {
        // this.categoryService.getAll().subscribe(
        //     (data) => {
        //         console.log(" Data>>> " +data);
        //     },
        //     (error) => console.log(" Error " + error)
        // );
    }

}
