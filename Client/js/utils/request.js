"use strict";
import axios from 'axios';
import {
    getComponentName,
    getCurPid,
    getDateParamAndDispatch
} from "./util";

const CancelToken = axios.CancelToken;
let cancel;
// create axios instance
const instance = axios.create({
    // cancel request
    baseURL: "/usageapi/v1", // api base_url
    timeout: 1000 * 60, // time out time - 1 min
    headers: {
        "Content-Type": "application/json"
    }
});

export function getData(option) {
    let curRoute = option.curRoute;
    let stored = option.stored;
    let state = stored.state;
    let componentName = getComponentName(curRoute);
    let pid = getCurPid(curRoute);
    let curStoredPid = state.pid;
    if (pid !== curStoredPid) {
        stored.dispatch("setProductId", pid);
    }
    let date = getDateParamAndDispatch(componentName, stored);
    if (!date) {
        return this;
    }
    return instance({
        url: `/freqData/${option.name}`,
        method: "get",
        params: {
            pid: pid,
            startDate: date.startDate,
            endDate: date.endDate,
            viewType: state.viewType,
            freq: state.freq
        }
    });
}

export function getProductList(pid) {
    return instance({
        url: "/product_list",
        method: "get",
        params: {
            pid
        }
    });
}

export function getUserInfo(userIdList) {
    return instance({
        cancelToken: new CancelToken((c) => {
            cancel = c;
        }),
        url: '/user_info',
        method: 'POST',
        data: userIdList,
    });
}

export function cancelRequest() {
    if (typeof cancel === 'function') {
        cancel();
    }
}

export function requestExportData(pid, exportData) {
    return instance({
        url: "/export",
        method: "POST",
        params: {
            pid
        },
        data: exportData
    });
}