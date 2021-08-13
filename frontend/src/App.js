import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
//Mui
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
//component
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
//screen
import Home from "./screen/Home";
import Profile from "./screen/Profile";
import Signup from "./screen/Signup";
import Login from "./screen/Login";

// redux
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
	return (
		<Provider store={store}>
			<CssBaseline />
			<Router>
				<Navbar />
				<Container maxWidth='md'>
					<Switch>
						<PrivateRoute exact path='/' component={Home} />
						<PrivateRoute path='/profile' component={Profile} />
						<Route path='/signup' component={Signup} />
						<Route path='/login' component={Login} />
						<Route render={() => <Redirect to='/' />} />
					</Switch>
				</Container>
				<Footer />
			</Router>
		</Provider>
	);
}

export default App;

/* 
	if (Date.now() >= exp * 1000) {
		return false;
	}
*/
