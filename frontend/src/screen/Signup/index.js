import { useEffect, useState } from "react";
import Title from "../../components/Title";
import { Link } from "react-router-dom";
import usePreviewImage from "../../hooks/usePreviewImage";
// Mui
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

// styles
import useStyles from "./styles";

// redux
import { signup, setUserError, clearUserError } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

const Signup = ({ history }) => {
	const classes = useStyles();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [pictureUrl, setPictureUrl] = useState("");
	const { preview, previewUpload } = usePreviewImage();
	const dispatch = useDispatch();
	const { loadingUser, loginError } = useSelector(state => state.user);

	useEffect(() => {
		if (loginError) dispatch(clearUserError());
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();

		if (password !== confirmPassword)
			return dispatch(setUserError("invalid confirm password"));

		let userPictureUrl = pictureUrl;
		if (pictureUrl?.type?.indexOf("image") > -1) {
			const formData = new FormData();
			formData.append("file", pictureUrl);
			formData.append("upload_preset", "notes_app_preset");

			try {
				const res = await fetch(
					"https://api.cloudinary.com/v1_1/kh-cloudinary/image/upload",
					{
						method: "POST",
						body: formData,
					}
				);
				const data = await res.json();

				if (data.error) return console.log({ error: data.error.message });
				userPictureUrl = data.secure_url;
			} catch (error) {
				console.log({ error: error.message });
			}
		}

		const userCredentials = {
			username,
			email,
			password,
		};

		if (userPictureUrl !== "") userCredentials.pictureUrl = userPictureUrl;

		dispatch(signup(userCredentials, history));
	};

	const handleImage = e => {
		if (e.target.files.length !== 0)
			previewUpload(e).then(() => setPictureUrl(e.target.files[0]));
	};

	const handleClearError = () => dispatch(clearUserError());

	return (
		<div className={classes.root}>
			{loginError && (
				<Alert severity='error' variant='filled' onClose={handleClearError}>
					{loginError}
				</Alert>
			)}
			<Title text='Sign up' />
			<form onSubmit={handleSubmit}>
				<Paper classes={{ root: classes.paper }}>
					<TextField
						label='Name'
						fullWidth
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
					<TextField
						label='Email Address'
						fullWidth
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<TextField
						label='Password'
						type={showPassword ? "text" : "password"}
						fullWidth
						value={password}
						onChange={e => setPassword(e.target.value)}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton onClick={() => setShowPassword(prev => !prev)}>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<TextField
						label='Confirm Password'
						type='password'
						fullWidth
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
					/>
					<Grid container alignItems='center' spacing={2}>
						<Grid item xs={4}>
							<Button
								component='label'
								variant='outlined'
								color='primary'
								classes={{ root: classes.button }}
								disabled={loadingUser}
							>
								Upload image
								<input
									type='file'
									accept='image/*'
									hidden
									onChange={handleImage}
								/>
								{loadingUser && (
									<CircularProgress
										size={20}
										className={classes.progressButton}
									/>
								)}
							</Button>
						</Grid>

						<Grid item>
							<Avatar
								className={classes.largeAvatar}
								alt={username}
								src={preview}
							/>
						</Grid>
					</Grid>
				</Paper>
				<Button
					type='submit'
					variant='contained'
					color='primary'
					classes={{ root: classes.button }}
					disabled={loadingUser}
				>
					Sign up
					{loadingUser && (
						<CircularProgress size={20} className={classes.progressButton} />
					)}
				</Button>
				<Typography>
					Already have an account?
					<Link to='/login' className={classes.link}>
						Login
					</Link>
				</Typography>
			</form>
		</div>
	);
};

export default Signup;
