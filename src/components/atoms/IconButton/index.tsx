import React from 'react';
import {Button, Pressable, Text} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react";


interface Props {
    onPress: () => void;
}

//TODO: Hover behavior of button (see react-native-web-hover)

const StyledPressable = styled.Pressable`
  background-color: transparent;
  line-height: 2px;
  padding: 5px 2px;
  vertical-align: left;
`

const StatsButton = (props: Props) => {
    const { onPress} = props;
    return(
        <StyledPressable onPress={onPress}>
                            <Icon icon={"ion:stats-chart"} style={{height: 30, width:30, color:"white", marginRight: 5, marginLeft:5, verticalAlign: "middle"}}/>
        </StyledPressable>
    )
}


StatsButton.defaultProps = {
    onPress: ()=> {},
}

export default StatsButton;
