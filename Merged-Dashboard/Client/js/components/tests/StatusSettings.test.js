import React from "react";
import { mount, shallow } from "enzyme";
import StatusSettings from "../StatusSettings";
/** 
const mockTrySetLoggedIn = jest.fn();

class MockSessionStore {
    setLoggedIn(val) {
        mockTrySetLoggedIn();
    } 
}
*/

describe("StatusSettings", () => {
    let mountedStatusSettings;
    let onSubmit = jest.fn();

    //Creates a rendered StatusSettings component to test
    const statusSettings = () => {
        if(!mountedStatusSettings) {
            mountedStatusSettings = mount(<StatusSettings onSubmit={onSubmit}/>);
        }
    
        return mountedStatusSettings;
    }
    
    //Resets the rendered StatusSettings component before each test
    beforeEach(() => {
        mountedStatusSettings = undefined;
        onSubmit = jest.fn();
    });

    it("always renders a div", () => {
        const divs = statusSettings().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it('renders an archive button if patient is not archived', () => {
        const settings = mount(<StatusSettings archived={false} />);
        const archiveBtn = settings.find("#archive-btn");
        expect(archiveBtn).toHaveLength(1);
    });

    it('renders a readmit button if patient is not archived', () => {
        const settings = mount(<StatusSettings archived={true} />);
        const archiveBtn = settings.find("#readmit-btn");
        expect(archiveBtn).toHaveLength(1);
    });

    it("calls the handle archive handler when archive is clicked", () => {
        const settings = mount(<StatusSettings archived={false} />);
        //Mock global functions that don't exist
        global.window.confirm = (string) => { return true};
        global.window.location.reload = () => {};

        const spy = jest.spyOn(settings.instance(), 'handleArchive');
        settings.instance().forceUpdate();
        const archiveBtn = settings.find("#archive-btn");
        archiveBtn.last().simulate('click');
        expect(spy).toBeCalled();
    })

    it("calls the handle archive handler when archive is clicked", () => {
        const settings = mount(<StatusSettings archived={true} />);
        //Mock global functions that don't exist
        global.window.confirm = (string) => { return true};
        global.window.location.reload = () => {};
        
        const spy = jest.spyOn(settings.instance(), 'handleReadmit');
        settings.instance().forceUpdate();
        const archiveBtn = settings.find("#readmit-btn");
        archiveBtn.last().simulate('click');
        expect(spy).toBeCalled();
    })

    describe("the rendered div", () => {
        it("contains everything else that gets rendered", () => {
            const divs = statusSettings().find("div");
            const wrappingDiv = divs.first();
    
            expect(wrappingDiv.children()).toEqual(statusSettings().find("div").first().children());
        });
      });
});