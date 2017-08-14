import React from 'react';

import { animalImageArray, colorArray } from './avatarImage';

export default class ReportAvatar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { renderWhoseAvatar, router_currentFormValue, userPhotoUrl, whoIsUser } = this.props;
        const { comments_nick, player_id, starter_id } = router_currentFormValue;
        const id = {
            'player': player_id,
            'starter': starter_id
        };
        const srcImage = (whoIsUser == renderWhoseAvatar) ? userPhotoUrl : animalImageArray[comments_nick[id[renderWhoseAvatar]][0]];
        return (
            <div className="player-avatar-container">
                 <img
                    className="player-avatar-container__photo"
                    src={srcImage}
                    style={{'backgroundColor': colorArray[comments_nick[id[renderWhoseAvatar]][1]]}} 
                /> 
            </div>
        );
    }
}