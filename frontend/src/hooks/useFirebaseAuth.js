import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { setCurrentUser, clearCurrentUser } from '../redux/user/userSlice';
import { auth } from '../firebase-config';

export default function useFirebaseAuth() {
  const dispatch = useDispatch();

  const login = async ({ email, password }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setCurrentUser(user));
    } catch (err) {
      console.log(err);
    }
  };

  const register = async ({ email, password }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(setCurrentUser(user));
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch(clearCurrentUser());
    } catch (err) {
      console.log(err);
    }
  };

  return { login, register, logout };
}
