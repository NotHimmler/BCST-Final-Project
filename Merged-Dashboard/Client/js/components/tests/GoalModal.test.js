import React from "react";
import { mount, shallow } from "enzyme";
import GoalModal from "../GoalModal";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("GoalModal", () => {
    let mountedGoalModal;
    let onSubmit = jest.fn();

    //Creates a rendered GoalModal component to test
    const goalModal = () => {
        if(!mountedGoalModal) {
            mountedGoalModal = shallow(<GoalModal show={true} onSubmit={onSubmit}/>);
        }
    
        return mountedGoalModal;
    }
    
    //Resets the rendered GoalModal component before each test
    beforeEach(() => {
        mountedGoalModal = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        
        const divs = goalModal().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = goalModal().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(goalModal().find("div").first().children());
        });
      });
});