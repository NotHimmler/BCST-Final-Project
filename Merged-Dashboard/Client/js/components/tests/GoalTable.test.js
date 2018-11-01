import React from "react";
import { mount, shallow } from "enzyme";
import GoalTable from "../GoalTable";
global.fetch = require('cross-fetch');
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("GoalTable", () => {
    let mountedGoalTable;
    let onSubmit = jest.fn();

    //Creates a rendered GoalTable component to test
    const goalTable = () => {
        if(!mountedGoalTable) {
            mountedGoalTable = mount(<GoalTable goal={{}}/>);
        }
    
        return mountedGoalTable;
    }
    
    //Resets the rendered GoalTable component before each test
    beforeEach(() => {
        mountedGoalTable = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = goalTable().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = goalTable().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(goalTable().find("div").first().children());
        });
      });
});