import React from 'react';
import {Button, Pressable, Text, View, TextInput, Image} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react";
import KeywordPill from "../../atoms/KeywordPill";
import MainButton from "../../atoms/MainButton";
import IconButton from "../../atoms/IconButton";
import Pill from "../../atoms/Pill";
import CheckBox from "@react-native-community/checkbox";


interface Props {
    label: string,
    value: boolean,
    onPress: (element: string, another:string) => void;
}


const StyledText = styled.Text`
  color: white;
  font-size: 14px;
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
`

const StyledView = styled.View`
    display: inline-block;
    vertical-align: middle;
`

const StyledPressable = styled.Pressable`
  display: inline-block;
  vertical-align: middle;
  margin-right: 20px;
  margin-bottom: 10px;
`

const checkBoxActive = require('../../../../assets/checked.png')
const checkBoxInactive = require('../../../../assets/unchecked.png')

const CheckBoxLabel = (props: Props) => {
    const {label, value, onPress} = props;


    let imgSrc = checkBoxActive
    if(!value){
        imgSrc = checkBoxInactive
    }
    


    return(
        <StyledPressable onPress={() => {// @ts-ignore
            onPress(label)}}>
            <StyledView>
                <Image source={imgSrc} style={{width:15, height:15}}/>
            </StyledView>
            <StyledText>
                {label}
            </StyledText>
        </StyledPressable>
    )
}


CheckBoxLabel.defaultProps = {
}

export default CheckBoxLabel;
