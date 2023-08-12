import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/index';
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/auth/?mode=signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
