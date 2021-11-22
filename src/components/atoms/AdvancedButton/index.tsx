import React from 'react';
import {Button, Pressable, Text} from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import {Icon} from "@iconify/react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Advanced from "../../../pages/Advanced";
import Demo from "../../../pages/Demo";

interface Props {
    onPress: () => void;
}

//TODO: Hover behavior of button (see react-native-web-hover)

const StyledPressable = styled.Pressable`
  background-color: transparent;
  line-height: 2px;
  padding: 5px 2px;
  vertical-align: left;
`

const AdvancedButton = (props: Props) => {
    const { onPress} = props;
    return(
        <Router>
                  <Link to={'/'}>
                     <Icon icon={"fluent:options-16-filled"} style={{height: 30, width:30, color:"#6083FF", marginRight: 5, marginLeft:10, verticalAlign: "middle"}}/>
                  </Link>
            <Routes>
                 <Route path="/advanced" element={<Advanced />} />
            </Routes>
        </Router>



    )
}


AdvancedButton.defaultProps = {
    onPress: ()=> {},
}

export default AdvancedButton;
