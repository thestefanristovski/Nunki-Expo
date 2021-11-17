import React from 'react';
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react"


interface Props {
    metric: string
    amount: string
}

const StyledView = styled.View`
  display: inline-block;
  vertical-align: middle;
  line-height: 30px;
  padding-right: 50px;
`

const StyledText = styled.Text`
  color: #6A6A9F;
  font-size: 15px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
`

const EngagementMetric = (props: Props) => {
    const {metric, amount} = props;
    let icon: string = "ant-design:heart-filled";
    if (metric == "thumbsup") {
        icon = "ant-design:like-filled"
    } else if (metric == "thumbsdown") {
        icon = "ant-design:dislike-filled"
    } else if (metric == "views") {
        icon = "ant-design:eye-filled"
    } else if (metric == "comments") {
        icon = "fluent:comment-16-filled"
    } else if (metric == "retweets") {
        icon = "fa-solid:retweet"
    }
    return(
        <StyledView>
            <Icon icon={icon} style={{color:"#6A6A9F", width:25, lineHeight:25, display:"inline-block", paddingRight:0, verticalAlign:"middle"}}/>
            <StyledText>{amount}</StyledText>
        </StyledView>
    )
}


EngagementMetric.defaultProps = {
    metric: "likes",
    amount: "0",
}

export default EngagementMetric;
