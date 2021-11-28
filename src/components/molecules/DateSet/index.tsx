
import { DividerShortRegular } from 'fluent-icons-react';
import React, {useEffect, useState} from 'react';
import {Button, Pressable, Text, View, TextInput} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'



export default function DateSet() {

const StyledText  = styled.Text`
    color: white;
    font-size: 20px;
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

    const[selectedDate, setSelectedDate] = useState(null);
    const[selectedDate2, setSelectedDate2] = useState(null);

    return(
        <>
        <StyledText>
            Post Date
        </StyledText>
            <DividerShortRegular size={20} color="transparent" />
                <StyledTextDisplay>
                    from
                </StyledTextDisplay>
                <DatePicker 
                selected = {selectedDate} 
                onChange={date=>setSelectedDate(date)}
                dateFormat='yyyy/MM/dd'
                showYearDropdown
                scrollableMonthYearDropdown
                placeholderText = "Enter a date"
                />
                <DividerShortRegular size={10} color="transparent" />
                    <StyledTextDisplay>
                         to
                    </StyledTextDisplay>
                <DatePicker 
                selected = {selectedDate2} 
                onChange={date2=>setSelectedDate2(date2)}
                dateFormat='yyyy/MM/dd'
                showYearDropdown
                scrollableMonthYearDropdown
                placeholderText = "Enter a date"
                />
            
        </>
    )

}