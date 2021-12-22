import {createContext} from "react";

const defaultQueryParams = {
    platforms : ["Youtube", "Twitter", "Vimeo", "VK"],
    selectedPlatforms : ["Youtube", "Twitter", "Vimeo", "VK"],
    contentTypes : ["Photos", "Video", "Text"],
    selectedContentTypes : ["Photos", "Video", "Text"],
    excludedKeywords : [],
    minLength : 0,
    maxLength : 30,
    startDate : "2021-12-01T13:24:00",
    endDate : "2020-12-17T13:24:00"
}

const queryParamsContext = createContext(defaultQueryParams);
export default queryParamsContext;
