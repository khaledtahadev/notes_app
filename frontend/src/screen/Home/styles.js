import makeStyles from "@material-ui/core/styles/makeStyles";

export default makeStyles(theme => ({
	home: {
		padding: theme.spacing(2, 0),
		minHeight: "95vh",
	},
	createBtn: {
		margin: theme.spacing(2, 0),
	},
	centerSummary: {
		alignItems: "center",
	},
	details: {
		flexDirection: "column",
	},
	chip: {
		marginBottom: theme.spacing(2),
		marginRight: "auto",
	},
	progressButton: {
		position: "absolute",
		top: "50%",
		left: "50%",
		marginLeft: "-10px",
		marginTop: "-10px",
	},
}));
