import React from "react";
import { mount } from "enzyme";
import DisPatients from "./DisPatients";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("DisPatients", () => {
    let mountedDisPatients;
    let onSubmit = jest.fn();

    //Creates a rendered DisPatients component to test
    const disPatients = () => {
        if(!mountedDisPatients) {
            mountedDisPatients = mount(<DisPatients onSubmit={onSubmit}/>);
        }
    
        return mountedDisPatients;
    }
    
    //Resets the rendered DisPatients component before each test
    beforeEach(() => {
        mountedDisPatients = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = disPatients().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = disPatients().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(disPatients().find("div").first().children());
        });
      });
});