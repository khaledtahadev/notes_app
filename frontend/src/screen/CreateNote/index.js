import { useEffect, useState } from "react";
//Mui
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
//Styles
import useStyles from "./styles";
//redux
import { useDispatch, useSelector } from "react-redux";
import { createNote, updateNote } from "../../redux/actions/notes";

const CreateNote = ({ isOpen, setIsOpen, editNote }) => {
	const classes = useStyles();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");
	const dispatch = useDispatch();
	const { loadingNote } = useSelector(state => state.notes_app);

	useEffect(() => {
		if (editNote) {
			setTitle(editNote.title);
			setContent(editNote.content);
			setCategory(editNote.category);
		}
	}, [editNote, isOpen]);

	const handleCloseDialog = () => {
		setIsOpen(false);
		clearForm();
	};

	const handleSubmit = e => {
		e.preventDefault();
		const data = {
			title,
			content,
			category,
		};

		if (editNote) {
			dispatch(updateNote(editNote._id, data, handleCloseDialog));
		} else {
			dispatch(createNote(data, handleCloseDialog));
		}
	};

	const clearForm = () => {
		setTitle("");
		setContent("");
		setCategory("");
	};

	return (
		<Dialog
			onClose={handleCloseDialog}
			open={isOpen}
			classes={{ root: classes.dialog }}
		>
			<DialogTitle>{editNote ? "Edit Note" : "Create Note"}</DialogTitle>
			<form onSubmit={handleSubmit}>
				<DialogContent>
					<TextField
						label='Title'
						fullWidth
						variant='outlined'
						margin='normal'
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<TextField
						label='Content'
						fullWidth
						multiline
						rows='3'
						maxRows='10'
						variant='filled'
						margin='normal'
						value={content}
						onChange={e => setContent(e.target.value)}
					/>
					<TextField
						label='Category'
						fullWidth
						variant='outlined'
						margin='normal'
						value={category}
						onChange={e => setCategory(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						variant='outlined'
						color='primary'
						onClick={clearForm}
						disabled={loadingNote}
					>
						Rest
					</Button>
					<Button
						variant='outlined'
						color='primary'
						type='submit'
						disabled={loadingNote}
					>
						{editNote ? "Edit Note" : "Create Note"}
						{loadingNote && (
							<CircularProgress size={20} className={classes.progressButton} />
						)}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default CreateNote;
