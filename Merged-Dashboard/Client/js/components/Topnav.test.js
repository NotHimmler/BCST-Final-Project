import React from "react";
import { mount, shallow } from "enzyme";
import Topnav from "./Topnav";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("Topnav", () => {
    let mountedTopnav;
    let onSubmit = jest.fn();

    //Creates a rendered Topnav component to test
    const topnav = () => {
        if(!mountedTopnav) {
            mountedTopnav = shallow(<Topnav onSubmit={onSubmit}/>);
        }
    
        return mountedTopnav;
    }
    
    //Resets the rendered Topnav component before each test
    beforeEach(() => {
        mountedTopnav = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = topnav().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = topnav().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(topnav().find("div").first().children());
        });
      });
});