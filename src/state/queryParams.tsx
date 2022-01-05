import React, {createContext, useState} from "react";

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
    endDate : "2021/01/01",
    orderBy : "relevant",
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
