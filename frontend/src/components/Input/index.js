import { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const options = ["khaled-item", "ahmed_item", "ali_item"];

const InputT = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(1);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClickListItem = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);
	};
	return (
		<>
			<List component='nav'>
				<ListItem button onClick={handleClickListItem}>
					<ListItemText
						primary='When device is locked'
						secondary={options[selectedIndex]}
					/>
				</ListItem>
			</List>

			{/*  */}

			<Button onClick={handleClick}>Open Menu</Button>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem
					key={0}
					selected={0 === selectedIndex}
					onClick={event => handleMenuItemClick(event, 0)}
				>
					khaled_item
				</MenuItem>
				<MenuItem
					key={1}
					selected={1 === selectedIndex}
					onClick={event => handleMenuItemClick(event, 1)}
				>
					ahmed_item
				</MenuItem>
				<MenuItem
					key={2}
					selected={2 === selectedIndex}
					onClick={event => handleMenuItemClick(event, 2)}
				>
					ali_item
				</MenuItem>
			</Menu>
		</>
	);
};

export default InputT;
