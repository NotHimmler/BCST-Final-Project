import React from "react";
import { DropdownButton, MenuItem } from 'react-bootstrap';

class GoalProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: null,
        };

        this.getRating = this.getRating.bind(this);
        this.updateRating = this.updateRating.bind(this);
    }

    getRating(){
        if(this.state.rating){
            return this.state.rating;
        }
        return "No rating";
    }

    updateRating(newRating){
        this.setState({rating: newRating});
    }

    componentDidMount() {
        this.setState({rating: this.props.rating})
    }
    
    render() {
        return (
            <div>
                <DropdownButton
                    pullRight
                    bsStyle='primary'
                    title='Primary'
                    id={`dropdown-basic-${this.props.id}`}
                >
                    <MenuItem eventKey="1">Action</MenuItem>
                    <MenuItem eventKey="2">Another action</MenuItem>
                    <MenuItem eventKey="3">
                        Active Item
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="4">Separated link</MenuItem>
                </DropdownButton>
            </div>
        )
    }
}

export default GoalProgressBar;