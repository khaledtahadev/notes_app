import makeStyles from "@material-ui/core/styles/makeStyles";

export default makeStyles(theme => ({
	paper: {
		padding: theme.spacing(3),
	},
	root: {
		width: "600px",
		minHeight: "80vh",
		margin: theme.spacing(2, "auto", 0),
		"& > * ": {
			marginTop: theme.spacing(2),
		},
		"& .MuiTextField-root": {
			margin: theme.spacing(2, 0),
		},
	},
	button: {
		margin: theme.spacing(2, 0, 0),
	},
	link: {
		color: theme.palette.primary.main,
		textDecoration: "none",
		marginLeft: theme.spacing(1),
	},
	registerLink: {
		margin: theme.spacing(2, 0, 0),
	},
	progressButton: {
		position: "absolute",
		top: "50%",
		left: "50%",
		marginLeft: "-10px",
		marginTop: "-10px",
	},
}));
