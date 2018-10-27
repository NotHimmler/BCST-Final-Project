import React from "react";
import { generateCheckupHistoryRows } from "./CheckupHistoryUtils";
import { mount } from "enzyme";
const moment = require('moment');

describe("generateCheckupHistoryRows", () => {

    it("generates a div for each data row", () => {
        let item = {
            date: moment(),
            user: "Leanne",
            note: "Note",
        }
        let numRows = Math.ceil(Math.random()*10);
        let data = [];
        for(let i = 0; i < numRows; i++) {
            data.push(item);
        }

        let rows = generateCheckupHistoryRows(data);
        expect(rows.length).toEqual(numRows);
    })

    it("has two subsection divs for each row", () => {
        let item = {
            date: moment(),
            user: "Leanne",
            note: "Note",
        }
        let data = [item];

        let rows = generateCheckupHistoryRows(data);
        expect(rows.length).toEqual(data.length);
        for (let item of rows) {
            let mountedRows = mount(item);
            let rowDivs = mountedRows.find("div.note-subsection");
            expect(rowDivs.length).toBe(2);
        }
    })
})
