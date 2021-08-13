import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
// Mui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

// Mui-icons
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";

// styles
import useStyles from "./styles";

// redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/user";

const Navbar = () => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const dispatch = useDispatch();
	const token = useSelector(state => state.user.token);
	const [userInfo, setUserInfo] = useState({});

	useEffect(() => {
		if (token) {
			const userInfo = jwtDecode(token);
			setUserInfo(userInfo);
		}
	}, [token]);

	const handleMobileMenuOpen = e => {
		setAnchorEl(e.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		handleMobileMenuClose();
		dispatch(logout());
	};

	const renderMobileMenu = (
		<Menu
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClose={handleMobileMenuClose}
		>
			{token ? (
				<div>
					<MenuItem onClick={handleMobileMenuClose}>
						<Avatar
							src={userInfo.pictureUrl}
							alt={userInfo.username}
							component={Link}
							to='/profile'
							classes={{ root: classes.avatar }}
						/>
					</MenuItem>
					<MenuItem>
						<Button
							variant='contained'
							color='secondary'
							fullWidth
							size='small'
							onClick={handleLogout}
						>
							logout
						</Button>
					</MenuItem>
				</div>
			) : (
				<div>
					<MenuItem onClick={handleMobileMenuClose}>
						<Button
							variant='contained'
							color='primary'
							fullWidth
							size='small'
							component={Link}
							to='/signup'
						>
							Signup
						</Button>
					</MenuItem>
					<MenuItem onClick={handleMobileMenuClose}>
						<Button
							variant='contained'
							color='primary'
							fullWidth
							size='small'
							component={Link}
							to='/login'
						>
							Login
						</Button>
					</MenuItem>
				</div>
			)}
		</Menu>
	);

	return (
		<AppBar position='sticky'>
			<Toolbar>
				<Typography
					variant='h6'
					className={classes.brandName}
					component={Link}
					to='/'
					noWrap
				>
					Notes app
				</Typography>

				{/* search box */}
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder='Search'
						classes={{ root: classes.inputRoot, input: classes.inputInput }}
					/>
				</div>

				{/* section desktop */}
				<div className={classes.sectionDesktop}>
					{token ? (
						<>
							<Avatar
								src={userInfo.pictureUrl}
								alt={userInfo.username}
								component={Link}
								to='/profile'
								classes={{ root: classes.avatar }}
							/>
							<Button
								variant='contained'
								color='secondary'
								fullWidth
								size='small'
								onClick={handleLogout}
							>
								logout
							</Button>
						</>
					) : (
						<>
							<Button
								variant='contained'
								color='primary'
								fullWidth
								size='small'
								classes={{ root: classes.buttonAuth }}
								component={Link}
								to='/login'
							>
								Login
							</Button>
							<Button
								variant='contained'
								color='primary'
								fullWidth
								size='small'
								classes={{ root: classes.buttonAuth }}
								component={Link}
								to='/signup'
							>
								Signup
							</Button>
						</>
					)}
				</div>

				{/* section mobile */}
				<div className={classes.sectionMobile}>
					<IconButton color='inherit' onClick={handleMobileMenuOpen}>
						<MoreIcon />
					</IconButton>
				</div>
			</Toolbar>

			{renderMobileMenu}
		</AppBar>
	);
};

export default Navbar;
