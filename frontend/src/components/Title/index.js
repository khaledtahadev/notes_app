// Mui
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

// styles
import useStyles from "./style";

const Title = ({ text }) => {
	const classes = useStyles();

	return (
		<>
			<Typography className={classes.title} variant='h4' color='textSecondary'>
				{text}
			</Typography>
			<Divider />
		</>
	);
};

export default Title;
