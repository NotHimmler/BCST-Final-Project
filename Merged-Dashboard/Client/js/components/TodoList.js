import React from "react";
import { Link } from "react-router-dom";

class TodoList extends React.Component {
    
    render() {
        return (
            <div>
              <div className="col-sm-4 to_do">
                  <div className="x_panel">
                    <div className="x_title">
                      <h2>To Do List </h2>
                      <div className="clearfix"></div>
                    </div>
                    <div className="x_content">

                      <div className="">
                        <ul className="to_do">
                          <li>
                              <p>
                              <input type="checkbox" className="flat"/> Patient D01 report due</p>
                          </li>
                          <li>
                            <p>
                              <input type="checkbox" className="flat"/> Plan a meeting </p>
                          </li>
                          <li>
                            <p>
                              <input type="checkbox" className="flat"/> Patient D02 report due</p>
                          </li>
                          <li>
                            <p>
                              <input type="checkbox" className="flat"/> Patient D03 report due</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}

export default TodoList;
