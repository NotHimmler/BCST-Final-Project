import React from "react";
import { mount } from "enzyme";
import GoalList from "../GoalList";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("GoalList", () => {
    let mountedGoalList;
    let onSubmit = jest.fn();

    //Creates a rendered GoalList component to test
    const goalList = () => {
        if(!mountedGoalList) {
            mountedGoalList = mount(<GoalList onSubmit={onSubmit}/>);
        }
    
        return mountedGoalList;
    }
    
    //Resets the rendered GoalList component before each test
    beforeEach(() => {
        mountedGoalList = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = goalList().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = goalList().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(goalList().find("div").first().children());
        });
      });
});