import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";

const Footer = () => {
	const classes = useStyles();

	return (
		<div className={classes.footer}>
			<Typography variant='body' color='textSecondary'>
				All &copy; copyright are reserved notes app
			</Typography>
		</div>
	);
};

export default Footer;
