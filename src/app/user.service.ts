import { Injectable } from '@angular/core';
import {AngularFireDatabase } from '@angular/fire/database';
import { FirebaseObjectObservable } from '@angular/fire/database-deprecated';
import * as firebase from 'firebase/app';
import {AppUser} from './models/app-user';
import {promise} from 'selenium-webdriver';
import Promise = promise.Promise;

@Injectable()
export class UserService {

  constructor(private database: AngularFireDatabase) { }

  save(user: firebase.User) {
      this.database.object('/users/' + user.uid).update({
          name: user.displayName,
          email: user.email
      });
  }

  get(uid: string) {
      return this.database.object('/users/' + uid).valueChanges();

  }

}
