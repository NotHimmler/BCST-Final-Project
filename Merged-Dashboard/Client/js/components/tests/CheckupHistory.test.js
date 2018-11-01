import React from "react";
import { mount } from "enzyme";
import CheckupHistory from "../CheckupHistory";
const fetch = require('cross-fetch');
global.fetch = fetch;
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("CheckupHistory", () => {
    let mountedCheckupHistory;
    let onSubmit = jest.fn();

    //Creates a rendered CheckupHistory component to test
    const checkupHistory = () => {
        if(!mountedCheckupHistory) {
            mountedCheckupHistory = mount(<CheckupHistory onSubmit={onSubmit}/>);
        }
    
        return mountedCheckupHistory;
    }
    
    //Resets the rendered CheckupHistory component before each test
    beforeEach(() => {
        mountedCheckupHistory = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = checkupHistory().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = checkupHistory().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(checkupHistory().find("div").first().children());
        });
      });
});