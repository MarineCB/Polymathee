import {
  ListItem,
  ListItemText,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import axios from "axios";

const UserList = ({ user }) => {
  
    async function deleteUser() {
    const res = await axios.delete(`/api/users/${user.id}`);
    console.log("res in userlist", res);
    window.location.reload();
  }

  return (
    <ListItem>
      <ListItemText
        primary={<Typography>{user.name}</Typography>}
        secondary={
          <Typography
            style={{ color: "red" }}
          >{`${user.strikeNumber} reports`}</Typography>
        }
      />
      <Grid alignItems="center" container justify="flex-end">
        <Button startIcon={<Delete />} onClick={deleteUser}></Button>
      </Grid>
    </ListItem>
  );
};

export default UserList;
