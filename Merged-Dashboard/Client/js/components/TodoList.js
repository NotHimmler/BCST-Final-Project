import React from "react";
import { Link } from "react-router-dom";

global.fetch = global.fetch ? global.fetch : require('cross-fetch');

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
        this.handleTodoChange = this.handleTodoChange.bind(this);
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
                this.setState({data: data.data}, () => {
                    this.generateRowsFromData();
                });
            }
        }).catch(err => {
            //Do something with the error
            //console.log(err)
        })
    }

    generateRowsFromData() {
        let rows = [];
        for (let index in this.state.data) {
            rows.push(<li>
                <p>
                <input type="checkbox" className="flat" checked={this.state.data[index].done} key={this.state.data[index].id} name={this.state.data[index].id} onChange={this.handleTodoChange}/>{this.state.data[index].text}</p>
            </li>)
        }
        this.setState({rows: rows});
    }

    handleTodoChange(event) {
        let name = event.target.name;
        let target = event.target;
        target.disabled = true;
        let todos = this.state.data
        for(let index in todos) {
            let todo = todos[index];
            if(todo.id == name) {
                todos[index].done = target.checked;
            }
        }
        this.setState({data: todos}, () => {
            this.generateRowsFromData();
            fetch(`/api/todos/update/${name}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({"done": target.checked})
            }).then(data => {
                return data.json();
            }).then(data => {
                if(data.okay) {
                    target.disabled = false;
                }
            })
        })
        
    }

    handleInputChange(event) {
        let name = event.target.name;
        this.setState({[name]: event.target.value})
    }

    handleNewTodo(event) {
        
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
                this.setState({data: oldTodos, "todo-input": ""}, () => {
                    this.generateRowsFromData()
                })
            }
        }).catch(err => {
            //Handle error here
        })
        //
    }
    
    render() {
        return (
            <div id="therapist-todos-box">
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
                          <button onClick={this.handleNewTodo} disabled={this.state['todo-input'] == ""}>Add</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}

export default TodoList;
