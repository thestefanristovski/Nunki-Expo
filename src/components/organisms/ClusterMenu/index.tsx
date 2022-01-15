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

const ClusterMenuContainer = styled.View`
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

    return(
        <View>
            <FilterTitle>{title}</FilterTitle>
            <ClusterMenuContainer>
                {options.map((element) => {
                    if (selected.includes(element)) {
                        return (<ClusterPill title={element} onPress={onSelected} statusActive={"active"}/>)
                    } else {
                        return (<ClusterPill title={element} onPress={onSelected} statusActive={"inactive"}/>)
                    }
                })}
            </ClusterMenuContainer>
        </View>
    )


}

ClusterMenu.defaultProps = {
    title: "Related topics found in the results",
    options: ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
    selected: ["Topic 1", "Topic 2", "Topic 3", "Topic 4"]
}

export default ClusterMenu;
