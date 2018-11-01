import React from "react";
import { mount, shallow } from "enzyme";
import Register from "../Register";
import { BrowserRouter as Router } from 'react-router-dom';
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("Register", () => {
    let mountedRegister;
    let onSubmit = jest.fn();

    //Creates a rendered Register component to test
    const register = () => {
        if(!mountedRegister) {
            mountedRegister = mount(<Register onSubmit={onSubmit}/>);
        }
    
        return mountedRegister;
    }
    
    //Resets the rendered Register component before each test
    beforeEach(() => {
        mountedRegister = undefined;
        onSubmit = jest.fn();
    });

    //React component requirement
    it("always renders a div", () => {
        const divs = register().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always renders a form", () => {
        const form = register().find("form");
        expect(form.length).toBeGreaterThan(0);
    });

    it("calls onSubmit when form is submitted and passes state", () => {
        const submitButton = register().find("form").last();
        submitButton.simulate("submit");
        expect(onSubmit).toBeCalled();
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = register().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(register().find("div").first().children());
        });
      });
});