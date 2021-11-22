
import React, {useEffect, useState} from 'react';
import {Button, Pressable, Text} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import DropDown from "../../atoms/DropDown";
import PillMultiselectv2 from '../PillMultiselect';


export default function AdvancedSearch() {

const StyledText  = styled.Text`
    color: white;
    font-size: 17px;
    text-align: center;
    vertical-align: middle;
`;

const [queryParams, setQueryParams] = useState([''])
// List of Elements in Grid
const [videos, setVideos] = useState<any[]>([])
const [columns, setColumns] = useState(2);
//State: Content Type Multiselect Menu
const [contentTypes, setContentTypes] = useState(["Photos", "Videos", "Text"])
const [selectedContentTypes, setSelectedContentTypes] = useState(["Photos", "Videos", "Text"])
//State: Platform Multiselect Menu
const [platforms, setPlatforms] = useState(["Youtube", "Twitter", "Vimeo", "VK"])
const [selectedPlatforms, setSelectedPlatforms] = useState(["Youtube", "Twitter", "Vimeo", "VK"])

    // MULTISELECT MENU LISTENERS =================================================
    //TODO Unite the two functions

    // Listener for changed content type
    const changedContentType = (element: string, another: string):void  => {
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

    // Listener for changed platform
    const changedPlatform = (element: string, another: string):void  => {
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

    return(

        <><StyledText>
            Advanced Search
        </StyledText>
        <PillMultiselectv2 title={"Content Types"} options={contentTypes} selected={selectedContentTypes} onSelected={changedContentType} />
        <PillMultiselectv2 title={"Platforms"} options={platforms} selected={selectedPlatforms} onSelected={changedPlatform} />
        <DropDown /></>  
    )


}