import React from 'react';
import {Button, Pressable, Text, View, TextInput} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react";
import KeywordPill from "../../atoms/KeywordPill";
import InputField from "../InputField";
import MainButton from "../../atoms/MainButton";
import IconButton from "../../atoms/IconButton";


interface Props {
    title: string;
    onPressSearch: () => void;
    onAddKeyword: (param: string) => void;
    keywords: string[]
    onDelete: (param: string) => void;
    onAdvanced: boolean;
    onMap: boolean;
    hasLocation: boolean;
    onChangeAdvanced: (param: boolean) => void;
    onChangeMap: (param: boolean) => void;
}

const StyledText  = styled.Text`
    color: white;
    font-size: 17px;
    text-align: center;
    vertical-align: middle;
`;

//TODO: Hover behavior of button (see react-native-web-hover)

const StyledTextInput = styled.TextInput`
  background-color: transparent;
  border: transparent 0px;
  height: 40px;
  padding-left: 10px;
  font-size: 14px;
  vertical-align: middle;
  color: white;
  outline: none;
  box-shadow: none;
  flex-grow: 1;
  &:focus{
    outline: none;
    border-style: none;
    box-shadow: none;
  }
`

const SearchContainer = styled.View`
  background-color: transparent;
  vertical-align: middle;
  align-items: center;  
  justify-content: flex-start;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  margin-bottom: 0px;
`

const SearchButtonContainer = styled.View`
  vertical-align: middle;
  margin-left: 10px;
  margin-right: 10px;
`

const BarContainer = styled.View`
  vertical-align: middle;
  //margin-left: 30px;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: #191932;
  border-radius: 60px;
  padding: 5px;
  
`

const LocationContainer = styled.View`
  background-color: #191932;
  vertical-align: middle;
  padding: 10px 20px;
  border-radius: 60px;
  display: inline-block;
  margin-left: 10px;
`

const LocationContainerActive = styled.View`
  background-color: #25245D;
  vertical-align: middle;
  padding: 10px 15px;
  border-radius: 60px;
  display: inline-block;
  margin-left: 10px;
  border: 1px solid #6083FF;
`

const LocationContainerSelected = styled.View`
  background-color: #023AFF;
  vertical-align: middle;
  padding: 10px 15px;
  border-radius: 60px;
  display: inline-block;
  margin-left: 10px;
  border: 1px solid white;
`

const SearchBar = (props: Props) => {
    const {onPressSearch, onAddKeyword, keywords, onDelete, onAdvanced, hasLocation, onChangeAdvanced, onChangeMap, onMap} = props;
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
    const onSubmitSearch = async () => {
        if (textFieldContent !== '') {
           await onAddKeyword(textFieldContent);
            if (textField !== null) {
                // @ts-ignore
                textField.current.clear();
            }
            onPressSearch();
        } else {
            onPressSearch();
        }

    }

    const changeAdvanced = () => {
        onChangeAdvanced(!onAdvanced);
    }

    const changeMap = () => {
        onChangeMap(!onMap);
    }

    return(
        <SearchContainer>
            <BarContainer>
                    <Icon icon={"fluent:search-16-filled"} style={{height: 30, width:30, color:"white", marginRight: 10, marginLeft:10, verticalAlign: "middle"}}/>
                    {keywords.map((element:string) => {
                        if (element !== '') {
                            return <KeywordPill title={element} onPress={onDelete}/>
                        }
                    })}
                    <StyledTextInput ref={textField} placeholder={"Search by keywords or phrases"} style={{outlineStyle:"none", boxShadow:"none"}} onChangeText={onChangedText}/>
            </BarContainer>
            {onMap &&
            <LocationContainerSelected>
                <IconButton onPress={changeMap} icon={"ion:map-outline"} color={'white'}/>
            </LocationContainerSelected>}
            {!onMap && hasLocation &&
            <LocationContainerActive>
                <IconButton onPress={changeMap} icon={"ion:map-outline"}/>
            </LocationContainerActive>
            }
            {!onMap && !hasLocation &&
            <LocationContainer>
                <IconButton onPress={changeMap} icon={"ion:map-outline"}/>
            </LocationContainer>
            }
            <SearchButtonContainer>
                <MainButton title={"Search"} onPress={onSubmitSearch}/>
            </SearchButtonContainer>
            {!onAdvanced && <>
                <View style={{marginLeft: 10, marginRight: 10}}>
                    <IconButton onPress={changeAdvanced} icon={"fluent:options-16-filled"}/>
                </View>
            </>}
            {onAdvanced && <>
                <View style={{borderColor: 'white', borderWidth: 1, backgroundColor: '#023AFF', borderRadius: 40, padding: 10}}>
                    <IconButton onPress={changeAdvanced} icon={"fluent:options-16-filled"} color={'white'}/>
                </View>
            </>}
        </SearchContainer>

    )
}


SearchBar.defaultProps = {
    title: "Hello",
    onPress: ()=> {},
    onAdvanced: false,
    hasLocation: false,
}

export default SearchBar;
