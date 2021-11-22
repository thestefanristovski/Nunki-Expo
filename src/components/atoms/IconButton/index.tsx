import React from 'react';
import {Button, Pressable, Text} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react";


interface Props {
    onPress: () => void;
    icon: string;
}

//TODO: Hover behavior of button (see react-native-web-hover)

const StyledPressable = styled.Pressable`
  background-color: transparent;
  line-height: 2px;
  padding: 5px 2px;
  vertical-align: left;
`

const IconButton = (props: Props) => {
    const { onPress, icon} = props;
    return(
        <StyledPressable onPress={onPress}>
                            <Icon icon={icon} style={{height: 30, width:30, color:"#6083FF", marginRight: 5, marginLeft:10, verticalAlign: "middle"}}/>
        </StyledPressable>
    )
}


IconButton.defaultProps = {
    onPress: ()=> {},
}

export default IconButton;
