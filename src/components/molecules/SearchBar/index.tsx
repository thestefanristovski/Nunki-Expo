// @ts-nocheck
import React, {useContext} from 'react';
import {Button, Pressable, Text, View, TextInput} from "react-native";
import styled from "styled-components/native";
import {Icon} from "@iconify/react";
import KeywordPill from "../../atoms/KeywordPill";
import InputField from "../InputField";
import MainButton from "../../atoms/MainButton";
import IconButton from "../../atoms/IconButton";
import {queryParamsContext} from "../../../state/queryParams";


interface Props {
    title: string;
    onPressSearch: (text:string) => void;
    onAdvanced: boolean;
    onMap: boolean;
    hasLocation: boolean;
    onChangeAdvanced: (param: boolean) => void;
    onChangeMap: (param: boolean) => void;
}

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
    const {onPressSearch, onAdvanced, hasLocation, onChangeAdvanced, onChangeMap, onMap} = props;

    const [textFieldContent, setTextFieldContent] = React.useState('')
    const [queryKeywords, setQueryKeywords] = React.useState([])

    const textField = React.useRef<TextInput>(null)

    const context = useContext(queryParamsContext)

    // A keyword needs to be added
    const onAddKeyword = async (text: string) => {
        if (text.endsWith(',')) {
            const keyword:string = text.substring(0, text.lastIndexOf(','));
            const keywords:string[] = queryKeywords;
            if (!keywords.includes(keyword)) {
                // @ts-ignore
                setQueryKeywords(keywords.concat(keyword));
                let p = {...context.parameters}
                // @ts-ignore
                p.anyKeywords = context.parameters.anyKeywords.concat(keyword)
                context.updateParams(p)
            }
        } else {
            const keywords:string[] = queryKeywords;
            if (!keywords.includes(text)) {
                // @ts-ignore
                setQueryKeywords(keywords.concat(text));
                let p = {...context.parameters}
                // @ts-ignore
                p.anyKeywords = context.parameters.anyKeywords.concat(text)
                context.updateParams(p)
            }
        }
    }

    // A keyword is deleted
    const onDeleteKeyword = (text:string) => {
        const keywords:string[] = queryKeywords;
        // @ts-ignore
        setQueryKeywords(keywords.filter(item => item !== text));
    }

    //Listen for changes in text field, trigger add keyword method in parent when , is typed
    const onChangedText = (text:string) => {
        setTextFieldContent(text);
        if (text.endsWith(',')) {
            onAddKeyword(text);
            if (textField !== null) {
                // @ts-ignore
                textField.current.clear();
                setTextFieldContent('')
            }
        }
    }

    //When Search is clicked, add remaining keyword from text input to query params and execute query
    const onSubmitSearch = async () => {

        if (textFieldContent !== '') {
           await onAddKeyword(textFieldContent);

           let p = {...context.parameters}
           // @ts-ignore
           p.anyKeywords = context.parameters.anyKeywords.concat(textFieldContent)
           context.updateParams(p)

           onPressSearch(p);
           if (textField !== null) {
                // @ts-ignore
                textField.current.clear();
            }
        } else {
            let p = {...context.parameters}
            onPressSearch(p);
        }
    }

    const changeAdvanced = () => {
        onChangeAdvanced(!onAdvanced);
    }

    const changeMap = () => {
        /*
        if (!onMap) {
            let p = {...context.parameters}
            p.lat = ''
            p.long = ''
            p.radius = ''
            context.updateParams(p)
        }
         */
        onChangeMap(!onMap);
    }

    return(
        <SearchContainer>
            <BarContainer>
                    <Icon icon={"fluent:search-16-filled"} style={{height: 30, width:30, color:"white", marginRight: 10, marginLeft:10, verticalAlign: "middle"}}/>
                    {queryKeywords.map((element:string) => {
                        if (element !== '') {
                            return <KeywordPill key={element} title={element} onPress={onDeleteKeyword}/>
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
