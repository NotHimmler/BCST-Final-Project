import React from "react";
import { mount } from "enzyme";
import DonutGraph from "../DonutGraph";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("DonutGraph", () => {
    let mountedDonutGraph;
    let onSubmit = jest.fn();

    //Creates a rendered DonutGraph component to test
    const donutGraph = () => {
        if(!mountedDonutGraph) {
            mountedDonutGraph = mount(<DonutGraph onSubmit={onSubmit}/>);
        }
    
        return mountedDonutGraph;
    }
    
    //Resets the rendered DonutGraph component before each test
    beforeEach(() => {
        mountedDonutGraph = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = donutGraph().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = donutGraph().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(donutGraph().find("div").first().children());
        });
      });
});