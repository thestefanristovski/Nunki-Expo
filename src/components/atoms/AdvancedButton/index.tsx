import React from 'react';
import {Button, Pressable, Text} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";


const AdvancedButton = () => {
    return(
            <Link to = "/advanced"><Icon icon={"fluent:options-16-filled"} style={{height: 40, width:40, color:"white", marginRight: 5, marginLeft:5, verticalAlign: "middle"}}/></Link>
    )
}

export default AdvancedButton;
