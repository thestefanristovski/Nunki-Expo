import React from 'react';
import {Button, Pressable, Text} from "react-native";
// @ts-ignore
import styled from "styled-components/native";


interface Props {
    title: string;
    onPress: () => void;
}

const StyledText  = styled.Text`
    color: white;
    font-size: 17px;
    text-align: center;
    vertical-align: middle;
`;

//TODO: Hover behavior of button (see react-native-web-hover)

const StyledPressable = styled.TouchableOpacity`
  background-color: #023AFF;
  border-radius: 100px;
  height: 60px;
  padding: 10px 30px;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
`

const MainButton = (props: Props) => {
    const {title, onPress} = props;
    return(
        <StyledPressable onPress={onPress}>
            <StyledText>
                {title}
            </StyledText>
        </StyledPressable>
    )
}


MainButton.defaultProps = {
    title: "Hello",
    onPress: ()=> {},
}

export default MainButton;
