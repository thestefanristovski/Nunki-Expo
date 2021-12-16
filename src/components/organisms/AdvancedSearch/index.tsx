
import { DividerShortRegular } from 'fluent-icons-react';
import React, {useEffect, useState} from 'react';
import {Button, Pressable, Text, View} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import DateFilterMenu from '../../molecules/DateFilterMenu';
import DropDown from "../../molecules/DropDown";
import MultiselectFilterMenu from '../MultiselectFilterMenu';
import KeywordFilterMenu from "../KeywordFilterMenu";
import SliderFilterMenu from "../SliderFilterMenu";
import AdvancedSearchRadius from '../../molecules/AdvancedSearchRadius';


export default function AdvancedSearch() {
    //State: Checkbox test
    const [platforms, setPlatforms] = useState(["Youtube", "Twitter", "Vimeo", "VK"])
    const [selectedPlatforms, setSelectedPlatforms] = useState(["Youtube", "Twitter", "Vimeo", "VK"])
    //For Source Types too
    const [contentTypes, setContentTypes] = useState(["Photos", "Video", "Text"])
    const [selectedContentTypes, setSelectedContentTypes] = useState(["Photos", "Video", "Text"])
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
        console.log(selectedPlatforms)
        if (selectedPlatforms.includes(element)) {
            setSelectedPlatforms(selectedPlatforms.filter(selectedItem => selectedItem != element));
        } else if (element === "All") {
            setSelectedPlatforms(platforms);
        } else {
            setSelectedPlatforms(selectedPlatforms.concat(element));
        }
    }

    const changedCheckboxType = (element: string, another: string):void  => {
        console.log(element)
        console.log(selectedContentTypes)
        if (selectedContentTypes.includes(element)) {
            setSelectedContentTypes(selectedContentTypes.filter(selectedItem => selectedItem != element));
        } else if (element === "All") {
            setSelectedContentTypes(contentTypes);
        } else {
            setSelectedContentTypes(selectedContentTypes.concat(element));
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

    const AdvancedContainer = styled.View`
      margin-top: 30px;
      padding: 20px;
      padding-left: 50px;
      background-color: #191932;
      border-radius: 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: space-around;
      gap: 60px;
    `


    return(

        <AdvancedContainer>
            <MultiselectFilterMenu title={"Platforms"} options={platforms} selected={selectedPlatforms} onChanged={changedCheckbox}/>
            <MultiselectFilterMenu title={"Content Types"} options={contentTypes} selected={selectedContentTypes} onChanged={changedCheckboxType}/>
            <KeywordFilterMenu keywords={excludeParams} onAddKeyword={onAddExcludeKeyword} onDelete={onDeleteExcludeKeyword}/>
            <SliderFilterMenu min={0} defaultMin={minLength} max={10} defaultMax={maxLength} onChangeLength={onChangeVideoLength}/>
            <DateFilterMenu defaultStart={"2021-12-01T13:24:00"} defaultEnd={"2020-12-17T13:24:00"} title={"Post Date"} onChangeDates={onChangeDates}/>
            <DropDown backgroundC={"light"}/>
        </AdvancedContainer>



    )


}
