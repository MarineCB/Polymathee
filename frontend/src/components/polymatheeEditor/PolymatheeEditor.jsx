/* eslint-disable react-hooks/exhaustive-deps */
import RichTextEditor from "react-rte";
import React from 'react'
import { useEffect } from 'react'

function PolymatheeEditor(props) {
    let description = props.description
    let setDescription = props.setDescription
    let onChange = props.onChange
    
      useEffect(() => {
        setDescription(RichTextEditor.createValueFromString(props.value , 'html'))
      }, [])
    

      function handleValueChange(editorValue) {
        setDescription(editorValue)
        if (onChange) onChange(editorValue)

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