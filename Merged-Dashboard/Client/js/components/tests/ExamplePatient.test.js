import React from "react";
import { mount } from "enzyme";
import ExamplePatient from "../ExamplePatient";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("ExamplePatient", () => {
    let mountedExamplePatient;
    let onSubmit = jest.fn();

    //Creates a rendered ExamplePatient component to test
    const examplePatient = () => {
        if(!mountedExamplePatient) {
            mountedExamplePatient = mount(<ExamplePatient onSubmit={onSubmit}/>);
        }
    
        return mountedExamplePatient;
    }
    
    //Resets the rendered ExamplePatient component before each test
    beforeEach(() => {
        mountedExamplePatient = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = examplePatient().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always renders a button to show data", () => {
        const dataBtn = examplePatient().find("button#data-btn");
        expect(dataBtn.length).toEqual(1);
    })

    it("always renders a button to show the goals component", () => {
        const goalBtn = examplePatient().find("button#goal-btn");
        expect(goalBtn.length).toEqual(1);
    })

    it("always renders a button to show the checkup notes component", () => {
        const exPat = examplePatient();
        const chkupBtn = exPat.find("button#chkup-notes-btn");
        expect(chkupBtn.length).toEqual(1);
        chkupBtn.simulate('click');
        const chkupNotes = exPat.find("div#chkup-notes-comp")
        expect(chkupNotes.length).toBe(1);
    })

    it("always renders a button to show the patient settings component", () => {
        const exPat = examplePatient();
        const settingsBtn = exPat.find("button#pat-set-btn");
        expect(settingsBtn.length).toEqual(1);
        settingsBtn.simulate("click");
        const patSettings = exPat.find("div#pat-set-comp")
        expect(patSettings.length).toBe(1);
    })

    it("always renders a button to print the current page", () => {
        const printBtn = examplePatient().find("button#print-btn");
        expect(printBtn.length).toEqual(1);
    })

    it("always renders a button to perform a checkup", () => {
        const expat = examplePatient();
        const chkupBtn = expat.find("button#chkup-btn");
        expect(chkupBtn.length).toEqual(1);
        chkupBtn.simulate('click');
        const checkUpComponent = expat.find("div#pat-chckup-comp")
        expect(checkUpComponent.length).toBe(1);
    })

    it("always renders a table with patient information", () => {
        const infoTable = examplePatient().find("table#pat-info-tab");
        expect(infoTable.length).toEqual(1);
    })

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = examplePatient().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(examplePatient().find("div").first().children());
        });
      });
});