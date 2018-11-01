import React from "react";
import { Link } from "react-router-dom";
import { mount, shallow } from "enzyme";
import Topnav from "../Topnav";
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
            mountedTopnav = shallow(<Topnav updateAppStatus={(object) => {}}/>);
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

    it("has a link to logout", () => {
        const logout = topnav().find(Link);
        expect(logout).toHaveLength(1);
    })

    it("calls the logout handler when the logout link is clicked", () => {
        const mountedTopNav = topnav();
        const spy = jest.spyOn(mountedTopNav.instance(), 'logOutHandler');
        mountedTopNav.instance().forceUpdate();
        const logout = mountedTopNav.find(Link);
        logout.first().simulate('click');
        expect(spy).toBeCalled();
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = topnav().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(topnav().find("div").first().children());
        });
      });
});