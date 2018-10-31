import React from "react";

import DatePicker from 'react-datepicker';
import moment from 'moment';

global.fetch = global.fetch ? global.fetch : require('cross-fetch');

class ChartDatePicker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fromDate: moment(),
            toDate: moment(),
            minDate: moment(),
            maxDate: moment(),
            range: "Most recent 7 days",
        };

        this.handleFromDateChange = this.handleFromDateChange.bind(this);
        this.handleToDateChange = this.handleToDateChange.bind(this);
        this.getMinDate = this.getMinDate.bind(this);
        this.getMaxDate = this.getMaxDate.bind(this);
        this.resetWeek = this.resetWeek.bind(this);
        this.resetMonth = this.resetMonth.bind(this);

    }

    // Handler for 'from' date picker
    handleFromDateChange(date) {
        let endpoint = `${this.props.endpoint}${this.props.mrn}/dates/${moment(date).format('YYYY-MM-DD')}/${moment(this.state.toDate).format('YYYY-MM-DD')}`;
        //console.log(endpoint);
        this.props.addData(endpoint)
        this.setState({
          fromDate: date
        });
      }
    
    // Handler for 'to' date picker
    handleToDateChange(date) {
        let endpoint = `${this.props.endpoint}${this.props.mrn}/dates/${moment(this.state.fromDate).format('YYYY-MM-DD')}/${moment(date).format('YYYY-MM-DD')}`;
        this.props.addData(endpoint)
        this.setState({
          toDate: date
        });
      }
    
    getMinDate(){
        if(this.state.fromDate > this.state.minDate){
            return this.state.fromDate;
        } else {
            return this.state.minDate;
        }
    }

    getMaxDate(){
        if(this.state.toDate < this.state.maxDate){
            return this.state.toDate;
        } else {
            return this.state.maxDate;
        }
    }

    resetWeek(){
        let from;
        (moment(this.state.maxDate).subtract(6, "days") < this.state.minDate)
            ? from = this.state.minDate
            : from = moment(this.state.maxDate).subtract(6, "days");
        this.setState({
            fromDate: from, 
            toDate: this.state.maxDate,
            range: "Most recent 7 days"
        });
        this.props.addData(`${this.props.endpoint}${this.props.mrn}`);
    }

    resetMonth(){
        let from;
        (moment(this.state.maxDate).subtract(29, "days") < this.state.minDate)
            ? from = this.state.minDate
            : from = moment(this.state.maxDate).subtract(29, "days");
        this.setState({
            fromDate: from, 
            toDate: this.state.maxDate,
            range: "Most recent 30 days",
        });
        this.props.addData(`${this.props.endpoint}${this.props.mrn}/dates/${from.format('YYYY-MM-DD')}/${moment(this.state.maxDate).format('YYYY-MM-DD')}`);
    }

    componentDidMount() {
        let dateEndpoint = `${this.props.endpoint}${this.props.mrn}/datelimit`;
        // Get date limits
        fetch(dateEndpoint)
            .then(response => {
            if (response.status !== 200) {
                return this.setState({ placeholder: "Something went wrong" });
            }
            return response.json();
            })
            .then(data => {
                if(data.error){
                    return;
                }
                let from = data[0].from.split(" ");
                let to = data[0].to.split(" ");
                this.setState({
                    fromDate: moment(to[0]).subtract(6, "days"),
                    toDate: moment(to[0]),
                    minDate: moment(from[0]),
                    maxDate: moment(to[0]),
                });
            }).catch(err => {
                //Handle error her
            });
    }
    
    render() {
        return (
            <div style={{display: this.state.display}}>
                <div className="datepicker-inline date-from">
                    <p>From </p>
                </div>
                
                <div className="datepicker-inline">
                <DatePicker
                    className="col-sm"
                    dateFormat="ddd DD/MM/YY"
                    selected={this.state.fromDate}
                    minDate={this.state.minDate}
                    maxDate={this.getMaxDate()}
                    onChange={this.handleFromDateChange}/>
                </div>

                <div className="datepicker-inline date-to">
                    <p>To </p>
                </div>

                <div className="datepicker-inline">
                    <DatePicker
                        className="col-sm"
                        dateFormat="ddd DD/MM/YY"
                        selected={this.state.toDate}
                        minDate={this.getMinDate()}
                        maxDate={this.state.maxDate}
                        onChange={this.handleToDateChange}/>
                </div>

                <div className="datepicker-inline">
                    <li className="dropdown">
                    <button
                        id="dropdown_fitbit"
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                    >
                        {this.state.range}
                        <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                        <a onClick={this.resetWeek}>Most recent 7 days</a>
                        </li>
                        <li>
                        <a onClick={this.resetMonth}>Most recent 30 days</a>
                        </li>
                    </ul>
                    </li>
                </div>
            </div>
        )
    }
}

export default ChartDatePicker;