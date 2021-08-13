import makeStyles from "@material-ui/core/styles/makeStyles";
import { alpha } from "@material-ui/core/styles";

export default makeStyles(theme => ({
	brandName: {
		marginLeft: theme.spacing(2),
		color: theme.palette.primary.contrastText,
		textDecoration: "none",
	},
	link: {
		color: theme.palette.common.black,
		textDecoration: "none",
	},
	search: {
		position: "relative",
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		borderRadius: theme.shape.borderRadius,
		margin: "0 auto",
	},
	searchIcon: {
		position: "absolute",
		height: "100%",
		padding: theme.spacing(0, 2),
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,

		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
			alignItems: "center",
		},
	},
	sectionMobile: {
		display: "block",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	avatar: {
		margin: "auto",
		[theme.breakpoints.up("md")]: {
			marginRight: theme.spacing(2),
		},
	},
	buttonAuth: {
		margin: theme.spacing(0, 1),
	},
}));
