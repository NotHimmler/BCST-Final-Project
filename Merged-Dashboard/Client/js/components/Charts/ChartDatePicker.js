import React from "react";

import DatePicker from 'react-datepicker';
import moment from 'moment';

class ChartDatePicker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fromDate: moment(),
            toDate: moment(),
            minDate: moment(),
            maxDate: moment(),
        };

        this.handleFromDateChange = this.handleFromDateChange.bind(this);
        this.handleToDateChange = this.handleToDateChange.bind(this);
        this.getMinDate = this.getMinDate.bind(this);
        this.getMaxDate = this.getMaxDate.bind(this);
        this.resetDates = this.resetDates.bind(this);
    }

    // Handler for 'from' date picker
    handleFromDateChange(date) {
        let endpoint = `/api/fitbit/mrn/${this.props.mrn}/dates/${moment(date).format('YYYY-MM-DD')}/${moment(this.state.toDate).format('YYYY-MM-DD')}`;
        //console.log(endpoint);
        this.props.addData(endpoint)
        this.setState({
          fromDate: date
        });
      }
    
    // Handler for 'to' date picker
    handleToDateChange(date) {
        let endpoint = `/api/fitbit/mrn/${this.props.mrn}/dates/${moment(this.state.fromDate).format('YYYY-MM-DD')}/${moment(date).format('YYYY-MM-DD')}`;
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

    resetDates(){
        this.setState({fromDate: this.state.minDate, toDate: this.state.maxDate});
        this.props.addData(`/api/fitbit/mrn/${this.props.mrn}`);
    }

    componentDidMount() {
        let dateEndpoint = `/api/fitbit/mrn/${this.props.mrn}/datelimit`;

        // Get date limits
        fetch(dateEndpoint)
            .then(response => {
            if (response.status !== 200) {
                return this.setState({ placeholder: "Something went wrong" });
            }
            return response.json();
            })
            .then(data => {
                let from = data[0].from.split(" ");
                let to = data[0].to.split(" ");
                this.setState({
                    fromDate: moment(from[0]),
                    toDate: moment(to[0]),
                    minDate: moment(from[0]),
                    maxDate: moment(to[0]),
                });
            });
    }
    
    render() {
        return (
            <div>
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
                <button className="btn btn-primary" onClick={this.resetDates}>Reset</button>
                </div>
            </div>
        )
    }
}

export default ChartDatePicker;