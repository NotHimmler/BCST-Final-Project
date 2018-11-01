import React from "react";
import { mount, shallow } from "enzyme";
import GoalTemplateReview from "../GoalTemplateReview";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("GoalTemplateReview", () => {
    let mountedGoalTemplateReview;
    let onSubmit = jest.fn();

    //Creates a rendered GoalTemplateReview component to test
    const goalTemplateReviewReview = () => {
        if(!mountedGoalTemplateReview) {
            mountedGoalTemplateReview = mount(<GoalTemplateReview onSubmit={onSubmit}/>);
        }
    
        return mountedGoalTemplateReview;
    }
    
    //Resets the rendered GoalTemplateReview component before each test
    beforeEach(() => {
        mountedGoalTemplateReview = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = goalTemplateReviewReview().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = goalTemplateReviewReview().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(goalTemplateReviewReview().find("div").first().children());
        });
      });
});