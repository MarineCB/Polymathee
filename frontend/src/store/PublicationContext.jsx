import React, { useState, createContext, useEffect } from 'react';
import axios from "axios";

const PublicationContext = createContext();

function PublicationProvider(props){
	
	const [Publications, setPublications] = useState([]);
	useEffect(() => {
		axios.get("api/publications/?status=Published").then((res) => {
		setPublications(res.data);
	  })}, []);
	
	return(
		<PublicationContext.Provider value={[Publications, setPublications]}>
			{props.children}
		</PublicationContext.Provider>
	);
}

export { PublicationContext, PublicationProvider };