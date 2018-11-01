import React from "react";
import { mount, shallow } from "enzyme";
import PatientGraph from "../PatientGraph";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

global.fetch = jest.fn(() =>  new Promise(resolve => resolve()))

describe("PatientGraph", () => {
    let mountedPatientGraph;

    //Creates a rendered patientGraph component to test
    const patientGraph = () => {
        if(!mountedPatientGraph) {
            mountedPatientGraph = shallow(<PatientGraph />);
        }
    
        return mountedPatientGraph;
    }
    
    //Resets the rendered patientGraph component before each test
    beforeEach(() => {
        mountedPatientGraph = undefined;
    });

    it("always renders a div", () => {
        const divs = patientGraph().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always renders a fitbit table", () => {
        const form = patientGraph().find("FitbitChart");
        expect(form.length).toEqual(1);
    });

    it("always renders an amount table", () => {
        const form = patientGraph().find("AmountTable");
        expect(form.length).toEqual(1);
    });

    it("always renders an walkforward table", () => {
        const form = patientGraph().find("WalkTable");
        expect(form.length).toEqual(1);
    });

    it("always renders a walkaroundtheblock table", () => {
        const form = patientGraph().find("WalkAppTable");
        expect(form.length).toEqual(1);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = patientGraph().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(patientGraph().find("div").first().children());
        });
      });
});