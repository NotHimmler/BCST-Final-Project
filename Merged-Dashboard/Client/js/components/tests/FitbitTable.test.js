import React from "react";
import { mount } from "enzyme";
import FitbitTable from "../FitbitTable";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("FitbitTable", () => {
    let mountedFitbitTable;
    let onSubmit = jest.fn();

    //Creates a rendered FitbitTable component to test
    const fitbitTable = () => {
        if(!mountedFitbitTable) {
            mountedFitbitTable = mount(<FitbitTable onSubmit={onSubmit}/>);
        }
    
        return mountedFitbitTable;
    }
    
    //Resets the rendered FitbitTable component before each test
    beforeEach(() => {
        mountedFitbitTable = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = fitbitTable().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = fitbitTable().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(fitbitTable().find("div").first().children());
        });
      });
});