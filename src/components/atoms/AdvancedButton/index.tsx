import React from 'react';
import {Button, Pressable, Text} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import IconButton from "../../atoms/IconButton";



const AdvancedButton = () => {
    return(
            <><Link to="/advanced"><IconButton icon={"fluent:options-16-filled"} onPress={function (): void { } } /></Link>
            <Link to="/stats"><IconButton icon={"ion:stats-chart"} onPress={function (): void { } } /></Link></>
            )
}

export default AdvancedButton;
