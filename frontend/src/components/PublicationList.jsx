import React from 'react';
import { withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import { Box, Card, Grid, Slide, Typography, Avatar, ListItemAvatar, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	sticky: {
		position: 'fixed',
		left: 0,
		justify: 'center',
		direction: 'column',
		backgroundColor: theme.color,
		display: 'flex'
	},
	margin: {
		margin: theme.spacing(1),
	},
}));



function PublicationList({ publications }) {
	const classes = useStyles();
	console.log(publications);
	const listItems = publications.map((publication) =>
		<Box m={2}><Card>
			<ListItem >
				<ListItemText
					primary={publication.title}
					secondary={
						<React.Fragment>
							{publication.date}
							<br />
							<Typography
								component="span"
								variant="body2"
								className={classes.inline}
								color="textPrimary"
							>
								{publication.description}
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>
		</Card>
		</Box>
	);
	return (
		<List>
			{listItems}
		</List>
	);
}

export default withRouter(PublicationList);