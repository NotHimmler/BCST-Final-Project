import React from "react";
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'

const MyForm = props => {
    const {
      values,
      errors,
      touched,
      handleChange,
      isSubmitting 
    } = props;
    return (
      <Form>
        <p>This is just a test form.. ignore this..</p>
        <label>Full Name</label>
        <Field type="text" name="name" placeholder="" />
        {errors.name && touched.name && <div id="feedback">{errors.name}</div>}
        <div className="clearfix"></div>
        <br/>
        <button className="btn btn-primary" disabled={isSubmitting} type="submit">Submit</button>
      </Form>
    );
  };

  const GoalFormik = withFormik({
    mapPropsToValues: () => ({ name: '' }),
  
    // Custom sync validation
    validate: values => {
      const errors = {};
  
      if (!values.name) {
        errors.name = 'Required';
      }
  
      return errors;
    },
  
    handleSubmit: (values, {resetForm, setSubmitting, props}) => {
      setTimeout(() => {
        alert("Goal successfully created!" + JSON.stringify(values, null, 2));
        props.handlegoal(values);
        resetForm();
        setSubmitting(false);
        props.closeForm();
      }, 500);
    },
  
    displayName: 'BasicForm',
  })(MyForm);

export default GoalFormik;