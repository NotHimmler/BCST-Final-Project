import React from "react";
import { mount, shallow } from "enzyme";
import WalkAppTable from "../WalkAppTable";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("WalkAppTable", () => {
    let mountedWalkAppTable;
    let getWalkData = jest.fn();

    //Creates a rendered AddPatient component to test
    const walkAppTable = () => {
        if(!mountedWalkAppTable) {
            mountedWalkAppTable = shallow(<WalkAppTable getWalkData={getWalkData}/>);
        }
    
        return mountedWalkAppTable;
    }
    
    //Resets the rendered AddPatient component before each test
    beforeEach(() => {
        mountedWalkAppTable = undefined;
        getWalkData = jest.fn();
    });

    it("always renders a div", () => {
        const divs = walkAppTable().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always has a table", () => {
        const table = walkAppTable().find("table");
        expect(table.length).toEqual(1);
    })
    
    it("always has columns for data, steps, distance, duration, goaltype and amount", () => {
        const ths = walkAppTable().find("th");
        expect(ths.length).toEqual(6);
    })

    it("always makes a call for walk data to the api", () => {
        walkAppTable();
        expect(getWalkData).toBeCalled();
    })

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = walkAppTable().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(walkAppTable().find("div").first().children());
        });
      });
});