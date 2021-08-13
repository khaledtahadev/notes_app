import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Title from "../../components/Title";
import usePreviewImage from "../../hooks/usePreviewImage";

// Mui
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

// styles
import useStyles from "./styles";

// redux
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../redux/actions/user";

const Profile = () => {
	const classes = useStyles();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [pictureUrl, setPictureUrl] = useState("");
	const { preview, previewUpload } = usePreviewImage(null);
	const [stateUpdate, setStateUpdate] = useState({});
	const dispatch = useDispatch();
	const { token, loadingUser } = useSelector(state => state.user);

	useEffect(() => {
		if (token) {
			const { username, email, pictureUrl: userImageUrl } = jwtDecode(token);
			setUsername(username);
			setEmail(email);
			setPictureUrl(userImageUrl);
		}
	}, [token]);

	const handleSubmit = async e => {
		e.preventDefault();

		if (password !== confirmPassword)
			return setStateUpdate({ error: "invalid confirm password" });

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

				if (data.error) return setStateUpdate({ error: data.error.message });
				userPictureUrl = data.secure_url;
			} catch (error) {
				setStateUpdate({ error: error.message });
			}
		}

		const userInfoToUpdated = {
			username,
			email,
			password,
			pictureUrl: userPictureUrl,
		};

		dispatch(updateUserProfile(userInfoToUpdated, setStateUpdate));
	};

	const handleImage = e => {
		if (
			e.target.files.length !== 0 &&
			e.target.files[0].type.indexOf("image") > -1
		)
			previewUpload(e).then(() => setPictureUrl(e.target.files[0]));
	};

	const alertMessage = stateUpdate.error ? (
		<Alert severity='error' variant='filled' onClose={() => setStateUpdate({})}>
			{stateUpdate.error}
		</Alert>
	) : stateUpdate.success ? (
		<Alert
			severity='success'
			variant='filled'
			onClose={() => setStateUpdate({})}
		>
			{stateUpdate.success}
		</Alert>
	) : (
		""
	);

	return (
		<div className={classes.root}>
			{alertMessage}
			<Title text='Your Profile' />
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
						label='Confirm password'
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
								<input type='file' hidden onChange={handleImage} />
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
								src={preview || pictureUrl}
								alt={username}
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
					save edit
					{loadingUser && (
						<CircularProgress size={20} className={classes.progressButton} />
					)}
				</Button>
			</form>
		</div>
	);
};

export default Profile;
