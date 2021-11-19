import React from 'react';
import {Button, Pressable, Text} from "react-native";
// @ts-ignore
import styled from "styled-components/native";


interface Props {
    title: string;
    onPress: () => void;
    status: string;
}

const StyledText  = styled.Text`
    color: white;
    font-size: 17px;
    text-align: center;
    vertical-align: middle;
`;

//TODO: Hover behavior of button (see react-native-web-hover)

const StyledPressable = styled.Pressable`
  background-color: #191932;
  border-radius: 100px;
  line-height: 17px;
  padding: 10px 30px;
  vertical-align: middle;
  border: #6083FF 2px solid;
  width: fit-content;
  margin-right: 10px;
  display: inline-block;
`

const Pill = (props: Props) => {
    const {title, onPress} = props;
    return(
        <StyledPressable onPress={onPress}>
            <StyledText>
                {title}
            </StyledText>
        </StyledPressable>
    )
}

export default Pill;
