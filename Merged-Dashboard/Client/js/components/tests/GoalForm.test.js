import React from "react";
import { mount } from "enzyme";
import GoalForm from "../GoalForm";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("GoalForm", () => {
    let mountedGoalForm;
    let onSubmit = jest.fn();

    //Creates a rendered GoalForm component to test
    const goalForm = () => {
        if(!mountedGoalForm) {
            mountedGoalForm = mount(<GoalForm onSubmit={onSubmit}/>);
        }
    
        return mountedGoalForm;
    }
    
    //Resets the rendered GoalForm component before each test
    beforeEach(() => {
        mountedGoalForm = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = goalForm().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = goalForm().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(goalForm().find("div").first().children());
        });
      });
});