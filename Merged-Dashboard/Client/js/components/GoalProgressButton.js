import React from "react";
import { DropdownButton, MenuItem } from 'react-bootstrap';

const ratingString = [
    "Not achieved",
    "Partially achieved (1-49%)",
    "Mostly achieved (50-94%)",
    "Achieved (95-104%)",
    "Achieved + (>105%)"
]

class GoalProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
        };

        this.updateRating = this.updateRating.bind(this);
    }

    updateRating(eventKey){
        console.log(`Alert from menu item. EventKey: ${eventKey}`);
        this.setState({rating: eventKey});
    }
    
    render() {
        return (
            <div className="goal-progress-button">
                <DropdownButton 
                    pullRight
                    bsSize="xsmall"
                    bsStyle='default'
                    title={ratingString[this.state.rating]}
                    id={`dropdown-basic-${this.props.id}`}
                    className='goal-progress-dropdown'
                >
                    <MenuItem className="gpb-0" eventKey="0" onSelect={this.updateRating}>Not achieved</MenuItem>
                    <MenuItem className="gpb-1" eventKey="1" onSelect={this.updateRating}>Partially achieved (1-49%)</MenuItem>
                    <MenuItem className="gpb-2" eventKey="2" onSelect={this.updateRating}>Mostly achieved (50-94%)</MenuItem>
                    <MenuItem className="gpb-3" eventKey="3" onSelect={this.updateRating}>Achieved (95-104%)</MenuItem>
                    <MenuItem className="gpb-4" eventKey="4" onSelect={this.updateRating}>Achieved + (>105%)</MenuItem>
                </DropdownButton>
            </div>
        )
    }
}

export default GoalProgressBar;