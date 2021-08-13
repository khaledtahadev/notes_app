import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const token = useSelector(state => state.user.token);
	
	return (
		<Route
			{...rest}
			render={props => {
				return token ? <Component {...props} /> : <Redirect to='/login' />;
			}}
		/>
	);
};

export default PrivateRoute;
