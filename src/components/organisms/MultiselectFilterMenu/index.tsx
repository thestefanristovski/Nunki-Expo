import React from 'react';
import {Button, Pressable, Text, View, TextInput} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react";
import KeywordPill from "../../atoms/KeywordPill";
import MainButton from "../../atoms/MainButton";
import IconButton from "../../atoms/IconButton";
import Pill from "../../atoms/Pill";
import CheckBox from "@react-native-community/checkbox";
import CheckBoxLabel from "../../atoms/CheckBoxLabel";



interface Props {
    title: string;
    onChanged: () => void;
    options: string[]
}

const StyledView = styled.View`
  display: inline-block;
  margin-left: 30px;
`

const StyledText = styled.Text`
  color: white;
  font-size: 20px;
  padding: 10px 0;
  margin-bottom: 10px;
  margin-left: 30px;
`

const MultiselectFilterMenu = (props: Props) => {
    const {title, onChanged, options} = props;

    return(
        <View>
            <StyledText>{title}</StyledText>
            <StyledView>
                {options.map((element) => {
                    return <CheckBoxLabel label={element} value={false} onChanged={() => {}}/>
                })}
            </StyledView>
        </View>
    )
}


MultiselectFilterMenu.defaultProps = {
    title: "Filter Menu",
    options: ["Option 1", "Option 2", "Option 3"],
    onChanged: ()=> {},
}

export default MultiselectFilterMenu;

