import React from 'react';
// @ts-ignore
import styled from "styled-components/native";
import Pill from '../../atoms/Pill';
import {View} from "react-native";

interface Props {
    title: string;
    options: string[];
}

const StyledView = styled.View`
  display: inline-block;
`

const StyledText = styled.Text`
  color: white;
  font-size: 20px;
  padding: 10px 0px;
`

const PillMultiselect = (props: Props) => {
    const {title, options} = props

    return(
      <View>
          <StyledText>{title}</StyledText>
          <StyledView>
              {options.map((element) => (<Pill title={element} onPress={()=>{}} status={"inactive"}/>))}
          </StyledView>
      </View>

    )
}

PillMultiselect.defaultProps = {
    title: " Platform:",
    options: ["All", "Youtube", "Twitter", "Vimeo", "VK"]
}

export default PillMultiselect;
