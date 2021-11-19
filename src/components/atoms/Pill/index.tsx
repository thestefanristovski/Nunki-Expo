import React from 'react';
import {Button, Pressable, Text} from "react-native";
// @ts-ignore
import styled from "styled-components/native";


interface Props {
    title: string;
    onPress: (element: string, another:string) => void;
    statusActive: string;
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

const StyledPressableActive = styled.Pressable`
  background-color: #25245D;
  border-radius: 100px;
  line-height: 17px;
  padding: 10px 30px;
  vertical-align: middle;
  border: #6083FF 2px solid;
  width: fit-content;
  margin-right: 10px;
  margin-bottom: 10px;
  display: inline-block;
`

const Pill = (props: Props) => {
    const {title, onPress, statusActive} = props;

    if (statusActive === "active") {
        return(
            <StyledPressableActive onPress={() => {// @ts-ignore
                onPress(title)}}>
                <StyledText>
                    {title}
                </StyledText>
            </StyledPressableActive>
        )
    } else {
        return(
            <StyledPressable onPress={() => {// @ts-ignore
                onPress(title)}}>
                <StyledText>
                    {title}
                </StyledText>
            </StyledPressable>
        )
    }


}

export default Pill;
