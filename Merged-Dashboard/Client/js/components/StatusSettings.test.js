import React from "react";
import { mount, shallow } from "enzyme";
import StatusSettings from "./StatusSettings";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("StatusSettings", () => {
    let mountedStatusSettings;
    let onSubmit = jest.fn();

    //Creates a rendered StatusSettings component to test
    const statusSettings = () => {
        if(!mountedStatusSettings) {
            mountedStatusSettings = mount(<StatusSettings onSubmit={onSubmit}/>);
        }
    
        return mountedStatusSettings;
    }
    
    //Resets the rendered StatusSettings component before each test
    beforeEach(() => {
        mountedStatusSettings = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = statusSettings().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = statusSettings().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(statusSettings().find("div").first().children());
        });
      });
});