import React from "react";
import { Link } from "react-router-dom";

class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rows: [],
            data: [],
            "todo-input": ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNewTodo = this.handleNewTodo.bind(this);
        this.generateRowsFromData = this.generateRowsFromData.bind(this);
    }

    componentDidMount() {

    }

    getTodos() {
        fetch(`/api/todos/${this.props.username}`)
        .then(data => {
            return data.json()
        }).then(data => {
            if(data.okay) {
                let rows = generateRowsFromData(data.data);
                this.setState({rows: rows, data: data.data});
            }
        })
    }

    generateRowsFromData(data) {
        let rows = data.map(item => {
            return ( <li>
                        <p>
                        <input type="checkbox" className="flat" value={item.done} key={item.id} name={item.id}/>{item.text}</p>
                    </li>
            )
        })
        return rows;
    }

    handleInputChange(event) {
        let name = event.target.name;
        this.setState({[name]: event.target.value})
    }

    handleNewTodo(event) {
        let data = this.state.data;
        data.push({
            text: this.state['todo-input'],
            done: false,
            date_done: null,
            user_id: this.props.username
        })
        this.setState({data: data, rows: this.generateRowsFromData(data), "todo-input": ""})
    }
    
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
                          {this.state.rows}
                        </ul>
                      </div>
                      <div>
                          <input type="text" placeholder="New Todo Item" name="todo-input" value={this.state['todo-input']} onChange={this.handleInputChange}></input>
                          <button onClick={this.handleNewTodo}>Add</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}

export default TodoList;
