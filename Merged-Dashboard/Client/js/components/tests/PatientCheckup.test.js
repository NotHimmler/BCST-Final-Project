import React from "react";
import { mount, shallow } from "enzyme";
import PatientCheckup from "../PatientCheckup";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/
global.fetch = require('cross-fetch');
describe("PatientCheckup", () => {
    let mountedPatientCheckup;
    let onSubmit = jest.fn();

    //Creates a rendered PatientCheckup component to test
    const patientCheckup = () => {
        if(!mountedPatientCheckup) {
            mountedPatientCheckup = mount(<PatientCheckup onSubmit={onSubmit}/>);
        }
    
        return mountedPatientCheckup;
    }
    
    //Resets the rendered PatientCheckup component before each test
    beforeEach(() => {
        mountedPatientCheckup = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = patientCheckup().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always has a form with text-input and submit and cancel buttons", () => {
        const form = patientCheckup().find("form");
        const text = patientCheckup().find("textarea");
        const submit = patientCheckup().find("button[type='submit']");
        const cancel = patientCheckup().find("button#chkup-cancel-btn");
        expect(form).toHaveLength(1);
        expect(text).toHaveLength(1);
        expect(submit).toHaveLength(1);
        expect(cancel).toHaveLength(1);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = patientCheckup().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(patientCheckup().find("div").first().children());
        });
      });
});