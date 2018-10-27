import React from "react";
import { Link } from "react-router-dom";
import fetch from "cross-fetch";

global.fetch = fetch;

class PatientRow extends React.Component {
  returnIconBasedOnPercentage(percentString) {
      
      const num = Number(percentString.replace("%", ""))
      if (num < 50) {
          return <span>{percentString}<i className="text-danger fas fa-exclamation-circle"></i></span>
      } else if (num >= 50 && num < 80) {
          return <span>{percentString}<i className="text-warning fas fa-exclamation-triangle"></i></span>
      } else if (num >= 80) {
          return <span>{percentString}<i className="text-success fas fa-check-circle"></i></span>
      }

  }

  getDate(d) {
      if(d == null){
          return "No last checkup";
      }
      let date = new Date(d)
      return (date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear());
  }

  render() {
      
      return(
        !this.props.patient.is_archived ?
          <tr>
              <th scope="row"><Link to={"/patient"+`/${this.props.patient.MRN}`}>{this.props.patient.MRN}</Link></th>
              <td scope="row">{this.props.patient.ward}</td>
              <td scope="row">{this.props.patient.first_name}</td>
              <td scope="row">{this.props.patient.last_name}</td>
              <td scope="row">{this.props.patient.age}</td>
              <td scope="row">{this.props.patient.sex}</td>
              <td scope="row">{this.getDate(this.props.patient.last_checkup_date)}</td>
          </tr>
          : 
          <tr>
              <th scope="row"><Link to={"/patient"+`/${this.props.patient.MRN}`}>{this.props.patient.MRN}</Link></th>
              <td scope="row">{this.props.patient.first_name}</td>
              <td scope="row">{this.props.patient.last_name}</td>
              <td scope="row">{this.props.patient.age}</td>
              <td scope="row">{this.props.patient.sex}</td>
              <td scope="row">{this.getDate(this.props.patient.last_checkup_date)}</td>
              <td scope="row">{this.getDate(this.props.patient.date_archived)}</td>
          </tr>
      )
  }
}


class PatientList extends React.Component {

  constructor() {
    super()
    this.state = {
        "archived": false, 
        "patientRows": [],
        patients: [],
        loaded: false,
        placeholder: "Loading...",
        sort: -1,
        "keyword": '',
        chevronIconsActive: {
            "MRN": "fa fa-chevron-down",
            "ward": "fa fa-chevron-down",
            "first_name": "fa fa-chevron-down",
            "last_name": "fa fa-chevron-down",
            "age": "fa fa-chevron-down",
            "sex": "fa fa-chevron-down",
            "last_checkup_date": "fa fa-chevron-down"
        },
        chevronIconsArchived: {
            "MRN": "fa fa-chevron-down",
            "first_name": "fa fa-chevron-down",
            "last_name": "fa fa-chevron-down",
            "age": "fa fa-chevron-down",
            "sex": "fa fa-chevron-down",
            "last_checkup_date": "fa fa-chevron-down",
            "date_archived": "fa fa-chevron-down"
        }
    }

    this.sortColHandler = this.sortColHandler.bind(this);
  }

  sortColHandler(col, event) {
    
    let rows = [];
    let data = this.state.patients.sort((a, b) => {
        if (col == "MRN" || col == "age") return (Number(a[col]) - Number(b[col]))*this.state.sort;
        return (String(a[col]).localeCompare(String(b[col])))*this.state.sort
    });
    
    for (let patient of data) {
        rows.push(<PatientRow key={patient.MRN} patient={patient}/>)
    }
    this.setState({patientRows: rows, sort: this.state.sort*-1})
    if (this.state.archived) {
        if (this.state.chevronIconsArchived[col] === "fa fa-chevron-down") {
            this.state.chevronIconsArchived[col] = "fa fa-chevron-up";
        } else {
            this.state.chevronIconsArchived[col] = "fa fa-chevron-down";
        }
    } else {
        if (this.state.chevronIconsActive[col] === "fa fa-chevron-down") {
            this.state.chevronIconsActive[col] = "fa fa-chevron-up";
        } else {
            this.state.chevronIconsActive[col] = "fa fa-chevron-down";
        }
    }

  }

  activePatientHeader() {
    return(
        <tr>
            <th onClick={(e) => this.sortColHandler("MRN", e)} scope="col">{"MRN"} <i className={this.state.chevronIconsActive.MRN}></i></th>
            <th onClick={(e) => this.sortColHandler("ward", e)} scope="col">{"Ward"} <i className={this.state.chevronIconsActive.ward}></i></th>
            <th onClick={(e) => this.sortColHandler("first_name", e)} scope="col">{"First Name"} <i className={this.state.chevronIconsActive.first_name}></i></th>
            <th onClick={(e) => this.sortColHandler("last_name", e)} scope="col">{"Last Name"} <i className={this.state.chevronIconsActive.last_name}></i></th>
            <th onClick={(e) => this.sortColHandler("age", e)} scope="col">{"Age"} <i className={this.state.chevronIconsActive.age}></i></th>
            <th onClick={(e) => this.sortColHandler("sex", e)} scope="col">{"Sex"} <i className={this.state.chevronIconsActive.sex}></i></th>
            <th onClick={(e) => this.sortColHandler("last_checkup_date", e)} scope="col">{"Last Checkup"} <i className={this.state.chevronIconsActive.last_checkup_date}></i></th>
        </tr>
    )
  }

  archivedPatientHeader() {
    return(
        <tr>
            <th onClick={(e) => this.sortColHandler("MRN", e)} scope="col">{"MRN"} <i className={this.state.chevronIconsArchived.MRN}></i></th>
            <th onClick={(e) => this.sortColHandler("first_name", e)} scope="col">{"First Name"} <i className={this.state.chevronIconsArchived.first_name}></i></th>
            <th onClick={(e) => this.sortColHandler("last_name", e)} scope="col">{"Last Name"} <i className={this.state.chevronIconsArchived.last_name}></i></th>
            <th onClick={(e) => this.sortColHandler("age", e)} scope="col">{"Age"} <i className={this.state.chevronIconsArchived.age}></i></th>
            <th onClick={(e) => this.sortColHandler("sex", e)} scope="col">{"Sex"} <i className={this.state.chevronIconsArchived.sex}></i></th>
            <th onClick={(e) => this.sortColHandler("last_checkup_date", e)} scope="col">{"Last Checkup"} <i className={this.state.chevronIconsArchived.last_checkup_date}></i></th>
            <th onClick={(e) => this.sortColHandler("date_archived", e)} scope="col">{"Date Archived"} <i className={this.state.chevronIconsArchived.date_archived}></i></th>
        </tr>
    )
  }

  keywordsNotMatchPatient(patient) {
    return !patient.MRN.includes(this.state.keyword) &&
        !(patient.ward.toLowerCase().includes(this.state.keyword) && !patient.is_archived) &&
        !patient.first_name.toLowerCase().includes(this.state.keyword) &&
        !patient.last_name.toLowerCase().includes(this.state.keyword) &&
        !(patient.first_name.toLowerCase()+' '+patient.last_name.toLowerCase()).includes(this.state.keyword);
  }

  generateTable(keywords) {
    this.setState({"archived": this.props.archived});
    this.setState({"keyword": keywords ? keywords.toLowerCase() : ""});
    let endpoint = "";
    this.props.archived ? endpoint = "api/patient/archived" : endpoint = "api/patient/current";

    fetch(endpoint)
    .then(response => {
      if (response.status !== 200) {
        return this.setState({ placeholder: "Something went wrong" });
      }
      return response.json();
    })
    .then(data => {
        let rows = []

        for (let patient of data) {
            //console.log(patient);
            if (this.keywordsNotMatchPatient(patient))
                continue;
            rows.push(<PatientRow key={patient.MRN} patient={patient}/>)
        } 
        this.setState({"patientRows": rows, loaded: true, patients: data})
    }).catch(err => {
        
    })
  }

    componentDidMount() {
        this.generateTable(this.props.searchKeywords);
    
    }
    componentWillReceiveProps(props) {
        let { archived, searchKeywords } = this.props;
        //console.log(searchKeywords + ' : ' + props.searchKeywords);
        if (props.searchKeywords !== searchKeywords) {
            // console.log()
            this.generateTable(props.searchKeywords); 
        }
    }
    render() {

        const { loaded, placeholder } = this.state;

        return (
          <div id="pat-list-comp">
            <div className='x_panel'>

              <div className='x_content'>


              <table className="table">
                    <thead className="thead-light">
                        { !this.state.archived ? this.activePatientHeader() : this.archivedPatientHeader()}
                        
                    </thead>
                    <tbody>
                        { 
                        loaded ?
                        this.state.patientRows
                        : 
                        <tr><td>placeholder</td></tr>
                        }
                    </tbody>
                </table>
                

              </div>

            </div>

          </div>
        )
    }
}

export default PatientList;