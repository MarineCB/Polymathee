
import {useState, useEffect} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import axios from 'axios';
import GenericPublicationTile from '../../components/genericPublicationTile/GenericPublicationTile';
import ReportedPublication from '../../components/publication/ReportedPublication';

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
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }



const ModeratorPage = () => {
    const [value, setValue] = useState(0);
    const [pendingPublications, setPendingPublications] = useState();
    // const [checkCommentaries, setCheckCommentaries] = useState();
    // const [checkPublications, setCheckPublications] = useState();
    // const[publiTest, setPubliTest] = useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    
    useEffect(() => {
        async function getPendingPublications() {
            const fetchPendingPublications = await axios.get('/api/publications/{status}', {
                params: {
                    status: 'To_Treat',
                }
            });
            setPendingPublications(fetchPendingPublications.data);
        }

        async function getReportedComments(strikeNumber) {
            const fetchReportedComments = await axios.get(`/api/comments/reports/${strikeNumber}`);
            console.log(fetchReportedComments);
        }
        getPendingPublications();
        getReportedComments(1);

    },[]);

    
    return(
        <div>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Publications en attente" {...a11yProps(0)}/>
                <Tab label="Commentaires signalés" {...a11yProps(1)}/>
                <Tab label="Publications signalées" {...a11yProps(2)}/>
            </Tabs>
            <TabPanel value={value} index={0}>
                {
                   pendingPublications? pendingPublications.map((publication) => {
                        return(  
                            <GenericPublicationTile key={publication.id} publication={publication} />
                        );
                    }) : <div></div>
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ReportedPublication />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div>Item Two</div>
            </TabPanel>
        </div>
    );
}

export default ModeratorPage;