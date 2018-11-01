import React from "react";
import { mount, shallow } from "enzyme";
import ChartDatePicker from "../Charts/ChartDatePicker";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("ChartDatePicker", () => {
    let mountedChartDatePicker;
    let onSubmit = jest.fn();

    //Creates a rendered ChartDatePicker component to test
    const chartDatePicker = () => {
        if(!mountedChartDatePicker) {
            mountedChartDatePicker = mount(<ChartDatePicker onSubmit={onSubmit}/>);
        }
    
        return mountedChartDatePicker;
    }
    
    //Resets the rendered ChartDatePicker component before each test
    beforeEach(() => {
        mountedChartDatePicker = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = chartDatePicker().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = chartDatePicker().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(chartDatePicker().find("div").first().children());
        });
      });
});