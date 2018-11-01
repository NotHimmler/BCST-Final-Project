import React from "react";
import { mount } from "enzyme";
import AddPatient from "../AddPatient";
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
    let onSubmit = jest.fn();

    //Creates a rendered AddPatient component to test
    const addPatient = () => {
        if(!mountedAddPatient) {
            mountedAddPatient = mount(<AddPatient onSubmit={onSubmit}/>);
        }
    
        return mountedAddPatient;
    }
    
    //Resets the rendered AddPatient component before each test
    beforeEach(() => {
        mountedAddPatient = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = addPatient().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always renders a form", () => {
        const form = addPatient().find("form");
        expect(form.length).toBeGreaterThan(0);
    });

    it('always renders a first name input', () => {
        const submitButton = addPatient().find('input[name="firstName"]')
        expect(submitButton.length).toEqual(1);
    });

    it('always renders a last name input', () => {
        const submitButton = addPatient().find('input[name="lastName"]')
        expect(submitButton.length).toEqual(1);
    });

    it('always renders an mrn input', () => {
        const submitButton = addPatient().find('input[name="mrn"]')
        expect(submitButton.length).toEqual(1);
    });

    it('always renders a ward input', () => {
        const submitButton = addPatient().find('input[name="ward"]')
        expect(submitButton.length).toEqual(1);
    });

    it('always renders a submit button', () => {
        const submitButton = addPatient().find('input[type="submit"]')
        expect(submitButton.length).toEqual(1);
    });

    it("calls onSubmit when form is submitted and passes state", () => {
        const submitButton = addPatient().find("form").last();
        submitButton.simulate("submit");
        expect(onSubmit).toBeCalled();
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = addPatient().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(addPatient().find("div").first().children());
        });
      });
});