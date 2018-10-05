"use strict";
import { MBG } from "mbg";
const Grid = MBG;

export function setPid() {
    let stored = this.$store;
    let pid = this.$route.name.split("_")[0];
    let curStoredPid = stored.state.pid;
    if (pid !== curStoredPid) {
        stored.dispatch("setProductId", pid);
    }
}

export function columnWidthHandler(data) {
    let columns = data.columns;
    for (let c of columns) {
        let id = c.id;
        if (id === "name") {
            c.width = 200;
        } else if (id === "api_type") {
            c.width = 180;
        } else {
            if (id === "frequency") {
                c.dataType = "string";
            }
            c.width = 160;
        }
    }
    return data;
}

export function getComponentName(curRoute) {
    return curRoute
        .split("_")
        .slice(1)
        .join("_");
}

export function getCurPid(curRoute) {
    let routeName = curRoute.split("_");
    let pid = routeName[0].slice(1);
    return pid;
}

export function getDateParamAndDispatch(componentName, $stored) {
    let state = $stored.state;
    let pid = state.pid;
    const componentSetting = state[pid][componentName];
    if (componentSetting === undefined) {
        return;
    }
    // console.log(pid, componentName, componentSetting);
    let startDate = componentSetting.startDate;
    let endDate = componentSetting.endDate;
    if (!startDate) {
        startDate = state.defaultDateValue[0];
    }
    if (!endDate) {
        endDate = state.defaultDateValue[1];
    }
    // TODO Duplicated!!!
    $stored.dispatch("setCurStartDate", startDate);
    $stored.dispatch("setCurEndDate", endDate);

    return {
        startDate: startDate,
        endDate: endDate
    };
}

export function hideLoadingIcon(loadingIcon) {
    loadingIcon.style.display = "none";
}

export function showLoadingIcon(loadingIcon) {
    loadingIcon.style.display = "block";
}

export function hideErrorInfo(errorInfoIcon) {
    errorInfoIcon.style.display = "none";
}

export function showErrorInfo(errorInfoIcon) {
    errorInfoIcon.style.display = "block";
    errorInfoIcon.style.zIndex = "100";
}

export function addOnePxBorder(target) {
    if (target) {
        target.classList.add("border_1px");
    }
}

export function removeOnePxBorder(target) {
    if (!target) {
        return;
    }
    let classList = target.classList;
    if (classList && classList.indexOf("border_1px") !== -1) {
        target.classList.remove("border_1px");
    }
}

export function bindTreeGridEvent(treeGrid, $stored) {
    treeGrid.bind("onClick onDblClick", (e, d) => {
        let pid = $stored.state.pid;
        if (pid === "cloud") {
            $stored.dispatch("setCloudActiveRow", 3);
        } else if (pid === "aa") {
            $stored.dispatch("setAAActiveRow", 1);
        } else if (pid === "pa") {
            $stored.dispatch("setPAActiveRow", 1);
        }
    });
    jQuery(window).resize(() => {
        treeGrid.resize();
    });
}

export function createContainerGrid(container) {
    let containerGrid = jQuery(container + "").css({
        width: "100%",
        height: "100%",
        padding: "13px"
    });
    let grid = null;
    if (!grid) {
        grid = new Grid(containerGrid);
    }
    return grid;
}

export function renderGrid(grid, data) {
    grid.setOption({
        frozenColumn: 0,
        collapseAll: true,
        showRowNumber: false
    });
    grid.setData(data);
    grid.render();
}