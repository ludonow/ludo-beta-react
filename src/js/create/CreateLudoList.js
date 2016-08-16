import React from 'react';

export default class CreateLudoList extends React.Component {
    constructor() {
        super();
        this.state = { cardContent:[] }
    }

    getDifferentCardContent() {
        this.state.cardContent = this.props.data.map( (data, index) => {
            return (
                <div className="grid-item" key={index}>
                    <div className="card">
                        <div>{data.launchDate}</div>
                        <div>{data.type}</div>
                        <div>{data.duration}</div>
                        <div>{data.introduction}</div>
                        <div>{data.condition}</div>
                        <div>{data.marblesNumber}</div>
                    </div>
                </div>
            )
        });
    }

    render() {
        this.getDifferentCardContent();
        return (
            <div>
                {this.state.cardContent}
            </div>
        );
    }
}

// PlaygroundLudoList.propTypes = {
//     launchDate: React.PropTypes.string.isRequired,
//     type: React.PropTypes.number.isRequired,
//     duration: React.PropTypes.number.isRequired,
//     introduction: React.PropTypes.string.isRequired,
//     condition: React.PropTypes.string.isRequired,
//     marblesNumber: React.PropTypes.number.isRequired,
// };