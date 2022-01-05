import React from 'react';
// @ts-ignore
import styled from "styled-components/native";
import MultiPill from '../../atoms/MultiPill';
import {View} from "react-native";

interface Props {
    title: string;
    options: string[];
    selected: string[];
    onSelected: (element:string, another:string) => void;
}

const MultiselectPillContainer = styled.View`
  display: inline-block;
  //margin-left: 30px;
`

const FilterTitle = styled.Text`
  color: white;
  font-size: 20px;
  padding: 10px 0;
  margin-bottom: 10px;
  margin-left: 30px;
`

const PillMultiselect = (props: Props) => {
    const {title, options, selected, onSelected} = props

    if (selected.length === options.length) {
        return(
            <View>
                {title!=="" && <FilterTitle>{title}</FilterTitle> }
                <MultiselectPillContainer>
                    <MultiPill title={"All"} onPress={onSelected} statusActive={"active"}/>
                    {options.map((element) => {
                        if (selected.includes(element)) {
                            return (<MultiPill key={element} title={element} onPress={onSelected} statusActive={"active"}/>)
                        } else {
                            return (<MultiPill key={element} title={element} onPress={onSelected} statusActive={"inactive"}/>)
                        }
                    })}
                </MultiselectPillContainer>
            </View>

        )
    } else {
        return(
            <View>
                {title!=="" && <FilterTitle>{title}</FilterTitle> }
                <MultiselectPillContainer>
                    <MultiPill title={"All"} onPress={onSelected} statusActive={"inactive"}/>
                    {options.map((element) => {
                        if (selected.includes(element)) {
                            return (<MultiPill title={element} onPress={onSelected} statusActive={"active"}/>)
                        } else {
                            return (<MultiPill title={element} onPress={onSelected} statusActive={"inactive"}/>)
                        }
                    })}
                </MultiselectPillContainer>
            </View>
        )
    }


}

PillMultiselect.defaultProps = {
    title: "",
    options: ["Youtube", "Twitter", "Vimeo", "VK"],
    selected: ["Youtube", "Twitter", "Vimeo", "VK"]
}

export default PillMultiselect;
