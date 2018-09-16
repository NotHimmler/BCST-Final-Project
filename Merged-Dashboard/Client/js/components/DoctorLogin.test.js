import React from "react";
import { mount } from "enzyme";
import DoctorLogin from "./DoctorLogin";

const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}

let mockSessionStore = new MockSessionStore();

describe("DoctorLogin", () => {
    let mountedDoctorLogin;

    //Creates a rendered DoctorLogin component to test
    const doctorLogin = () => {
        if(!mountedDoctorLogin) {
            mountedDoctorLogin = mount(<DoctorLogin sessionStore={mockSessionStore} history={[]}/>);
        }
    
        return mountedDoctorLogin;
    }
    
    //Resets the rendered DoctorLogin component before each test
    beforeEach(() => {
        mountedDoctorLogin = undefined;
    });

    it("always renders a div", () => {
        const divs = doctorLogin().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always renders a form", () => {
        const form = doctorLogin().find("form");
        expect(form.length).toBeGreaterThan(0);
    });

    it("should try to set login store to logged in when form is submitted", () => {
        const component = doctorLogin();
        
        component.find('form').first().simulate('submit');
        expect(mockTrySetLoggedIn).toHaveBeenCalled();
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = doctorLogin().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(doctorLogin().find("div").first().children());
        });
      });
});