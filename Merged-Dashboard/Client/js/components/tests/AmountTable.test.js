import React from "react";
import { mount, shallow } from "enzyme";
import AmountTable from "../AmountTable";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("AmountTable", () => {
    let mountedAmountTable;
    let getWalkData = jest.fn();

    //Creates a rendered AddPatient component to test
    const amountTable = () => {
        if(!mountedAmountTable) {
            mountedAmountTable = shallow(<AmountTable getWalkData={getWalkData}/>);
        }
    
        return mountedAmountTable;
    }
    
    //Resets the rendered AddPatient component before each test
    beforeEach(() => {
        mountedAmountTable = undefined;
        getWalkData = jest.fn();
    });

    it("always renders a div", () => {
        const divs = amountTable().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it("always has a table", () => {
        const table = amountTable().find("table");
        expect(table.length).toEqual(1);
    })

    it("has a button to add a new log", () => {
        const addBtn = amountTable().find("#add-log-button");
        expect(addBtn.length).toEqual(1)
    })    

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = amountTable().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(amountTable().find("div").first().children());
        });
      });
});