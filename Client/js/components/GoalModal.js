import React from "react";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import { withFormik, Form, Field } from 'formik'

import GoalTemplate from '../components/GoalTemplate'
import GoalFormik from '../components/GoalFormik'

const TypeForm = props => {
    const {
      values,
      handleChange,
      isSubmitting 
    } = props;
    return(
        <Form>
            <Field component="select" name="goalType">
                <option value="template">Use goal template</option>
                <option value="custom">Create custom goal</option>
            </Field>
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>Next</button>
        </Form>
    );
}

const EnhancedTypeForm = withFormik({
    mapPropsToValues({ goalType }) {
        return {
          goalType: goalType || 'template',
        }
      },    
      handleSubmit(values, { setSubmitting, props }) {
      setTimeout(() => {
        console.log("Setting goal type");
        console.log(values);
        props.setGoalType(values.goalType);
        setSubmitting(false);
      }, 500)
    }
  })(TypeForm)

class GoalModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goalType: "",
        }
        this.setGoalType = this.setGoalType.bind(this);
    }

    setGoalType(type){
        this.setState({ goalType:type});
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
                        <p>This select thing needs to be fixed...</p>
                        <EnhancedTypeForm setGoalType={this.setGoalType}/>

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