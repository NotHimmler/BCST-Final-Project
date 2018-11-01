import React from "react";
import { mount, shallow } from "enzyme";
import PatientSettings from "../PatientSettings";
import StatusSettings from "../StatusSettings";
import FitbitInvite from "../FitbitInvite";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("PatientSettings", () => {
    let mountedPatientSettings;
    let onSubmit = jest.fn();

    //Creates a rendered PatientSettings component to test
    const patientSettings = (archived) => {
        if(!mountedPatientSettings) {
            mountedPatientSettings = shallow(<PatientSettings archived={archived} onSubmit={onSubmit}/>);
        }
    
        return mountedPatientSettings;
    }
    
    //Resets the rendered PatientSettings component before each test
    beforeEach(() => {
        mountedPatientSettings = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = patientSettings().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always has a status settings component", () => {
        const statSettings = patientSettings().find(StatusSettings);
        expect(statSettings).toHaveLength(1);
    })

    it("has a fitbit invite component if patient is not archived", () => {
        const invite = patientSettings(false).find(FitbitInvite);
        expect(invite).toHaveLength(1);
    })

    it("does not have a fitbit invite component if patient is archived", () => {
        const invite = patientSettings(true).find(FitbitInvite);
        expect(invite).toHaveLength(0);
    })

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = patientSettings().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(patientSettings().find("div").first().children());
        });
      });
});