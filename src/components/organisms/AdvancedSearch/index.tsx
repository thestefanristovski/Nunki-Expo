import React from 'react';
import {Button, Pressable, Text} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import DropDown from "../../atoms/DropDown";


const StyledText  = styled.Text`
    color: white;
    font-size: 17px;
    text-align: center;
    vertical-align: middle;
`;

//TODO: Hover behavior of button (see react-native-web-hover)

const Advanced = () => {
    return(
            <><StyledText>
            Advanced Search
        </StyledText>
        <DropDown /></>  
    )
}


Advanced.defaultProps = {
    title: "Advanced Search",
    onPress: ()=> {},
}

export default Advanced;
