import makeStyles from "@material-ui/core/styles/makeStyles";

export default makeStyles(theme => ({
	dialog: {
		padding: theme.spacing(2),
	},
	progressButton: {
		position: "absolute",
		top: "50%",
		left: "50%",
		marginLeft: "-10px",
		marginTop: "-10px",
	},
}));
