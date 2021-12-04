import React from 'react';
import {Button, Pressable, Text, View, TextInput, Image} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react";
import KeywordPill from "../../atoms/KeywordPill";
import MainButton from "../../atoms/MainButton";
import IconButton from "../../atoms/IconButton";
import MultiPill from "../MultiPill";
import CheckBox from "@react-native-community/checkbox";


interface Props {
    label: string,
    value: boolean,
    onPress: (element: string, another:string) => void;
}


const CheckboxText = styled.Text`
  color: white;
  font-size: 14px;
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
`

const CheckIconContainer = styled.View`
    display: inline-block;
    vertical-align: middle;
`

const CheckBoxContainer = styled.Pressable`
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
        <CheckBoxContainer onPress={() => {// @ts-ignore
            onPress(label)}}>
            <CheckIconContainer>
                <Image source={imgSrc} style={{width:15, height:15}}/>
            </CheckIconContainer>
            <CheckboxText>
                {label}
            </CheckboxText>
        </CheckBoxContainer>
    )
}


CheckBoxLabel.defaultProps = {
}

export default CheckBoxLabel;
