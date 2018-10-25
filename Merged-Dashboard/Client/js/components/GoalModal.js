import React from "react";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import { withFormik, Form, Field } from 'formik'

import GoalTemplate from '../components/GoalTemplate'
import GoalTemplateReview from '../components/GoalTemplateReview'
import GoalFormik from '../components/GoalFormik'

class GoalModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goalType: "template",
            dateSet: "",
            goalString: "",
            option: {}
        }
        this.setGoalType = this.setGoalType.bind(this);
        this.reviewGoal = this.reviewGoal.bind(this);

    }

    setGoalType(event){
        this.setState({ goalType: event.target.value});
    }

    reviewGoal(option){
        this.option = option;
        this.setState({
            goalType: "template_review",
            goalString: option.goal_string
        });
    }

    addGoalHandler(e){
        e.preventDefault();
        const mrn = this.props.mrn;
        let endpoint = `/api/goal/addGoal`;
        let goalInfo = this.option;
        goalInfo.MRN = mrn;
        let option = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({goalInfo})
          }
          console.log("Trying...");
          console.log(option.body);
          fetch(endpoint, option)
          .then(response => {
            if (response.status !== 200) {
              return this.setState({ placeholder: "Something went wrong" });
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            this.setState({ goalType: 'template'});
            this.props.addGoal(goalInfo);
            this.closeHandler();
          });
    }

    closeHandler() {
        this.setState({ goalType: 'template'});
        this.props.onHide();
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
                        {/* <select 
                            className="form-control"
                            value={this.state.goalType} 
                            onChange={this.setGoalType}
                            placeholder="Please select ...">
                            <option value="template">Use goal template</option>
                            <option value="custom">Create custom goal</option>
                        </select> */}
                        <div className="clearfix"/>

                        {
                            (this.state.goalType === "template")
                                ? <GoalTemplate 
                                    reviewGoal={this.reviewGoal}
                                    globalGoals={this.props.globalGoals}
                                    />
                                : null
                        }

                        {
                            (this.state.goalType === "template_review")
                                ? <GoalTemplateReview goalString={this.state.goalString} addGoalHandler={this.addGoalHandler.bind(this)}/>
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
                <button className="btn btn-outline-dark" onClick={this.closeHandler.bind(this)}>Close</button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default GoalModal;