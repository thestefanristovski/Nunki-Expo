import React from 'react';
import {Button, Pressable, Text, View, TextInput} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react";
import KeywordPill from "../../atoms/KeywordPill";
import InputField from "../InputField";
import MainButton from "../../atoms/MainButton";
import AdvancedButton from "../../atoms/AdvancedButton";
import IconButton from "../../atoms/IconButton";


interface Props {
    title: string;
    onPressSearch: () => void;
    onAddKeyword: (param: string) => void;
    keywords: string[]
    onDelete: (param: string) => void;
}

const StyledText  = styled.Text`
    color: white;
    font-size: 17px;
    text-align: center;
    vertical-align: middle;
`;

//TODO: Hover behavior of button (see react-native-web-hover)

const StyledPressable = styled.Pressable`
  background-color: blue;
  border-radius: 100px;
  line-height: 17px;
  padding: 10px 30px;
  vertical-align: middle;
`

const StyledPress = styled.Pressable`
  background-color: transparent;
  vertical-align: middle;
`

const Bar = styled.View`
  background-color: #191932;
  vertical-align: middle;
  padding: 10px;
  border-radius: 60px;
  display: inline-block;
`

const StyledTextInput = styled.TextInput`
  background-color: transparent;
  border: transparent 0px;
  height: 40px;
  padding-left: 10px;
  font-size: 14px;
  vertical-align: middle;
  color: white;
  outline: none;
  width: max-content;
  box-shadow: none;
  width: 80%;
  &:focus{
    outline: none;
    border-style: none;
    box-shadow: none;
  }
`

const Search = styled.View`
  background-color: transparent;
  vertical-align: middle;
  align-items: center;  
  justify-content: center;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  margin-bottom: 30px;
`

const CustomButton = styled.View`
  vertical-align: middle;
  margin-left: 30px;
  margin-right: 20px;
`

const BarContainer = styled.View`
  vertical-align: middle;
  margin-left: 30px;
  width: calc(100% - 280px);
`

const SearchBar = (props: Props) => {
    const {onPressSearch, onAddKeyword, keywords, onDelete} = props;
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

    //When Search is clicked, add remaining keyword from text input to query params and execute query
    //TODO test functionnality with backend
    const onSubmitSearch = () => {
        if (textFieldContent !== '') {
            onAddKeyword(textFieldContent)
            if (textField !== null) {
                // @ts-ignore
                textField.current.clear();
            }
        }
        onPressSearch();
    }

    return(
        <Search>
            <BarContainer>
                <Bar>
                    <Icon icon={"fluent:search-16-filled"} style={{height: 30, width:30, color:"white", marginRight: 10, marginLeft:10, verticalAlign: "middle"}}/>
                    {keywords.map((element:string) => {
                        if (element !== '') {
                            return <KeywordPill title={element} onPress={onDelete}/>
                        }
                    })}
                    <StyledTextInput ref={textField} placeholder={"Search by keywords or phrases"} style={{outlineStyle:"none", boxShadow:"none"}} onChangeText={onChangedText}/>
                </Bar>
            </BarContainer>
            <CustomButton>
                <MainButton title={"Search"} onPress={onSubmitSearch}/>
            </CustomButton>
                <AdvancedButton/>
        </Search>

    )
}


SearchBar.defaultProps = {
    title: "Hello",
    onPress: ()=> {},
}

export default SearchBar;
