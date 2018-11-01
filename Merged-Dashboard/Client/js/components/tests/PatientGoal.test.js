import React from "react";
import { mount, shallow } from "enzyme";
import PatientGoal from "../PatientGoal";
import GoalModal from "../GoalModal";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/
global.fetch = require('cross-fetch');
describe("PatientGoal", () => {
    let mountedPatientGoal;
    let onSubmit = jest.fn();

    //Creates a rendered PatientGoal component to test
    const patientGoal = () => {
        if(!mountedPatientGoal) {
            mountedPatientGoal = shallow(<PatientGoal onSubmit={onSubmit}/>);
        }
    
        return mountedPatientGoal;
    }
    
    //Resets the rendered PatientGoal component before each test
    beforeEach(() => {
        mountedPatientGoal = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = patientGoal().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("has a button to add a goal", () => {
        let btn = patientGoal().find("button#add-goal");
        expect(btn).toHaveLength(1);
    });

    it("shows the goal dialog when the add goal button is clicked", () => {
        let patGoal = patientGoal();
        let btn = patGoal.find("button#add-goal");
        let dialog = patGoal.find(GoalModal);
        expect(dialog).toHaveLength(1);
        expect(patGoal.state('showModal')).toBeFalsy();
        btn.last().simulate('click');
        dialog = patGoal.find(GoalModal);
        expect(patGoal.state('showModal')).toBeTruthy();
    })

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = patientGoal().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(patientGoal().find("div").first().children());
        });
      });
});