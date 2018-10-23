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
        this.getTodos();
    }

    getTodos() {
        fetch(`/api/todos/getTodos/${this.props.username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(data => {
            return data.json()
        }).then(data => {
            if(data.okay) {
                let rows = this.generateRowsFromData(data.data);
                this.setState({rows: rows, data: data.data});
            }
        }).catch(err => {
            console.log(err)
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
        console.log(this.props.username);
        let newTodo = {
            text: this.state['todo-input'],
            done: false,
            date_done: null,
            user_id: this.props.username
        }
        fetch(`/api/todos/addTodo`, {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(data => {
            return data.json()
        }).then(data => {
            if (data.okay) {
                let oldTodos = this.state.data;
                let todo = data.todo;
                oldTodos.push(todo);
                this.setState({data: oldTodos, rows: this.generateRowsFromData(oldTodos), "todo-input": ""})
            }
        })
        //
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
