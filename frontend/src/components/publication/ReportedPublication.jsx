import {
    Box,
    Card,
    Button,
    Divider,
    RadioGroup,
    FormLabel,
    FormControlLabel,
    Radio,
    Fab,
    Typography,
    Slide,
    Paper
  } from "@material-ui/core";
  import {useState, useEffect} from 'react';


const ReportedPublication = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onClickFilter = () => {
        setIsOpen(!isOpen);
      };


    return(
       <div>reportedpubli</div>
    );
}

export default ReportedPublication;