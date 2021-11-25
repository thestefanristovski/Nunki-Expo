
import { DividerShortRegular } from 'fluent-icons-react';
import React, {useEffect, useState} from 'react';
import {Button, Pressable, Text} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import DateSet from '../../molecules/DateSet';
import DropDown from "../../molecules/DropDown";
import MultiselectFilterMenu from '../MultiselectFilterMenu';
import PillMultiselect from '../PillMultiselect';


export default function AdvancedSearch() {

const StyledText  = styled.Text`
    color: white;
    font-size: 17px;
    text-align: center;
    vertical-align: middle;
`;

    return(

        <><>
        <DividerShortRegular size={10} color="transparent" />
        <StyledText>
            Advanced Search
        </StyledText>
            <DividerShortRegular size={10} color="transparent" />
            <MultiselectFilterMenu />
            <DividerShortRegular size={40} color="transparent" />
            <DropDown /></>
            <DividerShortRegular size={40} color="transparent" />
            <DateSet /></>
            
    )


}