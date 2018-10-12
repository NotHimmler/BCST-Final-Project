import React from "react";
import { mount } from "enzyme";
import AddPatient from "./AddPatient";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("AddPatient", () => {
    let mountedAddPatient;

    //Creates a rendered AddPatient component to test
    const addPatient = () => {
        if(!mountedAddPatient) {
            mountedAddPatient = mount(<AddPatient props={{}}/>);
        }
    
        return mountedAddPatient;
    }
    
    //Resets the rendered AddPatient component before each test
    beforeEach(() => {
        mountedAddPatient = undefined;
    });

    it("always renders a div", () => {
        const divs = addPatient().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always renders a form", () => {
        const form = addPatient().find("form");
        expect(form.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = addPatient().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(addPatient().find("div").first().children());
        });
      });
});