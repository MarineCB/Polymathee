import user_logo from "./user.png";
import {useState, useContext} from "react";
import "./ProfileMenu.css";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { UserContext } from "../../context/UserContext";
import {GoogleLogin} from 'react-google-login';

const ProfileMenu = () => {

    const [anchorEl, setAnchorEl] = useState(null);

     const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const {setAuthToken, logout, isConnected} = useContext(UserContext);

    const responseGoogle = (response) => {
      window.localStorage.setItem('myToken', response.tokenId);
      setAuthToken(response.tokenId);
      console.log(response)
    }

    const ProfileMenuLogout = () => {
        handleClose();
        logout();    
    }

    return(
        <div>
            <button className="profile-button" onClick={handleClick}>
                <img src={user_logo} alt="profile_logo" height={35}/>
            </button>
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
                {
                    !isConnected ? (
                    <MenuItem onClick={handleClose}>
                        <GoogleLogin 
                        clientId="830825430370-i6c50kj5nsr5amgqlr1qapjq9k9f0tqa.apps.googleusercontent.com"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        redirectUri="http://localhost:8080/login/oauth2/code/google"
                        />
                    </MenuItem>
                    ) : (
                        <div>
                        <MenuItem onClick={handleClose}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={ProfileMenuLogout}>
                            Logout
                        </MenuItem>
                        </div>
                    )
                }
                
            </Menu>
        </div>
    );
}


export default ProfileMenu;