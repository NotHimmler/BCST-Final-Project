import React from "react";
import { mount, shallow } from "enzyme";
import GoalTemplate from "../GoalTemplate";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("GoalTemplate", () => {
    let mountedGoalTemplate;
    let onSubmit = jest.fn();

    //Creates a rendered GoalTemplate component to test
    const goalTemplate = () => {
        if(!mountedGoalTemplate) {
            mountedGoalTemplate = mount(<GoalTemplate globalGoals={[]}/>);
        }
    
        return mountedGoalTemplate;
    }
    
    //Resets the rendered GoalTemplate component before each test
    beforeEach(() => {
        mountedGoalTemplate = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = goalTemplate().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = goalTemplate().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(goalTemplate().find("div").first().children());
        });
      });
});