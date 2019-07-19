import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {map} from 'rxjs/operators';

@Injectable()
export class CategoryService {

    itemRef : any;

    constructor(private database: AngularFireDatabase) { }

    getCategories() {
        //return this.database.list('/categories', ref => ref.orderByChild("name"));
        //return this.database.list('/categories', ref => ref.limitToLast(5));
        //return this.database.list('/categories', ref => ref.limitToLast(5));
        return this.database.list('/categories');

    }

    getAll() {
        this.itemRef =  this.database.list('/categories').snapshotChanges().pipe(map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        }));
        return this.itemRef;

    }
}
