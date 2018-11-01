import React from "react";
import { mount } from "enzyme";
import CurPatients from "../CurPatients";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("CurPatients", () => {
    let mountedCurPatients;
    let onSubmit = jest.fn();

    //Creates a rendered CurPatientss component to test
    const curPatients = () => {
        if(!mountedCurPatients) {
            mountedCurPatients = mount(<CurPatients onSubmit={onSubmit}/>);
        }
    
        return mountedCurPatients;
    }
    
    //Resets the rendered CurPatientss component before each test
    beforeEach(() => {
        mountedCurPatients = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = curPatients().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always renders a search box", () => {
        const searchBox = curPatients().find("#patient-search-box");
        expect(searchBox.length).toBe(1);
    });

    it("always renders a patient list component", () => {
        const patientList = curPatients().find("#pat-list-comp");
        expect(patientList.length).toBe(1);
    })

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = curPatients().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(curPatients().find("div").first().children());
        });
      });
});