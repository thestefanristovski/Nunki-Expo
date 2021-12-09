import React from 'react';
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react"
import EngagementMetric from "../../atoms/EngagementMetric";
import {Pressable} from "react-native";


interface Props {
    metricTitles:string[];
    metricAmounts:string[];
    onPress: ()=> void;
}

const ExternalLink = styled.TouchableOpacity`
  display: inline-block;
  margin-left: 50px;
  vertical-align: middle;
`

const EngagementContainer = styled.View`
  display: inline-block;
  vertical-align: middle;
  line-height: 30px;
`

const StyledText = styled.Text`
  color: black;
  font-size: 15px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  padding: 0px 5px;
`

const PostEngagement = (props: Props) => {
    const {metricTitles, metricAmounts, onPress} = props

    //TODO wrap external link in pressable and add post Link to props, define onPress behaviour

    return(
        <EngagementContainer>
            {metricTitles.map((val, i) => {
                return <EngagementMetric metric={val} amount={metricAmounts[i]}/>
            })}
            <ExternalLink onPress={onPress}>
                <Icon icon="heroicons-solid:external-link" style={{color:"#6A6A9F", width:20, height:20, verticalAlign:"middle"}} />
            </ExternalLink>
        </EngagementContainer>
    )
}


PostEngagement.defaultProps = {
    metricTitles: ['views', 'thumbsup', "thumbsdown"],
    metricAmounts: ["0", "0", "0"]
}

export default PostEngagement;
