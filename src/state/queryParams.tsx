import React, {createContext, useState} from "react";
import {format} from "date-fns";

const defaultQueryParams = {
    platforms : ["Youtube", "Twitter", "Vimeo", "VK"],
    selectedPlatforms : ["Youtube", "Twitter", "Vimeo", "VK"],
    contentTypes : ["Image", "Video", "Text"],
    selectedContentTypes : ["Image", "Video", "Text"],
    excludedKeywords : [],
    anyKeywords: [],
    minLength : 0,
    maxLength : 30,
    startDate : '2020/01/01',
    endDate :  format(new Date(), 'yyyy/MM/dd'),
    orderBy : "recent",
    lat: "",
    long: "",
    radius: "",
    mapFeature: "",
    updateParams : (p:any) => {}
}

export const queryParamsContext = createContext(defaultQueryParams);

export const QueryParamsProvider = (props:any) => {
    const [parameters, setParameters] = useState(defaultQueryParams)

    const updateParams = (params:any) => {
        setParameters(params)
    }

    const value = {parameters, updateParams}

    return (
        // @ts-ignore
        <queryParamsContext.Provider value={value}>
            {props.children}
        </queryParamsContext.Provider>
    )


}
