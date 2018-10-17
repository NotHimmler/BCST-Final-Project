import React from "react";
import {
    Link, Redirect
} from "react-router-dom";
var $ = require('jquery');

class Register extends React.Component {
	constructor(props, context) {
        super(props,context);
        this.state = {
			errorMessage: "",
			redirect: false
        };
     
        this.submitHandler = this.submitHandler.bind(this);
      }

    submitHandler(e) {
		e.preventDefault();
		if (this.props.onSubmit) this.props.onSubmit();
        var userid =$('.register .userid').val();
		var password = $('.register .password').val();
		var email = $('.register .email').val();
        if(!userid||!password||!email){
            return;
        }
        let data = JSON.stringify({
            userInfo:{
				userid,
				email,
                password
            }});
        $.ajax({
            url:'/api/v1/register',
            type:"post",
            data:data,
            contentType:"application/json;charset=utf-8",
            success: (data)=>{
				console.log(data);
				let error = data.error;
                if (error) {
					this.setState({
						errorMessage:error
					});
                }else{
					this.setState({
						redirect:true
					})
					this.props.updateAppStatus({
                        isLoggedin:true,
                        username:userid
                    });
				}
            }
        });
	}
	
	getErrorMessage() {
		let errorMessage = this.state.errorMessage;
		if(!errorMessage){
			return null;
		}
		return <div className="login-error">{errorMessage}</div>;
	}

	render(){
		if(this.state.redirect){
			return <Redirect push to="/" />
		}
		let ErrorMessage = this.getErrorMessage();
		return(
			<div className="register">
			<div className="login_wrapper">
				<div id="register" className="animate form registration_form">
	                <section className="login_content">
	                    <form onSubmit={this.submitHandler}>
	                        <h1>Create Account</h1>
	                        <div>
	                            <input type="text" className="form-control userid" placeholder="Username" required="" />
	                        </div>
	                        <div>
	                            <input type="email" className="form-control email" placeholder="Email" required="" />
	                        </div>
	                        <div>
	                            <input type="password" className="form-control password" placeholder="Password" required="" />
	                        </div>
	                        <div>
	                            <a><input type="submit" className="btn btn-default submit" value="Submit"/></a>
	                        </div>

	                        <div className="clearfix"></div>

	                        <div className="separator">
	                            <p className="change_link">Already a member ?
	                                <a href="/">Log in</a>
	                            </p>

	                            <div className="clearfix"></div>
	                            <br />
	                        </div>
	                    </form>
	                </section>
					{ErrorMessage}
				</div>
	            </div>
            </div>
        )
	}
}
export default Register;