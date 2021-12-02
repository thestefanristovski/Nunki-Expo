import React from 'react';
// @ts-ignore
import styled from "styled-components/native";
import Pill from '../../atoms/Pill';
import {View, Text, TextInput} from "react-native";

interface Props {
    title: string;
    min: number;
    max: number;
    defaultMin: number;
    defaultMax: number;
    onChangeLength: (min: number, max: number) => void
}

const StyledInput = styled.TextInput`
  background-color: #111121;
  border: transparent 0px;
  height: 40px;
  border-radius: 10px;
  padding-left: 10px;
  font-size: 14px;
  vertical-align: middle;
  color: white;
  outline: none;
  width: max-content;
  box-shadow: none;
  width: 80px;
  &:focus{
    outline: none;
    border-style: none;
    box-shadow: none;
  }
`

const StyledText = styled.Text`
  color: white;
  font-size: 15px;
  margin-right: 15px;
  margin-left: 15px;
`

const StyledTitle = styled.Text`
  color: white;
  font-size: 20px;
  padding: 10px 0;
  margin-bottom: 10px;
`

const StyledView = styled.View`
  display: inline-block;
`


const SliderFilterMenu = (props: Props) => {
    const {min, max, defaultMin, defaultMax, title, onChangeLength} = props
    const [minValue, setMinValue] = React.useState(defaultMin)
    const [maxValue, setMaxValue] = React.useState(defaultMax)

    const minField = React.useRef<TextInput>(null)
    const maxField = React.useRef<TextInput>(null)

    const onChangedMin = (text:string) => {
        text = text.replace(/[^0-9]/g, '')
        setMinValue(Number(text))
        if (minField.current) {
            minField.current.setNativeProps({text: text})
        }
        onChangeLength(Number(text), maxValue);
    }

    const onChangedMax = (text:string) => {
        text = text.replace(/[^0-9]/g, '')
        setMaxValue(Number(text))
        if (maxField.current) {
            maxField.current.setNativeProps({text: text})
        }
        onChangeLength(minValue, Number(text));
    }

    return(
        <View>
            <StyledTitle>{title}</StyledTitle>
            <StyledView>
                <StyledInput ref={minField} defaultValue={defaultMin.toString()} onChangeText={onChangedMin}/>
                <StyledText>-</StyledText>
                <StyledInput ref={maxField} defaultValue={defaultMax.toString()} onChangeText={onChangedMax}/>
            </StyledView>
        </View>
    )


}

SliderFilterMenu.defaultProps = {
    title: "Video Length",
}

export default SliderFilterMenu;
