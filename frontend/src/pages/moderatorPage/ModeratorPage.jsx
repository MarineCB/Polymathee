import { useState, useEffect } from "react";
import {
  Box,
  Tab,
  Tabs,
  List,
  Divider,
} from "@material-ui/core";
import PropTypes from "prop-types";
import axios from "axios";
import GenericPublicationTile from "../../components/genericPublicationTile/GenericPublicationTile";
import GenericCommentArea from "../../components/commentArea/GenericCommentArea";
import UserList from "../../components/userList/UserList";
import Login from "../login/Login";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ModeratorPage = ({ role }) => {
  const [value, setValue] = useState(0);
  const [pendingPublications, setPendingPublications] = useState();
  const [reportedComments, setReportedComments] = useState();
  const [reportedPublications, setReportedPublications] = useState();
  const [allUsers, setAllUsers] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getPendingPublications() {
      const status = "To_Treat";
      const fetchPendingPublications = await axios.get(
        `/api/publications/status/${status}`
      );
      setPendingPublications(fetchPendingPublications.data);
    }

    async function getReportedPublications(strikeNumber) {
      const fetchReportedPublications = await axios.get(
        `/api/publication/report/${strikeNumber}`
      );
      setReportedPublications(fetchReportedPublications.data);
    }

    async function getReportedComments(strikeNumber) {
      const fetchReportedComments = await axios.get(
        `/api/comments/reports/${strikeNumber}`
      );
      setReportedComments(fetchReportedComments.data);
    }

    function compare(a, b) {
      if (a.strikeNumber > b.strikeNumber) return -1;
      if (a.strikeNumber < b.strikeNumber) return 1;
      return 0;
    }
    async function getAllUsers() {
      const fetchAllUsers = await axios.get("/api/users");
      const tmpArr = fetchAllUsers.data;
      tmpArr.sort(compare);
      setAllUsers(tmpArr);
    }

    getPendingPublications();
    getReportedPublications(1);
    getReportedComments(0);
    if (role) getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reportedPublications) {
      const tmp = reportedPublications;
      let index = tmp.length;
      while (index--) {
        if (tmp[index].status !== "Published") {
          tmp.splice(index, 1);
        }
      }
      setReportedPublications(tmp);
    }
  }, [reportedPublications]);

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Publications en attente" {...a11yProps(0)} />
        <Tab label="Commentaires signalés" {...a11yProps(1)} />
        <Tab label="Publications signalées" {...a11yProps(2)} />
        {role === "Administrator" && (
          <Tab label="Liste d'Utilisateurs" {...a11yProps(3)} />
        )}
        {role === "Administrator" && (
          <Tab label="Créer un Modérateur" {...a11yProps(4)} />
        )}
      </Tabs>
      <TabPanel value={value} index={0}>
        {pendingPublications ? (
          pendingPublications.map((publication) => {
            return (
              <GenericPublicationTile
                key={publication.id}
                publication={publication}
                task="pending"
              />
            );
          })
        ) : (
          <div></div>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List>
          {reportedComments ? (
            reportedComments.map((comment) => {
              return (
                <div key={`div-${comment.id}`}>
                  <GenericCommentArea key={comment.id} comment={comment} />
                  <Divider
                    key={`divider-${comment.id}`}
                    variant="inset"
                    component="li"
                  />
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
        {reportedPublications ? (
          reportedPublications.map((publication) => {
            return (
              <GenericPublicationTile
                key={publication.id}
                publication={publication}
                task="reported"
              />
            );
          })
        ) : (
          <div></div>
        )}
      </TabPanel>
      {role === "Administrator" && (
        <TabPanel value={value} index={3}>
          <List>
            {allUsers ? (
              allUsers.map((user) => {
                return (
                  <div key={user.id}>
                    <UserList user={user} />
                    <Divider />
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </List>
        </TabPanel>
      )}
      {role === "Administrator" && (
        <TabPanel value={value} index={4}>
          <Login role='Administrator' />
        </TabPanel>
      )}
    </div>
  );
};

export default ModeratorPage;
