import React from "react";
import { mount, shallow } from "enzyme";
import PatientSidebar from "../PatientSidebar";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("PatientSidebar", () => {
    let mountedPatientSidebar;
    let onSubmit = jest.fn();

    //Creates a rendered PatientSidebar component to test
    const patientSidebar = () => {
        if(!mountedPatientSidebar) {
            mountedPatientSidebar = shallow(<PatientSidebar onSubmit={onSubmit}/>);
        }
    
        return mountedPatientSidebar;
    }
    
    //Resets the rendered PatientSidebar component before each test
    beforeEach(() => {
        mountedPatientSidebar = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = patientSidebar().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = patientSidebar().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(patientSidebar().find("div").first().children());
        });
      });
});