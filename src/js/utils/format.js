export function getCorrectFormatOfRequestLudoInfo(requestLudoInfo) {
    if (Array.isArray(requestLudoInfo.tags)) {
        return {
            ...requestLudoInfo,
            tags: requestLudoInfo.tags.join(),
        };
    } else {
        return requestLudoInfo;
    }
}

export function getCorrectFormatOfResponseLudoInfo(responseLudoInfo) {
    if (Array.isArray(responseLudoInfo.tags)) {
        return responseLudoInfo;
    } else {
        return {
            ...responseLudoInfo,
            tags: responseLudoInfo.tags.split(','),
        };
    }
}
