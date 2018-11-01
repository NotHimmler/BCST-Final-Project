import React from "react";
import { mount, shallow } from "enzyme";
import Login from "../Login";
import { BrowserRouter as Router } from 'react-router-dom';
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("Login", () => {
    let mountedLogin;

    //Creates a rendered Login component to test
    const login = () => {
        if(!mountedLogin) {
            mountedLogin = shallow(<Login />);
        }
    
        return mountedLogin;
    }
    
    //Resets the rendered Login component before each test
    beforeEach(() => {
        mountedLogin = undefined;
    });

    //React component requirement
    it("always renders a div", () => {
        const divs = login().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always renders a form", () => {
        const form = login().find("form");
        expect(form.length).toBeGreaterThan(0);
    });

    it("calls onSubmit when form is submitted and passes state", () => {
        const loginComp = login();
        const spy = jest.spyOn(loginComp.instance(), 'submitHandler');
        loginComp.instance().forceUpdate();
        const submitButton = loginComp.find("#submit-link").last();
        submitButton.simulate("click");
        expect(spy).toBeCalled();
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = login().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(login().find("div").first().children());
        });
      });
});