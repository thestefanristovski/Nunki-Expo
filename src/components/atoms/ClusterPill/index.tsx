import React from 'react';
import {Button, Pressable, Text, View} from "react-native";
// @ts-ignore
import styled from "styled-components/native";


interface Props {
    title: string;
    amount: number;
    onPress: (element: string, another:string) => void;
    statusActive: string;
}

const ClusterPillText  = styled.Text`
    color: white;
    font-size: 16px;
    text-align: left;
    vertical-align: middle;
`;

const ClusterResultText = styled.Text`
  color: white;
  font-size: 11px;
  text-align: left;
  vertical-align: middle;
`

//TODO: Hover behavior of button (see react-native-web-hover)

const ClusterContainer = styled.Pressable`
  background-color: #191932;
  border-radius: 20px;
  line-height: 10px;
  padding: 15px 20px;
  vertical-align: middle;
  border: #6083FF 2px solid;
  width: fit-content;
  margin-right: 15px;
  margin-bottom: 20px;
  display: inline-block;
`

const ActiveClusterContainer = styled.Pressable`
  background-color: #6083FF;
  border-radius: 20px;
  line-height: 14px;
  padding: 15px 20px;
  vertical-align: middle;
  border: #6083FF 2px solid;
  width: fit-content;
  margin-right: 15px;
  margin-bottom: 20px;
  display: inline-block;
`

const ClusterPill = (props: Props) => {
    const {title, onPress, statusActive, amount} = props;

    if (statusActive === "active") {
        return(
            <ActiveClusterContainer onPress={() => {// @ts-ignore
                onPress(title)}}>
                <View>
                    <ClusterPillText>{title}</ClusterPillText>
                    <ClusterResultText>{amount} results</ClusterResultText>
                </View>
            </ActiveClusterContainer>
        )
    } else {
        return(
            <ClusterContainer onPress={() => {// @ts-ignore
                onPress(title)}}>
                <View>
                    <ClusterPillText>{title}</ClusterPillText>
                    <ClusterResultText>{amount} results</ClusterResultText>
                </View>
            </ClusterContainer>
        )
    }


}

export default ClusterPill;
