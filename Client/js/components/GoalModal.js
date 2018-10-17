import React from "react";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import { withFormik, Form, Field } from 'formik'

import GoalTemplate from '../components/GoalTemplate'
import GoalFormik from '../components/GoalFormik'

class GoalModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goalType: "template",
        }
        this.setGoalType = this.setGoalType.bind(this);
    }

    setGoalType(event){
        this.setState({ goalType: event.target.value});
    }
    
    render() {
        return (
            <Modal
              {...this.props}
              animation={false}
            >
                <Modal.Header>
                <Modal.Title>Add a new goal</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <select 
                            className="form-control"
                            value={this.state.goalType} 
                            onChange={this.setGoalType}
                            placeholder="Please select ...">
                            <option value="template">Use goal template</option>
                            <option value="custom">Create custom goal</option>
                        </select>
                        <div className="clearfix"/>
                        <br/>

                        {
                            (this.state.goalType === "template")
                                ? <GoalTemplate/>
                                : null
                        }

                        {
                            (this.state.goalType === "custom")
                                ? <GoalFormik 
                                    closeForm={this.props.onHide}
                                    handlegoal={this.props.handlegoal}
                                    />
                                : null
                        }
                        
                    </div>
                </Modal.Body>

                <Modal.Footer>
                <button className="btn btn-outline-dark" onClick={this.props.onHide}>Close</button>
                <button className="btn btn-primary">Save changes</button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default GoalModal;