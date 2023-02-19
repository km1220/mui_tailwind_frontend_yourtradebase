import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
	const userData = useSelector(state => state.user)

	return (
		userData.email ? <Outlet /> : <Navigate to='/' replace />
	)
}

export default PrivateRoute;