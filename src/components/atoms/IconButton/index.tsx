import React from 'react';
import {Button, Pressable, Text} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react";
import {Link} from "react-router-dom";



interface Props {
    onPress: () => void;
    icon: string;
    color: string;
}

//TODO: Hover behavior of button (see react-native-web-hover)

const IconButtonContainer = styled.TouchableOpacity`
  background-color: transparent;
  line-height: 2px;
  vertical-align: left;
`

const IconButton = (props: Props) => {
    const { onPress, icon, color } = props;
    return(
        <IconButtonContainer onPress={onPress}>
            <Icon icon={icon} style={{height: 30, width: 30, color:color, verticalAlign: "middle"}}/>
        </IconButtonContainer>
    )
}


IconButton.defaultProps = {
    onPress: ()=> {},
    color: '#6083FF'
}

export default IconButton;
