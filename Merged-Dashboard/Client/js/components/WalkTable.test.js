import React from "react";
import { mount } from "enzyme";
import WalkTable from "./WalkTable";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("WalkTable", () => {
    let mountedWalkTable;
    let onSubmit = jest.fn();

    //Creates a rendered WalkTable component to test
    const walkTable = () => {
        if(!mountedWalkTable) {
            mountedWalkTable = mount(<WalkTable onSubmit={onSubmit}/>);
        }
    
        return mountedWalkTable;
    }
    
    //Resets the rendered WalkTable component before each test
    beforeEach(() => {
        mountedWalkTable = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = walkTable().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = walkTable().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(walkTable().find("div").first().children());
        });
      });
});