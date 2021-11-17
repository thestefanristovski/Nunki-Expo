import React from 'react';
import {Button, Pressable, Text, View, TextInput} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react";
import KeywordPill from "../../atoms/KeywordPill";
import InputField from "../InputField";
import MainButton from "../../atoms/MainButton";


interface Props {
    title: string;
    onPress: () => void;
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
  width: 100%;
  margin-bottom: 30px;
`

const CustomButton = styled.View`
  vertical-align: middle;
  margin-left: 30px;
`

const BarContainer = styled.View`
  vertical-align: middle;
  margin-left: 30px;
  width: 70%;
`

const SearchBar = (props: Props) => {
    const {title, onPress} = props;
    return(
        <Search>
            <BarContainer>
                <Bar>
                    <Icon icon={"fluent:search-16-filled"} style={{height: 30, width:30, color:"white", marginRight: 10, verticalAlign: "middle"}}/>
                    <KeywordPill title={"One"}/>
                    <KeywordPill title={"Two"}/>
                    <StyledTextInput placeholder={"Search by Keywords"} style={{outlineStyle:"none", boxShadow:"none"}} />
                </Bar>
            </BarContainer>
            <CustomButton>
                <MainButton title={"Search"} />
            </CustomButton>
        </Search>

    )
}


SearchBar.defaultProps = {
    title: "Hello",
    onPress: ()=> {},
}

export default SearchBar;
