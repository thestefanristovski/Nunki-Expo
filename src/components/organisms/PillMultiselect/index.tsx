import React from 'react';
// @ts-ignore
import styled from "styled-components/native";
import Pill from '../../atoms/Pill';
import {View} from "react-native";

interface Props {
    title: string;
    options: string[];
    selected: string[];
    onSelected: (element:string, another:string) => void;
}

const StyledView = styled.View`
  display: inline-block;
  margin-left: 30px;
`

const StyledText = styled.Text`
  color: white;
  font-size: 20px;
  padding: 10px 0;
  margin-bottom: 10px;
  margin-left: 30px;
`

const PillMultiselect = (props: Props) => {
    const {title, options, selected, onSelected} = props

    if (selected.length === options.length) {
        return(
            <View>
                {title!=="" && <StyledText>{title}</StyledText> }
                <StyledView>
                    <Pill title={"All"} onPress={onSelected} statusActive={"active"}/>
                    {options.map((element) => {
                        if (selected.includes(element)) {
                            return (<Pill title={element} onPress={onSelected} statusActive={"active"}/>)
                        } else {
                            return (<Pill title={element} onPress={onSelected} statusActive={"inactive"}/>)
                        }
                    })}
                </StyledView>
            </View>

        )
    } else {
        return(
            <View>
                {title!=="" && <StyledText>{title}</StyledText> }
                <StyledView>
                    <Pill title={"All"} onPress={onSelected} statusActive={"inactive"}/>
                    {options.map((element) => {
                        if (selected.includes(element)) {
                            return (<Pill title={element} onPress={onSelected} statusActive={"active"}/>)
                        } else {
                            return (<Pill title={element} onPress={onSelected} statusActive={"inactive"}/>)
                        }
                    })}
                </StyledView>
            </View>
        )
    }


}

PillMultiselect.defaultProps = {
    title: "",
    options: ["Youtube", "Twitter", "Vimeo", "VK"],
    selected: ["Youtube", "Twitter", "Vimeo", "VK"]
}

export default PillMultiselect;
