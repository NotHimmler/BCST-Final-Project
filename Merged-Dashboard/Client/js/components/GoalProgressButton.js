import React from "react";
import { DropdownButton, MenuItem } from 'react-bootstrap';

const ratingValue = [
    0,  //Not achieved
    25, //Partially achieved (1-49%)
    75, //Mostly achieved (50-94%)
    100,//Achieved (95-104%)
    105,//Achieved + (>105%)
]

class GoalProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            isOpen: false,
            dropdownIsOpen: false,
        };

        this.updateRating = this.updateRating.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    getRatingString(rating) {
        if (rating == null || rating <= 0)
            return "Not achieved";
        if (rating > 0 && rating < 50)
            return "Partially achieved (1-49%)";
        if (rating >= 50 && rating < 95)
            return "Mostly achieved (50-94%)";
        if (rating >= 95 && rating < 105)
            return "Achieved (95-104%)";
        if (rating >= 105)
            return "Achieved + (>105%)";
    }

    getColor(rating) {
        if (rating == null || rating <= 0)
            return "brown";
        if (rating > 0 && rating < 50)
            return "red";
        if (rating >= 50 && rating < 95)
            return "orange";
        if (rating >= 95 && rating < 105)
            return "light-green";
        if (rating >= 105)
            return "dark-green";
    }

    updateRating(eventKey){
        let newRating;
        if(eventKey == 5) {
            newRating = parseFloat(this.props.getGlobalRating());
            console.log("Auto global:");
            console.log(newRating);
        } else {
            this.props.updateGlobalGoal({
                goal_id: this.props.goal.goal_id,
                rating: ratingValue[eventKey],
            });
            newRating = ratingValue[eventKey];
        }
        
        this.setState({rating: newRating});

        let endpoint = `/api/goal/update_rating`;
        let goalInfo = {
            goal_id: this.props.goal.goal_id,
            rating: newRating
        }
        let option = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({goalInfo})
          }
          fetch(endpoint, option)
          .then(response => {
            if (response.status !== 200) {
              return this.setState({ placeholder: "Something went wrong" });
            }
            console.log("Rating updated successfully");
            return response.json();
          })
          .then(data => {
            console.log(data);
          });
    }

    toggleDropdown() {
        this.setState({ dropdownIsOpen: !this.state.dropdownIsOpen })
    }

    componentDidMount() {
        this.setState({rating: this.props.goal.rating});
    }
    
    render() {
        return (
            <div className="goal-progress-button">
                <DropdownButton 
                    pullRight
                    bsSize="small"
                    bsStyle='default'
                    title={this.getRatingString(this.state.rating)}
                    id={`dropdown-basic-${this.props.goal.goal_id}`}
                    className={`goal-progress-dropdown ${this.props.goalType} fill-${this.getColor(this.state.rating)}`}
                    onToggle={this.toggleDropdown}
                    open={this.state.dropdownIsOpen}
                >
                    <div>
                    <MenuItem className="gpb-0" eventKey="0" onClick={this.toggleDropdown} onSelect={this.updateRating}>Not achieved</MenuItem>
                    <MenuItem className="gpb-1" eventKey="1" onClick={this.toggleDropdown} onSelect={this.updateRating}>Partially achieved (1-49%)</MenuItem>
                    <MenuItem className="gpb-2" eventKey="2" onClick={this.toggleDropdown} onSelect={this.updateRating}>Mostly achieved (50-94%)</MenuItem>
                    <MenuItem className="gpb-3" eventKey="3" onClick={this.toggleDropdown} onSelect={this.updateRating}>Achieved (95-104%)</MenuItem>
                    <MenuItem className="gpb-4" eventKey="4" onClick={this.toggleDropdown} onSelect={this.updateRating}>Achieved + (>105%)</MenuItem>
                    </div>
                    {(this.props.goalType === "global") && 
                        <div>
                            <MenuItem divider />
                            <MenuItem className="gpb-5" eventKey="5" onClick={this.toggleDropdown} onSelect={this.updateRating}>Auto calculate (average of sub goal ratings)</MenuItem>
                        </div>
                    }
                </DropdownButton>
            </div>
        )
    }
}

export default GoalProgressBar;