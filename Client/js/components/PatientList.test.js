import React from "react";
import { mount } from "enzyme";
import PatientList from "./PatientList";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("PatientList", () => {
    let mountedpatientList;

    //Creates a rendered patientList component to test
    const patientList = () => {
        if(!mountedpatientList) {
            mountedpatientList = mount(<PatientList />);
        }
    
        return mountedpatientList;
    }
    
    //Resets the rendered patientList component before each test
    beforeEach(() => {
        mountedpatientList = undefined;
    });

    it("always renders a div", () => {
        const divs = patientList().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always renders a table", () => {
        const form = patientList().find("table");
        expect(form.length).toEqual(1);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = patientList().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(patientList().find("div").first().children());
        });
      });
});