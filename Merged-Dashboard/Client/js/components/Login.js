import React from "react";
import {Link} from "react-router-dom";

class Login extends React.Component {
    constructor(props, context) {
        super(props,context);
        this.state = {
            errorMessage: ""
        };
     
        this.submitHandler = this.submitHandler.bind(this);
      }

    submitHandler(e) {
        e.preventDefault();
        var userid =$('.login .userid').val();
        var password = $('.login .password').val();
        if(!userid||!password){
            return;
        }
        let data = JSON.stringify({
            userInfo:{
                userid,
                password
            }});

        $.ajax({
            url:'/api/user/login',
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
                    this.props.updateAppStatus({
                        isLoggedIn:true,
                        username: userid
                    });
                }
            },
            error: (error) => {
                console.log(error);
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

    render() {
        let ErrorMessage = this.getErrorMessage();
        return (
            <div className="login">

        <div className="login_wrapper">
            <div className="animate form login_form">
                <section className="login_content">
                    <form>
                        <h1>Login Form</h1>
                        <div>
                            <input type="text" className="form-control userid" placeholder="Username" required="" />
                        </div>
                        <div>
                            <input type="password" className="form-control password" placeholder="Password" required="" />
                        </div>
                        <div>
                            <Link to="/" className="btn btn-default submit" onClick={this.submitHandler}>Log in</Link>
                            <a className="reset_pass" href="#">Lost your password?</a>
                        </div>

                        <div className="clearfix"></div>

                        <div className="separator">
                            <p className="change_link">New to site?
                                <Link to="/register" className="to_register"> Create Account </Link>
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

export default Login;