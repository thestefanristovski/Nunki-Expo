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
    font-size: 20px;
    text-align: center;
    vertical-align: middle;
`;

//TODO: Hover behavior of button (see react-native-web-hover)

const MultiPillContainer = styled.Pressable`
  background-color: #191932;
  border-radius: 10px;
  line-height: 10px;
  padding: 15px 20px;
  vertical-align: middle;
  border: #6083FF 2px solid;
  width: fit-content;
  margin-right: 20px;
  margin-bottom: 20px;
  display: inline-block;
`

const ActiveMultiPillContainer = styled.Pressable`
  background-color: #25245D;
  border-radius: 10px;
  line-height: 14px;
  padding: 15px 20px;
  vertical-align: middle;
  border: #6083FF 2px solid;
  width: fit-content;
  margin-right: 20px;
  margin-bottom: 20px;
  display: inline-block;
`

const ClusterPill = (props: Props) => {
    const {title, onPress, statusActive} = props;

    if (statusActive === "inactive") {
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

export default ClusterPill;
