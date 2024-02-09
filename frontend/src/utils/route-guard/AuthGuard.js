import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const user = useSelector(({ userSlice }) => userSlice.user);

  if (!user.email) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
};

export default AuthGuard;
