import React from "react";
import { mount, shallow } from "enzyme";
import Template from "../Template";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("Template", () => {
    let mountedTemplate;
    let onSubmit = jest.fn();

    //Creates a rendered Template component to test
    const template = () => {
        if(!mountedTemplate) {
            mountedTemplate = mount(<Template onSubmit={onSubmit}/>);
        }
    
        return mountedTemplate;
    }
    
    //Resets the rendered Template component before each test
    beforeEach(() => {
        mountedTemplate = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = template().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = template().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(template().find("div").first().children());
        });
      });
});