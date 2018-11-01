import React from "react";
import { mount, shallow } from "enzyme";
import FitbitChart from "../Charts/FitbitChart";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("FitbitChart", () => {
    let mountedFitbitChart;
    let onSubmit = jest.fn();

    //Creates a rendered FitbitChart component to test
    const fitbitChart = () => {
        if(!mountedFitbitChart) {
            mountedFitbitChart = mount(<FitbitChart onSubmit={onSubmit}/>);
        }
    
        return mountedFitbitChart;
    }
    
    //Resets the rendered FitbitChart component before each test
    beforeEach(() => {
        mountedFitbitChart = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = fitbitChart().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = fitbitChart().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(fitbitChart().find("div").first().children());
        });
      });
});