
import { DividerShortRegular } from 'fluent-icons-react';
import React, {forwardRef, useEffect, useState} from 'react';
import {Button, Pressable, Text, View, TextInput} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
// @ts-ignore
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {format} from "date-fns";



interface Props {
    title: string;
    defaultStart: string;
    defaultEnd: string;
    onChangeDates: (start: string, end: string) => void
}


const DateDescription  = styled.Text`
    color: white;
    display: inline-block;
    font-size: 14px;
    text-align: left;
    vertical-align: middle;
`;

const StyledDateRow = styled.View`
  display: inline-block;
  margin-top: 10px;
`

const StyledDateBox = styled.View`
  display: inline-block;
  margin-left: 20px;
  width: 150px;
`

const FilterTitle = styled.Text`
  color: white;
  font-size: 20px;
  padding: 10px 0;
  margin-bottom: 10px;
`


export default function DateFilterMenu(props: Props) {
    const{title, defaultStart, defaultEnd, onChangeDates} = props;

    const[selectedDateStart, setSelectedDateStart] = useState(new Date(defaultStart));
    const[selectedDateEnd, setSelectedDateEnd] = useState(new Date(defaultEnd));

    // @ts-ignore
    const DateButton = forwardRef<Button>(({ value, onClick }, ref) => (
        <Button title={value}  color={"#111121"} onPress={onClick} ref={ref}/>
    ));

    const onChangeDateStart = (date:Date) => {
        setSelectedDateStart(date)
        onChangeDates(format(date, 'yyyy/MM/dd'), format(selectedDateEnd, 'yyyy/MM/dd'))
    }

    const onChangeDateEnd = (date:Date) => {
        setSelectedDateEnd(date)
        onChangeDates(format(selectedDateStart, 'yyyy/MM/dd'), format(date, 'yyyy/MM/dd'))
    }

    return(
        <View>
            <FilterTitle>{title}</FilterTitle>
            <View>
                <StyledDateRow>
                    <DateDescription>from</DateDescription>
                    <StyledDateBox>
                        <DatePicker
                            selected = {selectedDateStart}
                            onChange={onChangeDateStart}
                            dateFormat='yyyy/MM/dd'
                            withPortal
                            customInput={<DateButton/>}
                        />
                    </StyledDateBox>
                </StyledDateRow>
                <StyledDateRow>
                    <DateDescription>to</DateDescription>
                    <StyledDateBox>
                        <DatePicker
                            selected = {selectedDateEnd}
                            onChange={onChangeDateEnd}
                            dateFormat='yyyy/MM/dd'
                            withPortal
                            customInput={<DateButton/>}
                        />
                    </StyledDateBox>
                </StyledDateRow>
            </View>
        </View>
    )

}
