import React from "react";
import { mount } from "enzyme";
import DateRangePicker from "../DateRangePicker";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("DateRangePicker", () => {
    let mountedDateRangePicker;
    let onSubmit = jest.fn();

    //Creates a rendered DateRangePicker component to test
    const dateRangePicker = () => {
        if(!mountedDateRangePicker) {
            mountedDateRangePicker = mount(<DateRangePicker onSubmit={onSubmit}/>);
        }
    
        return mountedDateRangePicker;
    }
    
    //Resets the rendered DateRangePicker component before each test
    beforeEach(() => {
        mountedDateRangePicker = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = dateRangePicker().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = dateRangePicker().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(dateRangePicker().find("div").first().children());
        });
      });
});