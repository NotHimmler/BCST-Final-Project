import React from "react";
import { Link } from "react-router-dom";

class PatientCard extends React.Component {
    
    render() {
        return (
            <div>
              <div class="col-md-4 col-sm-4 col-xs-12 profile_details">
                <div class="well profile_view">
                  <div class="col-sm-12">
                      <h4 class="brief"><i>Patient</i></h4>
                      <div class="left col-xs-7">
                        <h2>D01</h2>
                        <p><strong>Age: </strong> 83 </p>
                        <p><strong>Sex: </strong> Female </p>
                        <p><strong>Health condition: </strong> Non-neurological </p>
                      </div>
                      <div class="right col-xs-5 text-center">
                        <img src="../img/user.png" alt="" class="img-circle img-responsive"/>
                      </div>
                    </div>
                    <div class="col-xs-12 bottom text-center">
                      <div class="col-xs-12 col-sm-6 emphasis">
                      </div>
                      <div class="col-xs-12 col-sm-6 emphasis">
                        <Link to = "/patient"><button type="button" class="btn btn-primary btn-xs">
                          <i class="fa fa-user"> </i> View Profile
                        </button></Link>
                        
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}

export default PatientCard;