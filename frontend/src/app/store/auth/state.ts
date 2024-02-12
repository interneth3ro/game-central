import { User } from '../../models/user/user.model';

export interface AuthState {
  isLoggedIn: boolean;
  currentUser: User | null;
}
