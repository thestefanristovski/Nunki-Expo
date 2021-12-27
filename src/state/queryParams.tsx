import React, {createContext, useState} from "react";

const defaultQueryParams = {
    platforms : ["Youtube", "Twitter", "Vimeo", "VK"],
    selectedPlatforms : ["Youtube", "Twitter", "Vimeo", "VK"],
    contentTypes : ["Photos", "Video", "Text"],
    selectedContentTypes : ["Photos", "Video", "Text"],
    excludedKeywords : [],
    anyKeywords: [],
    minLength : 0,
    maxLength : 30,
    startDate : "2021-12-01T13:24:00",
    endDate : "2020-12-17T13:24:00",
    orderBy : "relevant",
    updateParams : (p:any) => {}
}

export const queryParamsContext = createContext(defaultQueryParams);

export const QueryParamsProvider = (props:any) => {
    const [parameters, setParameters] = useState(defaultQueryParams)

    const updateParams = (params:any) => {
        console.log("I'm hereeee")
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
