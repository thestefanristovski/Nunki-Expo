import React from 'react';
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react"


interface Props {
    metric: string
    amount: string
}

const MetricContainer = styled.View`
  display: inline-block;
  vertical-align: middle;
  line-height: 30px;
  padding-right: 50px;
`

const MetricText = styled.Text`
  color: #6A6A9F;
  font-size: 13px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
`

//TODO treat metrics that are empty, nothing is shown

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

    //format likes and dislikes
    const SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"];

    function abbreviateNumber(number:number){

        // what tier? (determines SI symbol)
        const tier = Math.log10(Math.abs(number)) / 3 | 0;

        // if zero, we don't need a suffix
        if(tier == 0) return number;

        // get suffix and determine scale
        const suffix = SI_SYMBOL[tier];
        const scale = Math.pow(10, tier * 3);

        // scale the number
        const scaled = number / scale;

        // format number and add suffix
        return scaled.toFixed(1) + suffix;
    }

    return(
        <MetricContainer>
            <Icon icon={icon} style={{color:"#6A6A9F", width:25, lineHeight:25, display:"inline-block", paddingRight:0, verticalAlign:"middle"}}/>
            <MetricText>{abbreviateNumber(Number(amount))}</MetricText>
        </MetricContainer>
    )
}


EngagementMetric.defaultProps = {
    metric: "likes",
    amount: "0",
}

export default EngagementMetric;
