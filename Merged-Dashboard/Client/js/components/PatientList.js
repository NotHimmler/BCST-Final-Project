import React from "react";
import { Link } from "react-router-dom";

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
        sort: 1,
        "keyword": ''
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
  }

  activePatientHeader() {
    return(
        <tr>
            <th onClick={(e) => this.sortColHandler("MRN", e)} scope="col">{"MRN"}</th>
            <th onClick={(e) => this.sortColHandler("ward", e)} scope="col">{"Ward"}</th>
            <th onClick={(e) => this.sortColHandler("first_name", e)} scope="col">{"First Name"}</th>
            <th onClick={(e) => this.sortColHandler("last_name", e)} scope="col">{"Last Name"}</th>
            <th onClick={(e) => this.sortColHandler("age", e)} scope="col">{"Age"}</th>
            <th onClick={(e) => this.sortColHandler("sex", e)} scope="col">{"Sex"}</th>
            <th onClick={(e) => this.sortColHandler("last_checkup_date", e)} scope="col">{"Last Checkup"}</th>
        </tr>
    )
  }

  archivedPatientHeader() {
    return(
        <tr>
            <th onClick={(e) => this.sortColHandler("MRN", e)} scope="col">{"MRN"}</th>
            <th onClick={(e) => this.sortColHandler("first_name", e)} scope="col">{"First Name"}</th>
            <th onClick={(e) => this.sortColHandler("last_name", e)} scope="col">{"Last Name"}</th>
            <th onClick={(e) => this.sortColHandler("age", e)} scope="col">{"Age"}</th>
            <th onClick={(e) => this.sortColHandler("sex", e)} scope="col">{"Sex"}</th>
            <th onClick={(e) => this.sortColHandler("last_checkup_date", e)} scope="col">{"Last Checkup"}</th>
            <th onClick={(e) => this.sortColHandler("date_archived", e)} scope="col">{"Date Archived"}</th>
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
    this.setState({"keyword": keywords.toLowerCase()});
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
    });
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
          <div>
            <div className='x_panel'>

              <div className='x_content'>

{ loaded ?
              <table className="table">
                    <thead className="thead-light">
                        { !this.state.archived ? this.activePatientHeader() : this.archivedPatientHeader()}
                        { this.state.patientRows  }
                    </thead>
                </table>
                : <p>{placeholder}</p>
}

              </div>

            </div>

          </div>
        )
    }
}

export default PatientList;