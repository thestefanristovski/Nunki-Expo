
import { DividerShortRegular } from 'fluent-icons-react';
import React, {useContext, useEffect, useState} from 'react';
import {Button, Pressable, Text, View} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import DateFilterMenu from '../../molecules/DateFilterMenu';
import DropDown from "../../molecules/DropDown";
import MultiselectFilterMenu from '../MultiselectFilterMenu';
import KeywordFilterMenu from "../KeywordFilterMenu";
import SliderFilterMenu from "../SliderFilterMenu";
import AdvancedSearchRadius from '../../molecules/AdvancedSearchRadius';
import queryParamsContext from "../../../state/queryParams";


export default function AdvancedSearch() {

    const params = useContext(queryParamsContext)
    const [parameters, setParameters] = useState(params);

    // EXCLUDE KEYWORDS FILTER METHODS ========================================

    // A keyword needs to be added (submitted with ','
    const onAddExcludeKeyword = (text: string) => {
        if (text.endsWith(',')) {
            const keyword:string = text.substring(0, text.lastIndexOf(','));
            const keywords:string[] = [...parameters.excludedKeywords];
            let p = {...parameters}
            keywords.push(keyword);
            // @ts-ignore
            p.excludedKeywords = keywords;
            console.log(p);
            setParameters(p)
            //setExcludeParams(keywords.concat(keyword));
        } else {
            const keywords:string[] = parameters.excludedKeywords;
            // @ts-ignore
            let p = {...parameters}
            // @ts-ignore
            p.excludedKeywords = keywords.concat(text)
            setParameters(p)
        }
    }

    // A keyword is deleted
    const onDeleteExcludeKeyword = (text:string) => {
        const keywords:string[] = parameters.excludedKeywords;

        let p = {...parameters}
        // @ts-ignore
        p.excludedKeywords = keywords.filter(item => item !== text)
        setParameters(p)

    }

    // CHECKBOX METHODS ========================================

    // Listener for changed checkbox
    const changedCheckbox = (element: string, another: string):void  => {
        if (parameters.selectedPlatforms.includes(element)) {
            let p = {...parameters}
            // @ts-ignore
            p.selectedPlatforms = parameters.selectedPlatforms.filter(selectedItem => selectedItem != element)
            setParameters(p)
        } else if (element === "All") {
            let p = {...parameters}
            // @ts-ignore
            p.selectedPlatforms = parameters.platforms
            setParameters(p)
        } else {
            let p = {...parameters}
            // @ts-ignore
            p.selectedPlatforms = parameters.selectedPlatforms.concat(element)
            setParameters(p)
        }
    }

    const changedCheckboxType = (element: string, another: string):void  => {
        if (parameters.selectedContentTypes.includes(element)) {
            let p = {...parameters}
            // @ts-ignore
            p.selectedContentTypes = parameters.selectedContentTypes.filter(selectedItem => selectedItem != element)
            setParameters(p)
        } else if (element === "All") {
            let p = {...parameters}
            // @ts-ignore
            p.selectedContentTypes = parameters.contentTypes
            setParameters(p)
        } else {
            let p = {...parameters}
            // @ts-ignore
            p.selectedContentTypes = parameters.selectedContentTypes.concat(element)
            setParameters(p)
        }
    }

    // LENGTH SLIDER FILTER METHODS ========================================
    const onChangeVideoLength = (min:number, max:number) => {
        let p = {...parameters}
        // @ts-ignore
        p.minLength = min;
        p.maxLength = max;
        setParameters(p)
    }

    // DATE PICKER FILTER METHODS ========================================
    const onChangeDates = (start:string, end:string) => {
        let p = {...parameters}
        // @ts-ignore
        p.startDate = start;
        p.endDate = end;
        setParameters(p)
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
            <MultiselectFilterMenu title={"Platforms"} options={parameters.platforms} selected={parameters.selectedPlatforms} onChanged={changedCheckbox}/>
            <MultiselectFilterMenu title={"Content Types"} options={parameters.contentTypes} selected={parameters.selectedContentTypes} onChanged={changedCheckboxType}/>
            <KeywordFilterMenu keywords={parameters.excludedKeywords} onAddKeyword={onAddExcludeKeyword} onDelete={onDeleteExcludeKeyword}/>
            <SliderFilterMenu min={0} defaultMin={parameters.minLength} max={10} defaultMax={parameters.maxLength} onChangeLength={onChangeVideoLength}/>
            <DateFilterMenu defaultStart={parameters.startDate} defaultEnd={parameters.endDate} title={"Post Date"} onChangeDates={onChangeDates}/>
            <DropDown backgroundC={"light"}/>
        </AdvancedContainer>



    )


}
