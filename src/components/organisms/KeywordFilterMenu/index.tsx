import React from 'react';
import {Button, Pressable, Text, View, TextInput} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react";
import KeywordPill from "../../atoms/KeywordPill";
import MainButton from "../../atoms/MainButton";
import IconButton from "../../atoms/IconButton";


interface Props {
    title: string;
    onAddKeyword: (param: string) => void;
    keywords: string[]
    onDelete: (param: string) => void;
}

const FilterTitle = styled.Text`
  color: white;
  font-size: 20px;
  padding: 10px 0;
  margin-bottom: 10px;
`

const TextField = styled.TextInput`
  background-color: #111121;
  border: transparent 0px;
  height: 40px;
  border-radius: 10px;
  padding-left: 10px;
  font-size: 14px;
  vertical-align: middle;
  color: white;
  outline: none;
  width: max-content;
  box-shadow: none;
  width: 300px;
  &:focus{
    outline: none;
    border-style: none;
    box-shadow: none;
  }
`
const FilterMenuContainer = styled.View`
    width: 300px;
`;

const KeywordContainer = styled.View`
    display: inline-block;
    margin-top: 10px;
`;

const KeywordFilterMenu = (props: Props) => {
    const {onAddKeyword, keywords, onDelete, title} = props;
    const [textFieldContent, setTextFieldContent] = React.useState('')

    const textField = React.useRef<TextInput>(null)

    //Listen for changes in text field, trigger add keyword method in parent when , is typed
    const onChangedText = (text:string) => {
        setTextFieldContent(text);
        if (text.endsWith(',')) {
            onAddKeyword(text);
            if (textField !== null) {
                // @ts-ignore
                textField.current.clear();
            }
        }
    }

    //When Enter is pressed, add keyword from text input
    const onSubmitKeyword = (text: string) => {
        if (textFieldContent !== '') {
            onAddKeyword(textFieldContent)
            if (textField !== null) {
                // @ts-ignore
                textField.current.clear();
            }
        }
    }

    return(
        <FilterMenuContainer>
            <FilterTitle>{title}</FilterTitle>
            <TextField ref={textField} placeholder={"Exclude keyword or phrase"} style={{outlineStyle:"none", boxShadow:"none"}} onChangeText={onChangedText} onSubmitEditing={onSubmitKeyword}/>
            <KeywordContainer>
                {keywords.map((element:string) => {
                    if (element !== '') {
                        return <KeywordPill title={element} onPress={onDelete}/>
                    }
                })}
            </KeywordContainer>
        </FilterMenuContainer>

    )
}


KeywordFilterMenu.defaultProps = {
    title: "Exclude Keywords",
}

export default KeywordFilterMenu;
