import React from "react";
import { mount, shallow } from "enzyme";
import PatientList from "../PatientList";
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
    let patList = new PatientList();

    //Creates a rendered patientList component to test
    const patientList = () => {
        if(!mountedpatientList) {
            mountedpatientList = shallow(<PatientList />);
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

describe("activeHeader()", () => {
    const patList = new PatientList();

    it("generates a header with some columns", () => {
        let header = shallow(patList.activePatientHeader()).find("tr");
        expect(header.length).toBe(1);
        let cols = header.find("th");
        expect(cols.length).toBe(7);
    })
})

describe("archivedHeader()", () => {
    const patList = new PatientList();

    it("generates a header with some columns", () => {
        let header = shallow(patList.archivedPatientHeader()).find("tr");
        expect(header.length).toBe(1);
        let cols = header.find("th");
        expect(cols.length).toBe(7);
    })
})