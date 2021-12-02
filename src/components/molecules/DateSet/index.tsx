
import { DividerShortRegular } from 'fluent-icons-react';
import React, {forwardRef, useEffect, useState} from 'react';
import {Button, Pressable, Text, View, TextInput} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
// @ts-ignore
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'



interface Props {
    title: string;
    defaultStart: string;
    defaultEnd: string;
    onChangeDates: (start: string, end: string) => void
}


const StyledText  = styled.Text`
    color: white;
    display: inline-block;
    font-size: 14px;
    text-align: left;
    vertical-align: middle;
`;

const StyledTextDisplay  = styled.Text`
    color: white;
    font-size: 12px;
    text-align: left;
    vertical-align: middle;
`;

const BarContainer = styled.View`
background-color: transparent;
  vertical-align: middle;
  align-items: center;  
  justify-content: center;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  margin-bottom: 0px;
`

const StyledRow = styled.View`
  display: inline-block;
  margin-top: 10px;
`

const StyledDateBox = styled.View`
  display: inline-block;
  margin-left: 20px;
   width: 150px; 
`

const StyledTitle = styled.Text`
  color: white;
  font-size: 20px;
  padding: 10px 0;
  margin-bottom: 10px;
`


export default function DateSet(props: Props) {
    const{title, defaultStart, defaultEnd, onChangeDates} = props;

    const[selectedDateStart, setSelectedDateStart] = useState(new Date(defaultStart));
    const[selectedDateEnd, setSelectedDateEnd] = useState(new Date(defaultEnd));

    // @ts-ignore
    const CustomInput = forwardRef<Button>(({ value, onClick }, ref) => (
        <Button title={value}  color={"#111121"} onPress={onClick} ref={ref}/>
    ));

    const onChangeDateStart = (date:Date) => {
        setSelectedDateStart(date)
        onChangeDates(date.toDateString(), selectedDateEnd.toDateString())
    }

    const onChangeDateEnd = (date:Date) => {
        setSelectedDateEnd(date)
        onChangeDates(selectedDateStart.toDateString(), date.toDateString())
    }

    return(
        <View>
            <StyledTitle>{title}</StyledTitle>
            <View>
                <StyledRow>
                    <StyledText>from</StyledText>
                    <StyledDateBox>
                        <DatePicker
                            selected = {selectedDateStart}
                            onChange={onChangeDateStart}
                            dateFormat='yyyy/MM/dd'
                            showYearDropdown
                            scrollableMonthYearDropdown
                            customInput={<CustomInput/>}
                        />
                    </StyledDateBox>
                </StyledRow>
                <StyledRow>
                    <StyledText>to</StyledText>
                    <StyledDateBox>
                        <DatePicker
                            selected = {selectedDateEnd}
                            onChange={onChangeDateEnd}
                            dateFormat='yyyy/MM/dd'
                            showYearDropdown
                            scrollableMonthYearDropdown
                            customInput={<CustomInput/>}
                        />
                    </StyledDateBox>
                </StyledRow>
            </View>
        </View>
    )

}
