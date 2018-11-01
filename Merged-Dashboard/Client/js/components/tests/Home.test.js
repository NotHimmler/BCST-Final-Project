import React from "react";
import { mount } from "enzyme";
import Home from "../Home";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("Home", () => {
    let mountedHome;
    let onSubmit = jest.fn();

    //Creates a rendered Home component to test
    const home = () => {
        if(!mountedHome) {
            mountedHome = mount(<Home onSubmit={onSubmit}/>);
        }
    
        return mountedHome;
    }
    
    //Resets the rendered Home component before each test
    beforeEach(() => {
        mountedHome = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = home().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always has a most behind box", () => {
        const box = home().find("#most-behind-box");
        expect(box.length).toBe(1);
    })

    it("always has a longest time since last checkup box", () => {
        const box = home().find("#longest-time-box");
        expect(box.length).toBe(1);
    })

    it("always has a todo list", () => {
        const box = home().find("#therapist-todos-box");
        expect(box.length).toBe(1);
    })

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = home().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(home().find("div").first().children());
        });
      });
});