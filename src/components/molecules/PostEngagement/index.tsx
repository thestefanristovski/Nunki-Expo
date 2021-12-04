import React from 'react';
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react"
import EngagementMetric from "../../atoms/EngagementMetric";
import {Pressable} from "react-native";


interface Props {
    metricTitle1:string;
    metricAmount1:string;
    metricTitle2:string;
    metricAmount2:string;
    metricTitle3:string;
    metricAmount3:string;
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
    const {metricTitle1, metricAmount1, metricTitle2, metricAmount2, metricTitle3, metricAmount3, onPress} = props

    //TODO wrap external link in pressable and add post Link to props, define onPress behaviour

    return(
        <EngagementContainer>
            <EngagementMetric metric={metricTitle1} amount={metricAmount1}/>
            <EngagementMetric metric={metricTitle2} amount={metricAmount2}/>
            <EngagementMetric metric={metricTitle3} amount={metricAmount3}/>
            <ExternalLink onPress={onPress}>
                <Icon icon="heroicons-solid:external-link" style={{color:"#6A6A9F", width:20, height:20, verticalAlign:"middle"}} />
            </ExternalLink>
        </EngagementContainer>
    )
}


PostEngagement.defaultProps = {
    metricTitle1: "thumbsup",
    metricTitle2: "thumbsdown",
    metricTitle3: "views",
    metricAmount1: 0,
    metricAmount2: 0,
    metricAmount3: 0,
}

export default PostEngagement;
