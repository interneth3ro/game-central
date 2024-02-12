import { Injectable } from '@angular/core';
import { Firestore, setDoc, collection } from '@angular/fire/firestore';

import {
  User,
  CreateUserResult,
  GetUserResult,
} from '../../models/user/user.model';
import { doc, getDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public firestore: Firestore) {}

  async createUser(user: User): Promise<CreateUserResult> {
    try {
      setDoc(doc(this.firestore, 'users', user.userId), user);
      return { created: true, error: null };
    } catch (error: unknown) {
      return { created: false, error };
    }
  }

  async getUserById(userId: string): Promise<GetUserResult> {
    try {
      const docRef = doc(this.firestore, 'users', userId);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        return {
          user: snapshot.data() as User,
          error: null,
        };
      } else {
        return {
          user: null,
          error: 'No user found',
        };
      }
    } catch (error) {
      return {
        user: null,
        error: error,
      };
    }
  }
}
