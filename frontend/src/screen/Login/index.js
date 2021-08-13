import { useEffect, useState } from "react";
import Title from "../../components/Title";
import { Link } from "react-router-dom";
// Mui
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

// styles
import useStyles from "./styles";

// redux
import { login, clearUserError, setUserError } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

const Login = ({ history }) => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const { loadingUser, loginError } = useSelector(state => state.user);

	useEffect(() => {
		if (loginError) dispatch(clearUserError());
	}, [dispatch]);

	const handleSubmit = e => {
		e.preventDefault();
		if (!email || !password) return dispatch(setUserError("pleas fill fields"));
		dispatch(login({ email, password }, history));
	};

	return (
		<div className={classes.root}>
			{loginError && (
				<Alert severity='error' variant='filled'>
					{loginError}
				</Alert>
			)}
			<Title text='Login' />
			<form onSubmit={handleSubmit}>
				<Paper classes={{ root: classes.paper }}>
					<TextField
						label='Email Address'
						fullWidth
						name='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<TextField
						type={showPassword ? "text" : "password"}
						label='password'
						fullWidth
						name='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton onClick={() => setShowPassword(prev => !prev)}>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						size='small'
						classes={{ root: classes.button }}
						disabled={loadingUser}
					>
						Login
						{loadingUser && (
							<CircularProgress size={20} className={classes.progressButton} />
						)}
					</Button>
				</Paper>
				<Typography classes={{ root: classes.registerLink }}>
					Register here?
					<Link to='/signup' className={classes.link}>
						Sign up
					</Link>
				</Typography>
			</form>
		</div>
	);
};

export default Login;
