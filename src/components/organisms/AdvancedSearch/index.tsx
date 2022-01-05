// @ts-nocheck
import React, {useContext} from 'react';
import {View} from "react-native";
import styled from "styled-components/native";
import DateFilterMenu from '../../molecules/DateFilterMenu';
import DropDown from "../../molecules/DropDown";
import MultiselectFilterMenu from '../MultiselectFilterMenu';
import KeywordFilterMenu from "../KeywordFilterMenu";
import SliderFilterMenu from "../SliderFilterMenu";
import {queryParamsContext} from "../../../state/queryParams";


const Advanced = () => {

    const context = useContext(queryParamsContext)

    // EXCLUDE KEYWORDS FILTER METHODS ========================================

    // A keyword needs to be added (submitted with ','
    const onAddExcludeKeyword = (text: string) => {
        if (text.endsWith(',')) {
            const keyword:string = text.substring(0, text.lastIndexOf(','));
            const keywords:string[] = [...context.parameters.excludedKeywords];
            let p = {...context.parameters}
            keywords.push(keyword);
            p.excludedKeywords = keywords;
            context.updateParams(p)
        } else {
            const keywords:string[] = [...context.parameters.excludedKeywords];
            let p = {...context.parameters}
            p.excludedKeywords = keywords.concat(text)
            context.updateParams(p)
        }
    }

    // A keyword is deleted
    const onDeleteExcludeKeyword = (text:string) => {
        const keywords:string[] = context.parameters.excludedKeywords;

        let p = {...context.parameters}
        p.excludedKeywords = keywords.filter(item => item !== text)
        context.updateParams(p)

    }

    // CHECKBOX METHODS ========================================

    // Listener for changed checkbox
    const changedCheckbox = (element: string, another: string):void  => {
        if (context.parameters.selectedPlatforms.includes(element)) {
            let p = {...context.parameters}
            p.selectedPlatforms = context.parameters.selectedPlatforms.filter(selectedItem => selectedItem != element)
            context.updateParams(p)
        } else if (element === "All") {
            let p = {...context.parameters}
            p.selectedPlatforms = context.parameters.platforms
            context.updateParams(p)
        } else {
            let p = {...context.parameters}
            p.selectedPlatforms = context.parameters.selectedPlatforms.concat(element)
            context.updateParams(p)
        }
    }

    const changedCheckboxType = (element: string, another: string):void  => {
        if (context.parameters.selectedContentTypes.includes(element)) {
            let p = {...context.parameters}
            p.selectedContentTypes = context.parameters.selectedContentTypes.filter(selectedItem => selectedItem != element)
            context.updateParams(p)
        } else if (element === "All") {
            let p = {...context.parameters}
            p.selectedContentTypes = context.parameters.contentTypes
            context.updateParams(p)
        } else {
            let p = {...context.parameters}
            p.selectedContentTypes = context.parameters.selectedContentTypes.concat(element)
            context.updateParams(p)
        }
    }

    // LENGTH VIDEO FILTER METHODS ========================================
    const onChangeVideoLength = (min:number, max:number) => {
        let p = {...context.parameters}
        p.minLength = min;
        p.maxLength = max;
        context.updateParams(p)
    }

    // DATE PICKER FILTER METHODS ========================================
    const onChangeDates = (start:string, end:string) => {
        let p = {...context.parameters}
        console.log("S")
        console.log(start)
        console.log("E")
        console.log(end)
        p.startDate = start;
        p.endDate = end;
        context.updateParams(p)
    }

    // DROPDOWN ORDER BY MENU LISTENER =============================================
    const OrderBy = ['relevant', 'recent', 'popular']
    const changedOrderBy = (element: number) => {
        //State: Order by Menu
        let p = {...context.parameters}
        p.orderBy = OrderBy[element]
        context.updateParams(p)
    }

    //CSS

    const StyledText  = styled.Text`
        color: white;
        font-size: 17px;
        vertical-align: middle;
    `;

    const AdvancedContainer = styled.View`
      background-color: #191932;
      border-radius: 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: space-around;
      gap: 60px;
      margin-bottom: 20px;
    `

    return(
        <View style={{backgroundColor: "#191932", borderRadius: 20, marginTop: 30, padding: 20, paddingLeft: 50}}>
            <AdvancedContainer>
                <MultiselectFilterMenu title={"Platforms"} options={context.parameters.platforms} selected={context.parameters.selectedPlatforms} onChanged={changedCheckbox}/>
                <MultiselectFilterMenu title={"Content Types"} options={context.parameters.contentTypes} selected={context.parameters.selectedContentTypes} onChanged={changedCheckboxType}/>
                <KeywordFilterMenu keywords={context.parameters.excludedKeywords} onAddKeyword={onAddExcludeKeyword} onDelete={onDeleteExcludeKeyword}/>
                <DateFilterMenu defaultStart={context.parameters.startDate} defaultEnd={context.parameters.endDate} title={"Post Date"} onChangeDates={onChangeDates}/>
            </AdvancedContainer>
            <DropDown backgroundC={"light"} onChangedValue={changedOrderBy}/>
        </View>
    )
}

export default Advanced
