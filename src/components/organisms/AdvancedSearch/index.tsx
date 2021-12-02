
import { DividerShortRegular } from 'fluent-icons-react';
import React, {useEffect, useState} from 'react';
import {Button, Pressable, Text} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import DateSet from '../../molecules/DateSet';
import DropDown from "../../molecules/DropDown";
import MultiselectFilterMenu from '../MultiselectFilterMenu';
import KeywordFilterMenu from "../KeywordFilterMenu";


export default function AdvancedSearch() {
    //State: Checkbox test
    const [checkbox, setCheckbox] = useState(["Youtube", "Twitter", "Vimeo", "VK"])
    const [selectedCheckbox, setSelectedCheckbox] = useState(["Youtube", "Twitter", "Vimeo", "VK"])
    //State: Exclude Keywords menu
    const [excludeParams, setExcludeParams] = useState([])

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

    return(

        <StyledView>
            <DropDown backgroundC={"light"}/>
            <DividerShortRegular size={20} color="transparent" />
            <DateSet />
            <DividerShortRegular size={20} color="transparent" />
            <MultiselectFilterMenu title={"Platforms"} options={checkbox} selected={selectedCheckbox} onChanged={changedCheckbox}/>
            <DividerShortRegular size={20} color="transparent"/>
            <KeywordFilterMenu keywords={excludeParams} onAddKeyword={onAddExcludeKeyword} onDelete={onDeleteExcludeKeyword}/>
        </StyledView>



    )


}
