import React from 'react';
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react"
// @ts-ignore
import DropdownMenu from "../../atoms/DropDownMenu"
import {Pressable, View} from "react-native";


interface Props {
    items: string[]
    defaultValue: string
    onChangedValue: (param:string) => void;
    backgroundC: string
}

//TODO treat metrics that are empty, nothing is shown

const DropDownMenuContainer = styled.View`
    width: 120px;
    display: inline-block;
    border-radius: 100px;
    background-color: #191932;
`

const DropDownContainer = styled.View`
    display: inline-block;
`

const DropDownTitle = styled.Text`
  color: white;
  font-size: 14px;
  padding: 10px 0;
  margin-right: 20px;
`

const DropDown = (props: Props) => {

    const {items, onChangedValue, backgroundC} = props;
    let color = "#191932"

    if (backgroundC !== "dark") {
        color = "#111121"
    }

    return(
            <DropDownContainer>
                <DropDownTitle>Order by:</DropDownTitle>
                <DropDownMenuContainer>
                    <DropdownMenu
                        style={{flex: 1, borderRadius: 100}}
                        bgColor={color}
                        tintColor={'white'}
                        activityTintColor={'white'}
                        // arrowImg={}
                        // checkImage={}
                        optionTextStyle={{color: 'red'}}
                        titleStyle={{color: 'red'}}
                        // maxHeight={300}
                        handler={(selection:string, row:number) => onChangedValue(selection)}
                        data={[items]}
                    />
                </DropDownMenuContainer>
            </DropDownContainer>
    )
}


DropDown.defaultProps = {
    items: ["Relevance", "Post Date"],
    defaultValue: "Relevance",
    onChangedValue: () => {},
    backgroundC: "dark"
}

export default DropDown;
