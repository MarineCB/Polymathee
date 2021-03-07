/* eslint-disable react-hooks/exhaustive-deps */
import RichTextEditor from "react-rte";
import React from 'react'
import { useEffect } from 'react'

function PolymatheeEditor(props) {
    let description = props.description
    let setDescription = props.setDescription
    let onChange = props.onChange
    
      useEffect(() => {
        if(props.value._editorState) { // If already in html object
          setDescription(props.value)
        } else { // If plain string
          setDescription(RichTextEditor.createValueFromString(props.value , 'html'))
        }
      }, [])
    

      function handleValueChange(editorValue) {
        setDescription(editorValue)
        if (onChange) onChange(editorValue)
        console.log(description)
      }
  
      return (
        <RichTextEditor
          autofocus
          placeholder="Votre description"
          editorClassName={props.editorClassName}
          className={props.className}
          readOnly={props.readOnly}
          value={description}
          onChange={handleValueChange}
        />
      );
  }
  
export default PolymatheeEditor