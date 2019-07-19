import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Product} from './models/product';
import { map, take } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ShoppingCart} from './models/shopping-cart';


@Injectable()
export class ShoppingCartService {

    quantity:number;

  constructor(private database: AngularFireDatabase) { }

    private create() {
        return this.database.list('/shopping-carts').push({
            dateCreated: new Date().getTime()
        });
    }

    async getCart(): Promise<Observable<ShoppingCart>> {
        const cartId = await this.getOrCreateCartId();
        return this.database.object('/shopping-carts/' + cartId).snapshotChanges().pipe(
            map(x => new ShoppingCart(x.payload.exportVal().items)));
    }

    private getItem(cartId: string, productId: string) {
        return this.database.object('/shopping-carts/' + cartId + '/items/' + productId);
    }

    private async getOrCreateCartId(): Promise<string> {
        const cartId = localStorage.getItem('cartId');
        if (cartId) {
            return cartId;
        } else {
            // Add Product to cart
            const result = await this.create();
            localStorage.setItem('cartId', result.key);
            return result.key;
        }
    }

    async addToCart(product: Product) {
        this.updateItem(product, 1);
    }

    async removeFromCart(product: Product) {
        this.updateItem(product, -1);
    }

    async clearCart() {
        let cartId = await this.getOrCreateCartId();
        this.database.object('/shopping-carts/' + cartId + '/items').remove();
    }

    private async updateItem(product: Product, change: number) {
        const cartId = await this.getOrCreateCartId();
        const item$ = this.getItem(cartId, product.$key);

        item$.snapshotChanges().pipe(take(1)).subscribe(item => {

            if (item.payload.exists()) {
                //let quantity = (item.quantity || 0) + change;
                let quantity = item.payload.exportVal().quantity + change;
                if (quantity === 0) item$.remove();
                else item$.update({
                    title: product.title,
                    imageUrl: product.imageUrl,
                    price: product.price,
                    quantity: quantity
                });
            } else {
                console.log("Happy to be here");
                item$.set({title: product.title,
                    imageUrl: product.imageUrl,
                    price: product.price, quantity: 1});
            }
        });
    }

}
