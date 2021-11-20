import React from 'react';
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react"
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import {Pressable} from "react-native";


interface Props {
    items: string[]
    defaultValue: string
    onChangedValue: (param:string) => void;
}

//TODO treat metrics that are empty, nothing is shown

const StyledView = styled.View`
    width: fit-content;
    display: inline-block;
    border-radius: 100px;
    background-color: #191932;
`

const StyledView2 = styled.View`
    display: inline-block;
    border-radius: 100px;
    background-color: #191932;
`

const StyledPressable = styled.Pressable`
  display: inline-block;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
`

const DropDown = (props: Props) => {
    const {items, defaultValue, onChangedValue} = props;
    const [value, setValue] = React.useState(defaultValue);
    const [open, setOpen] = React.useState(false);

    let itemList:ItemType[] = [];

    for (let item of items) {
        console.log(item)
        let x:ItemType = {label: item, value: item};
        itemList = itemList.concat(x);
    }

    const [itemsMenu, setItemsMenu] = React.useState(itemList);

    let icon: string = "ant-design:heart-filled";

    const ValueChanged = (val:string) => {
        setValue(val);
        onChangedValue(val);
    }

    //TODO figure out where the forced flex comes from
    // if you inspect element, and change the flex direction of the dropdown to be row, the whole page changes flex direction. I AM LOSING MY MIND

    return(
            <DropDownPicker
                items = {itemsMenu}
                open = {open}
                value = {value}
                setOpen = {setOpen}
                setValue = {setValue}
                style = {{backgroundColor: "#191932", borderRadius: 100}}
                containerStyle = {{display: "flex",flexDirection: "row", flexWrap: "nowrap", backgroundColor: "#191932", borderRadius: 100, width: "fit-content", paddingTop: 15, paddingBottom: 15, paddingLeft: 20, paddingRight: 20}}
                textStyle = {{color: "white", fontSize: 15}}
                showArrowIcon = {false}
                showTickIcon = {false}
                dropDownContainerStyle = {{ width: "fit-content", marginTop: 35, borderColor: "transparent"}}
                listItemContainerStyle = {{padding: 10}}
                theme = "DARK"
            />
    )
}


DropDown.defaultProps = {
    items: ["Relevance", "Post Date"],
    defaultValue: "Relevance",
    onChangedValue: () => {}
}

export default DropDown;
