import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {map} from 'rxjs/operators';
import {Product} from './models/product';

@Injectable()
export class ProductService {

    itemRef : any;

    dataSource: AngularFireList<Product>;
    items: Product[] = [];

    constructor(private database: AngularFireDatabase) { }

    create(product) {
        return this.database.list('/products').push(product);
    }

    getAll() {
        this.itemRef =  this.database. list('/products').snapshotChanges().pipe(map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        }));
        return this.itemRef;
    }

    get(productId) {
        return this.database.object('/products/' + productId);
    }

    update(productId, product) {
        return this.database.object('/products/' + productId).update(product);
    }

    delete(productId) {
        return this.database.object('/products/' + productId).remove();
    }
}
