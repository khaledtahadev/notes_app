import { useState, useEffect } from "react";
import Title from "../../components/Title";
import CreateNote from "../CreateNote";
import jwtDecode from "jwt-decode";

// Mui
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

// Mui-icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

// styles
import useStyles from "./styles";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
	clearNoteError,
	deleteNote,
	getUserNotes,
} from "../../redux/actions/notes";

const Home = () => {
	const classes = useStyles();
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [editNote, setEditNot] = useState(null);
	const dispatch = useDispatch();
	const { notes, notes_error, loadingNote } = useSelector(
		state => state.notes_app
	);
	const token = useSelector(state => state.user.token);
	const [userInfo, setUserInfo] = useState({});

	useEffect(() => {
		if (token) {
			const user_info = jwtDecode(token);
			setUserInfo(user_info);
			dispatch(getUserNotes());
		}
	}, [dispatch, token]);

	const handleOpenDialog = () => {
		setIsOpen(true);
	};

	const handlerEdit = note => {
		setIsOpenEdit(true);
		setEditNot(note);
	};

	const handleDeleteNote = noteId => {
		dispatch(deleteNote(noteId));
	};

	const handleClearError = () => dispatch(clearNoteError());

	const ActionButton = note => (
		<ButtonGroup
			variant='contained'
			size='small'
			color='primary'
			style={{ marginLeft: "auto" }}
		>
			<Button
				color='secondary'
				startIcon={<DeleteIcon />}
				disabled={loadingNote}
				onClick={() => handleDeleteNote(note._id)}
			>
				Delete
				{loadingNote && (
					<CircularProgress size={20} className={classes.progressButton} />
				)}
			</Button>
			<Button
				color='primary'
				startIcon={<EditIcon />}
				onClick={() => handlerEdit(note)}
				disabled={loadingNote}
			>
				Edit
			</Button>
		</ButtonGroup>
	);

	return (
		<div className={classes.home}>
			{notes_error && (
				<Alert severity='error' variant='filled' onClose={handleClearError}>
					{notes_error}
				</Alert>
			)}
			<Title text={`Welcome back ${userInfo.username}`} />
			<Button
				color='primary'
				variant='contained'
				classes={{ root: classes.createBtn }}
				onClick={handleOpenDialog}
				disabled={loadingNote}
			>
				Create Note
			</Button>
			{notes?.map((note, index) => (
				<Accordion key={index}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						classes={{
							content: classes.centerSummary,
						}}
					>
						<Typography variant='h4'>{note.title}</Typography>
					</AccordionSummary>
					<AccordionDetails classes={{ root: classes.details }}>
						<Chip
							label={note.category}
							color='primary'
							classes={{ root: classes.chip }}
						/>
						<Typography>{note.content}</Typography>
						{ActionButton(note)}
					</AccordionDetails>
				</Accordion>
			))}
			{/* dialog  new note*/}
			<CreateNote isOpen={isOpen} setIsOpen={setIsOpen} />

			{/* dialog  edit note*/}
			<CreateNote
				isOpen={isOpenEdit}
				setIsOpen={setIsOpenEdit}
				editNote={editNote}
			/>
		</div>
	);
};

export default Home;
