import React from "react";
import { mount, render, shallow } from "enzyme";
import WalkTable from "../WalkTable";
import DateRangePicker from "../DateRangePicker";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("WalkTable", () => {
    let mountedWalkTable;
    let onSubmit = jest.fn();

    //Creates a rendered WalkTable component to test
    const walkTable = () => {
        if(!mountedWalkTable) {
            mountedWalkTable = mount(<WalkTable lastName="Test"/>);
        }
    
        return mountedWalkTable;
    }
    
    //Resets the rendered WalkTable component before each test
    beforeEach(() => {
        mountedWalkTable = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = walkTable().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always has a date picker", () => {
        let datePicker = walkTable().find(DateRangePicker);
        expect(datePicker).toHaveLength(1);
    });

    it("changes the graph to daily when daily button is clicked", () => {
        let walkTableComp = walkTable();
        let spy = jest.spyOn(walkTableComp.instance(), 'change_daily');
        walkTableComp.instance().forceUpdate();
        let changeDaily = walkTableComp.find("#change-daily-btn");
        expect(changeDaily).toHaveLength(1);
        changeDaily.simulate('click');
        expect(spy).toHaveBeenCalled();
    });

    it("changes the graph to daily when monthly button is clicked", () => {
        let walkTableComp = walkTable();
        let spy = jest.spyOn(walkTableComp.instance(), 'change_weekly');
        walkTableComp.instance().forceUpdate();
        let changeDaily = walkTableComp.find("#change-weekly-btn");
        expect(changeDaily).toHaveLength(1);
        changeDaily.simulate('click');
        expect(spy).toHaveBeenCalled();
    });

    it("changes the graph to daily when monthly button is clicked", () => {
        let walkTableComp = walkTable();
        let spy = jest.spyOn(walkTableComp.instance(), 'change_monthly');
        walkTableComp.instance().forceUpdate();
        let changeDaily = walkTableComp.find("#change-monthly-btn");
        expect(changeDaily).toHaveLength(1);
        changeDaily.simulate('click');
        expect(spy).toHaveBeenCalled();
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = walkTable().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(walkTable().find("div").first().children());
        });
      });
});