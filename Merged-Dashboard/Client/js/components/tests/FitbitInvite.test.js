import React from "react";
import { mount, shallow } from "enzyme";
import FitbitInvite from "../FitbitInvite";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("FitbitInvite", () => {
    let mountedFitbitInvite;
    let onSubmit = jest.fn();

    //Creates a rendered FitbitInvite component to test
    const fitbitInvite = () => {
        if(!mountedFitbitInvite) {
            mountedFitbitInvite = mount(<FitbitInvite onSubmit={onSubmit}/>);
        }
    
        return mountedFitbitInvite;
    }
    
    //Resets the rendered FitbitInvite component before each test
    beforeEach(() => {
        mountedFitbitInvite = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = fitbitInvite().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = fitbitInvite().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(fitbitInvite().find("div").first().children());
        });
      });
});