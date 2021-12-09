import React from 'react';
// @ts-ignore
import styled from "styled-components/native";
import ClusterPill from '../../atoms/ClusterPill';
import {View} from "react-native";

interface Props {
    title: string;
    options: string[],
    selected: string[]
    onSelected: (element:string, another:string) => void;
}

const MultiselectPillContainer = styled.View`
  display: inline-block;
  margin-left: 30px;
`

const FilterTitle = styled.Text`
  color: white;
  font-size: 15px;
  padding: 10px 0;
  margin-bottom: 10px;
  margin-left: 30px;
`

const ClusterMenu = (props: Props) => {
    const {title, options, selected, onSelected} = props

    if (selected.length === options.length) {
        return(
            <View>
                {<FilterTitle>{title}</FilterTitle> }
                <MultiselectPillContainer>
                    {options.map((element) => {
                        if (selected.includes(element)) {
                            return (<ClusterPill title={element} onPress={onSelected} statusActive={"active"}/>)
                        } else {
                            return (<ClusterPill title={element} onPress={onSelected} statusActive={"inactive"}/>)
                        }
                    })}
                </MultiselectPillContainer>
            </View>

        )
    } else {
        return(
            <View>
                {<FilterTitle>{title}</FilterTitle> }
                <MultiselectPillContainer>
                    {options.map((element) => {
                        if (selected.includes(element)) {
                            return (<ClusterPill title={element} onPress={onSelected} statusActive={"active"}/>)
                        } else {
                            return (<ClusterPill title={element} onPress={onSelected} statusActive={"inactive"}/>)
                        }
                    })}
                </MultiselectPillContainer>
            </View>
        )
    }


}

ClusterMenu.defaultProps = {
    title: "Topics related to your search",
    options: ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
    selected: ["Topic 1", "Topic 2", "Topic 3", "Topic 4"]
}

export default ClusterMenu;
