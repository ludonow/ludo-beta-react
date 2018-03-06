export const cardSystemLinkInfoList = [
    {
        text: "遊戲廣場",
        url: "cardList"
    },
    {
        text: "看看範例",
        url: "cardList?stage=0"
    },
    {
        text: "開啟新局",
        url: "create"
    }
];

export const getMyCardListLinkInfoList = (myCardListLinkInfoSampleList, currentUserId) => {
    const myCardListLinkInfoList = myCardListLinkInfoSampleList.map(info => ({
        ...info,
        url: info.url + currentUserId,
    }));

    return myCardListLinkInfoList;
}

export const getSettingLinkInfoList = chatFuelId => {
    const settingLinkInfoListForUserHasBoundMessenger = [
        {
            text: "使用教學",
            url: "tutorial"
        },
        {
            isExternal: true,
            text: "提供意見",
            url: "https://m.me/ludonow?ref=%E5%B0%88%E4%BA%BA%E6%9C%8D%E5%8B%99"
        }
    ];

    const settingLinkInfoListForUserHasNotBoundMessenger = [
        {
            text: "使用教學",
            url: "tutorial"
        },
        {
            text: "接收即時通知",
            url: "bind"
        },
        {
            isExternal: true,
            text: "提供意見",
            url: "https://m.me/ludonow?ref=%E5%B0%88%E4%BA%BA%E6%9C%8D%E5%8B%99"
        }
    ];

    return (!!chatFuelId) ? settingLinkInfoListForUserHasBoundMessenger : settingLinkInfoListForUserHasNotBoundMessenger;
}
