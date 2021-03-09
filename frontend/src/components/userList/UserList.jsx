import {
  ListItem,
  ListItemText,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import axios from "axios";

const UserList = ({ user, isModo }) => {
  async function deleteUser() {
    await axios.delete(`/api/users/${user.id}`);
    window.location.reload();
  }

  async function deleteModerator() {
    await axios.delete(`/api/delete/moderator/${user.id}`);
    window.location.reload();
  }

  return (
    <ListItem>
      {isModo ? (
        <ListItemText primary={<Typography>{user.username}</Typography>} />
      ) : (
        <ListItemText
          primary={<Typography>{user.name}</Typography>}
          secondary={
            <Typography
              style={{ color: "red" }}
            >{`${user.strikeNumber} reports`}</Typography>
          }
        />
      )}
      <Grid alignItems="center" container justify="flex-end">
       {isModo ? (<Button startIcon={<Delete />} onClick={deleteModerator}></Button>) : (<Button startIcon={<Delete />} onClick={deleteUser}></Button>)}
      </Grid>
    </ListItem>
  );
};

export default UserList;
