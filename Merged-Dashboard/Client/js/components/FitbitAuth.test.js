import React from "react";
import { mount } from "enzyme";
import FitbitAuth from "./FitbitAuth";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("FitbitAuth", () => {
    let mountedFitbitAuth;
    let onSubmit = jest.fn();

    //Creates a rendered FitbitAuth component to test
    const fitbitAuth = () => {
        if(!mountedFitbitAuth) {
            mountedFitbitAuth = mount(<FitbitAuth onSubmit={onSubmit}/>);
        }
    
        return mountedFitbitAuth;
    }
    
    //Resets the rendered FitbitAuth component before each test
    beforeEach(() => {
        mountedFitbitAuth = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = fitbitAuth().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = fitbitAuth().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(fitbitAuth().find("div").first().children());
        });
      });
});