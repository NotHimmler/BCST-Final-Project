import React from "react";
import { mount, shallow } from "enzyme";
import GoalProgressButton from "../GoalProgressButton";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("GoalProgressButton", () => {
    let mountedGoalProgressButton;
    let onSubmit = jest.fn();

    //Creates a rendered GoalProgressButton component to test
    const goalProgressButton = () => {
        if(!mountedGoalProgressButton) {
            mountedGoalProgressButton = mount(<GoalProgressButton goal={{}}/>);
        }
    
        return mountedGoalProgressButton;
    }
    
    //Resets the rendered GoalProgressButton component before each test
    beforeEach(() => {
        mountedGoalProgressButton = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = goalProgressButton().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = goalProgressButton().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(goalProgressButton().find("div").first().children());
        });
      });
});