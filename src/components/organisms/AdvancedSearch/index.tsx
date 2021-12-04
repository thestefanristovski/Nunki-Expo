
import { DividerShortRegular } from 'fluent-icons-react';
import React, {useEffect, useState} from 'react';
import {Button, Pressable, Text, View} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import DateSet from '../../molecules/DateSet';
import DropDown from "../../molecules/DropDown";
import MultiselectFilterMenu from '../MultiselectFilterMenu';
import KeywordFilterMenu from "../KeywordFilterMenu";
import SliderFilterMenu from "../SliderFilterMenu";
import AdvancedSearchRadius from '../../molecules/AdvancedSearchRadius';


export default function AdvancedSearch() {
    //State: Checkbox test
    const [checkbox, setCheckbox] = useState(["Youtube", "Twitter", "Vimeo", "VK"])
    const [selectedCheckbox, setSelectedCheckbox] = useState(["Youtube", "Twitter", "Vimeo", "VK"])
    //For Source Types too
    const [checkboxType, setCheckboxType] = useState(["Photos", "Video", "Text"])
    const [selectedCheckboxType, setSelectedCheckboxType] = useState(["Photos", "Video", "Text"])
    //State: Exclude Keywords menu
    const [excludeParams, setExcludeParams] = useState([])
    //State: Video Length Slider Menu
    const [minLength, setMinLength] = useState(0)
    const [maxLength, setMaxLength] = useState(5)
    //State: Date Picker
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    // EXCLUDE KEYWORDS FILTER METHODS ========================================

    // A keyword needs to be added (submitted with ','
    const onAddExcludeKeyword = async (text: string) => {
        if (text.endsWith(',')) {
            const keyword:string = text.substring(0, text.lastIndexOf(','));
            const keywords:string[] = excludeParams;
            // @ts-ignore
            setExcludeParams(keywords.concat(keyword));
        } else {
            const keywords:string[] = excludeParams;
            // @ts-ignore
            setExcludeParams(keywords.concat(text));
        }
    }

    // A keyword is deleted
    const onDeleteExcludeKeyword = (text:string) => {
        const keywords:string[] = excludeParams;
        // @ts-ignore
        setExcludeParams(keywords.filter(item => item !== text));
    }

    // CHECKBOX METHODS ========================================

    // Listener for changed checkbox
    const changedCheckbox = (element: string, another: string):void  => {
        console.log(element)
        console.log(selectedCheckbox)
        if (selectedCheckbox.includes(element)) {
            setSelectedCheckbox(selectedCheckbox.filter(selectedItem => selectedItem != element));
        } else if (element === "All") {
            setSelectedCheckbox(checkbox);
        } else {
            setSelectedCheckbox(selectedCheckbox.concat(element));
        }
    }

    const changedCheckboxType = (element: string, another: string):void  => {
        console.log(element)
        console.log(selectedCheckboxType)
        if (selectedCheckboxType.includes(element)) {
            setSelectedCheckboxType(selectedCheckboxType.filter(selectedItem => selectedItem != element));
        } else if (element === "All") {
            setSelectedCheckboxType(checkboxType);
        } else {
            setSelectedCheckboxType(selectedCheckboxType.concat(element));
        }
    }

    // LENGTH SLIDER FILTER METHODS ========================================
    const onChangeVideoLength = (min:number, max:number) => {
        setMinLength(min);
        setMaxLength(max);
    }

    // DATE PICKER FILTER METHODS ========================================
    const onChangeDates = (start:string, end:string) => {
        setStartDate(start);
        setEndDate(end);
    }


    const StyledText  = styled.Text`
        color: white;
        font-size: 17px;
        vertical-align: middle;
    `;

    const StyledView = styled.View`
      margin-top: 30px;
      padding: 20px;
      padding-left: 50px;
      background-color: #191932;
      border-radius: 20px;
    `
    const PanelView = styled.View`
        display: flex;
         flex-direction: row;
         flex-wrap: nowrap;
         margin-top: 20px;
         align-self: stretch;
         justify-content: space-between;
    `

    return(

        <StyledView>
            <MultiselectFilterMenu title={"Platforms"} options={checkbox} selected={selectedCheckbox} onChanged={changedCheckbox}/>
            <DividerShortRegular size={20} color="transparent" />
            <MultiselectFilterMenu title={"Content Types"} options={checkboxType} selected={selectedCheckboxType} onChanged={changedCheckboxType}/>
            <DividerShortRegular size={20} color="transparent"/>
            <KeywordFilterMenu keywords={excludeParams} onAddKeyword={onAddExcludeKeyword} onDelete={onDeleteExcludeKeyword}/>
            <SliderFilterMenu min={0} defaultMin={minLength} max={10} defaultMax={maxLength} onChangeLength={onChangeVideoLength}/>
            <DividerShortRegular size={20} color="transparent" />
            <DateSet defaultStart={"2021-12-01T13:24:00"} defaultEnd={"2020-12-17T13:24:00"} title={"Post Date"} onChangeDates={onChangeDates}/>
            <DividerShortRegular size={30} color="transparent" />
            <DropDown backgroundC={"light"}/>
        </StyledView>



    )


}
