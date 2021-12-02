import React from 'react';
import {Button, Pressable, Text, View, TextInput} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import { DividerShortRegular } from 'fluent-icons-react';


interface Props {
}

const StyledTitle  = styled.Text`
    color: white;
    font-size: 20px;
`;

const StyledText  = styled.Text`
color: white;
font-size: 15px;
margin-right: 3px;
margin-left: 15px;
vertical-align: middle;

    `;

const Bar = styled.View`
  background-color: #111121;
  vertical-align: middle;
  padding: 8px;
  border-radius: 10px;
  display: left;
`

const StyledTextInput = styled.TextInput`
  background-color: transparent;
  border: transparent 0px;
  height: 20px;
  padding-left: 10px;
  font-size: 14px;
  vertical-align: left;
  color: white;
  outline: none;
  box-shadow: none;
  width: 100%;
  &:focus{
    outline: none;
    border-style: none;
    box-shadow: none;
  }
`

const Box = styled.View`
  background-color: transparent;
  vertical-align: left;
  align-items: left;  
  justify-content: left;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
`

const BarContainer = styled.View`
  vertical-align: middle;
  margin-left: 0px;
  width: 100px;
`

const SearchRadius = (props: Props) => {
    const [textFieldContent, setTextFieldContent] = React.useState('')

    const textField = React.useRef<TextInput>(null)

    return(
        <><StyledTitle>
            Location Search Radius
        </StyledTitle><DividerShortRegular size={10} color="transparent" />
            <Box>
                <BarContainer>
                    <Bar>
                        <StyledTextInput ref={textField} placeholder={"Distance"} style={{ outlineStyle: "none", boxShadow: "none" }} />
                    </Bar>
                </BarContainer>
                <StyledText>
                    m
                </StyledText>
            </Box></>
    )
}


SearchRadius.defaultProps = {

}

export default SearchRadius;
