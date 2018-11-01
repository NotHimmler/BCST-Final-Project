import React from "react";
import { mount, shallow } from "enzyme";
import TodoList from "../TodoList";
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

    it("has a text input and submit button", () => {
        const todoListComp = todoList();
        const input = todoListComp.find("input");
        const button = todoListComp.find("button");
        expect(input).toHaveLength(1);
        expect(button).toHaveLength(1);
    });

    it("does not try to submit a new todo when no text is entered", () => {
        const todoListComp = todoList();
        const spy = jest.spyOn(todoListComp.instance(), 'handleNewTodo');
        todoListComp.instance().forceUpdate();
        todoListComp.setState({"todo-input": ""});
        const button = todoListComp.find("button");
        button.first().simulate('click');
        expect(spy).toBeCalledTimes(0);
    })

    it("tries to submit a new todo when text is entered", () => {
        const todoListComp = todoList();
        const spy = jest.spyOn(todoListComp.instance(), 'handleNewTodo');
        todoListComp.instance().forceUpdate();
        todoListComp.setState({"todo-input": "Text"});
        const button = todoListComp.find("button");
        button.first().simulate('click');
        expect(spy).toBeCalledTimes(1);
    })

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = todoList().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(todoList().find("div").first().children());
        });
      });
});