import React from 'react';
import {Button, Pressable, Text} from "react-native";
// @ts-ignore
import styled from "styled-components/native";


interface Props {
    title: string;
    onPress: (element: string, another:string) => void;
    statusActive: string;
}

const MultiPillText  = styled.Text`
    color: white;
    font-size: 14px;
    text-align: center;
    vertical-align: middle;
`;

//TODO: Hover behavior of button (see react-native-web-hover)

const MultiPillContainer = styled.Pressable`
  background-color: #191932;
  border-radius: 100px;
  line-height: 14px;
  padding: 7px 20px;
  vertical-align: middle;
  border: #6083FF 2px solid;
  width: fit-content;
  margin-right: 10px;
  margin-bottom: 10px;
  display: inline-block;
`

const ActiveMultiPillContainer = styled.Pressable`
  background-color: #25245D;
  border-radius: 100px;
  line-height: 14px;
  padding: 7px 20px;
  vertical-align: middle;
  border: #6083FF 2px solid;
  width: fit-content;
  margin-right: 10px;
  margin-bottom: 10px;
  display: inline-block;
`

const MultiPill = (props: Props) => {
    const {title, onPress, statusActive} = props;

    if (statusActive === "active") {
        return(
            <ActiveMultiPillContainer onPress={() => {// @ts-ignore
                onPress(title)}}>
                <MultiPillText>
                    {title}
                </MultiPillText>
            </ActiveMultiPillContainer>
        )
    } else {
        return(
            <MultiPillContainer onPress={() => {// @ts-ignore
                onPress(title)}}>
                <MultiPillText>
                    {title}
                </MultiPillText>
            </MultiPillContainer>
        )
    }


}

export default MultiPill;
