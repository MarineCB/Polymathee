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
import { Paper, Card, Grid, Slide, Typography, Avatar, ListItemAvatar, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import PublicationList from './../../components/PublicationList'


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
		top: '15%',
		direction: 'column',
		backgroundColor: theme.color,
		display: 'block'
	},
	margin: {
		margin: theme.spacing(1),
	},
}));

function Homepage() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	const publications = [
		{
			title: 'Article sur le machine learning',
			description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
			date: '25/04/2020'
		},
		{
			title: 'Un livre',
			description: '',
			date: '25/04/2020'
		},
		{
			title: 'Les temps du passé en anglais',
			description: '',
			date: '25/04/2020'
		},
		{
			title: 'Un ancien examen',
			description: 'Voici un examen d\'histoire sur la rome antique. Nous allons le corrigé ici. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			date: '25/04/2020'
		},
		{
			title: 'Article sur le machine learning',
			description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
			date: '25/04/2020'
		},
		{
			title: 'Un ancien examen',
			description: 'Voici un examen d\'histoire sur la rome antique. Nous allons le corrigé ici. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			date: '25/04/2020'
		},
		{
			title: 'Un livre',
			description: '',
			date: '25/04/2020'
		},
		{
			title: 'Les temps du passé en anglais',
			description: '',
			date: '25/04/2020'
		},
		{
			title: 'Un ancien examen',
			description: 'Voici un examen d\'histoire sur la rome antique. Nous allons le corrigé ici. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			date: '25/04/2020'
		},
		{
			title: 'Article sur le machine learning',
			description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
			date: '25/04/2020'
		},
		{
			title: 'Un ancien examen',
			description: 'Voici un examen d\'histoire sur la rome antique. Nous allons le corrigé ici. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			date: '25/04/2020'
		},
	];


	return (
		<div>
			<Grid container justify="center" display="inline">
				<Grid
					className={classes.sticky}
					item
					xs={2}
				>
					{open ? (
						<Fab className={classes.margin} size="small" variant="extended" color="secondary" onClick={handleDrawerClose}>
							<Typography className={classes.margin}>Filtres</Typography>
							<ChevronLeftIcon style={{ color: 'white' }} />
						</Fab>
					) : (
							<Fab className={classes.margin} size="small" variant="extended" color="secondary" onClick={handleDrawerOpen}>
								<Typography className={classes.margin}>Filtres</Typography>
								<ChevronRightIcon style={{ color: 'white' }} />
							</Fab>
						)}
					<Slide direction="right" in={open} mountOnEnter unmountOnExit>
						<Card elevation={2}>
							<List>
								{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
									<ListItem key={text}>
										<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
										<ListItemText primary={text} />
									</ListItem>
								))}
							</List>
							<Divider />
							<List>
								{['All mail', 'Trash', 'Spam'].map((text, index) => (
									<ListItem key={text}>
										<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
										<ListItemText primary={text} />
									</ListItem>
								))}
							</List>
						</Card>
					</Slide>
				</Grid>
				<Grid
					item
					xs={8}
				>
					<PublicationList publications={publications} />
				</Grid>
			</Grid>
		</div>
	);
}

export default withRouter(Homepage);