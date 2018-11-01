import React from "react";
import { mount, shallow } from "enzyme";
import Sidebar from "../Sidebar";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("Sidebar", () => {
    let mountedSidebar;
    let onSubmit = jest.fn();

    //Creates a rendered Sidebar component to test
    const sidebar = () => {
        if(!mountedSidebar) {
            mountedSidebar = shallow(<Sidebar onSubmit={onSubmit}/>);
        }
    
        return mountedSidebar;
    }
    
    //Resets the rendered Sidebar component before each test
    beforeEach(() => {
        mountedSidebar = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = sidebar().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always has a link to the home page", () => {
        const link = sidebar().find("#sidebar-home-link");
        expect(link).toHaveLength(1);
    });

    it("always has a link to the current patients page", () => {
        const link = sidebar().find("#sidebar-curr-link");
        expect(link).toHaveLength(1);
    });

    it("always has a link to the discharged patients page", () => {
        const link = sidebar().find("#sidebar-dis-link");
        expect(link).toHaveLength(1);
    });

    it("always has a link to the add patient page", () => {
        const link = sidebar().find("#sidebar-add-pat");
        expect(link).toHaveLength(1);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = sidebar().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(sidebar().find("div").first().children());
        });
      });
});