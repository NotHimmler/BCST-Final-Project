import React from "react";
import { mount, shallow } from "enzyme";
import TodoList from "./TodoList";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("TodoList", () => {
    let mountedTodoList;
    let onSubmit = jest.fn();

    //Creates a rendered TodoList component to test
    const todoList = () => {
        if(!mountedTodoList) {
            mountedTodoList = mount(<TodoList onSubmit={onSubmit}/>);
        }
    
        return mountedTodoList;
    }
    
    //Resets the rendered TodoList component before each test
    beforeEach(() => {
        mountedTodoList = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = todoList().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = todoList().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(todoList().find("div").first().children());
        });
      });
});