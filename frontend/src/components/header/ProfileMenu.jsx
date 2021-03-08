import user_logo from "./user.png";
import {useState, useContext} from "react";
import "./ProfileMenu.css";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { UserContext } from "../../store/UserContext";
import {GoogleLogin} from 'react-google-login';
import { useHistory } from "react-router-dom";

const ProfileMenu = () => {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);

     const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const {setAuthToken, logout, isConnected, role} = useContext(UserContext);

    const responseGoogle = (response) => {
      window.localStorage.setItem('myToken', response.tokenId);
      setAuthToken(response.tokenId);
      window.location.reload();
    }

    const ProfileMenuLogout = () => {
        handleClose();
        logout();  
        history.push('/homepage');  
    }

    const handleMyPublications = () => {
        handleClose();
        history.push('/myPublications');
        
    }

    const handleCreatePublicationClick = () => {
        handleClose();
        history.push('/createpublication');
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
                        {
                            role === 'Student' && (
                                <div>
                                    <MenuItem onClick={handleMyPublications}>
                                    Mes Publications
                                    </MenuItem>
                                    <MenuItem onClick={handleCreatePublicationClick}>
                                    Créer Publication
                                </MenuItem>
                               </div>
                            )
                        }    
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
