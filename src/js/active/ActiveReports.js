import React from 'react';
import axios from '../axios-config';
import Lightbox from 'react-image-lightbox';
import Textarea from 'react-textarea-autosize';

export default class ActiveReports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enlargeImageLocation: '',
            isEditingReport: false,
            isEditReportButtonClickable: false,
            isImageLightBoxOpen: false,
            playerReportList: [],
            starterReportList: [],
            reportTextContent: ''
        };
        this.handleImageEnlarge = this.handleImageEnlarge.bind(this);
        this.handleReportEditClick = this.handleReportEditClick.bind(this);
        this.handleReportEditText = this.handleReportEditText.bind(this);
        this.handleReportTextChange = this.handleReportTextChange.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
    }

    componentWillMount() {
        this.props.handleIsOpeningActivePage(true);
        this.props.handleShouldReportUpdate(true);
    }

    componentWillUnmount() {
        this.props.handleIsOpeningActivePage(false);
    }

    componentWillReceiveProps(nextProps) {
        // console.log('ActiveReports componentWillReceiveProps', nextProps.hasGotNewReport);  // debug
        /* 
         * classify report data by starter or player
         */
        // if(nextProps.currentLudoReportData.length != this.props.currentLudoReportData.length || !this.props.hasGotNewReport) {
        if(nextProps.hasGotNewReport) {
            // console.log('ActiveReports componentWillReceiveProps shouldReportUpdate this', this.props);   // debug
            // console.log('ActiveReports componentWillReceiveProps shouldReportUpdate next', nextProps);   // debug
            const { starterReportList, playerReportList } = this.state;
            this.setState({
                starterReportList: [],
                playerReportList: []
            });
            // console.log('ActiveReports componentWillReceiveProps nextProps.currentLudoReportData', nextProps.currentLudoReportData);   // debug
            const newStarterReportList = nextProps.currentLudoReportData.filter(reportObject => {
                if (reportObject.user_id == nextProps.router_currentFormValue.starter_id) {
                    return true;
                } else {
                    return false;
                }
            });
            // console.log('ActiveReports componentWillReceiveProps this.state.starterReportList', this.state.starterReportList);   // debug 
            const newPlayerReportList = nextProps.currentLudoReportData.filter( (reportObject) => {
                if (reportObject.user_id == nextProps.router_currentFormValue.player_id) {
                    return true;
                } else {
                    return false;
                }
            });
            // console.log('ActiveReports componentWillReceiveProps this.state.playerReportList', this.state.playerReportList);   // debug
            this.setState({
                starterReportList: newStarterReportList,
                playerReportList: newPlayerReportList
            });
            if (!this.state.isEditReportButtonClickable) {
                this.setState({
                    isEditReportButtonClickable: true
                });
            }
            this.props.handleHasGotNewReport(false);
        }
    }

    handleImageEnlarge(event) {
        // console.log('ActiveReports handleImageEnlarge image location', event.currentTarget.src);  // debug
        this.setState({
            enlargeImageLocation: event.currentTarget.src,
            isImageLightBoxOpen: true
        });
    }

    handleReportEditClick(event) {
        event.preventDefault();
        // console.log('ActiveReports handleReportEditClick');   // debug
        this.setState({
            isEditingReport: true
        });
    }

    handleReportEditText(event) {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault();
            // console.log('ActiveReports handleReportEditText');   // debug
            const reportPutBody = {
                content: this.state.reportTextContent,
                image_location: ''
            };
            const SPIndex = (event.currentTarget.id).slice(0, 1);
            const arrayIndex = Number(event.currentTarget.id.slice(2));
            let report_id = null;
            if (SPIndex == 's') {
                console.log('s');
                reportPutBody.content = this.state.reportTextContent;
                report_id = this.state.starterReportList[arrayIndex].report_id;
            } else if (SPIndex == 'p') {
                console.log('p');
                reportPutBody.content = this.state.reportTextContent;
                report_id = this.state.playerReportList[arrayIndex].report_id;
            }
            // console.log('ActiveReports handleReportEditText reportPutBody', reportPutBody);   // debug
            if (report_id) {
                console.log('report_id', report_id);
                axios.put(`/apis/report/${report_id}`, reportPutBody)
                .then( response => {
                    if(response.data.status === '200') {
                        console.log('成功編輯');
                        this.props.handleShouldReportUpdate(true);
                    } else {
                        console.log('ActiveReports handleReportEditText report put else response from server: ', response);
                        window.alert(`回報編輯時發生錯誤，請重試一次；若問題依然發生，請通知開發人員`);
                    }
                })
                .catch( error => {
                    console.log('ActiveReports handleReportEditText report put error', error);
                    window.alert(`回報編輯時發生錯誤，請重試一次；若問題依然發生，請通知開發人員`);
                });
            }
            this.setState({
                isEditingReport: false
            });
        }
    }

    handleReportTextChange(event) {
        this.setState({
            reportTextContent: event.currentTarget.value
        });
        // console.log('ActiveReports handleReportTextChange reportTextContent', this.state.reportTextContent);   // debug
    }

    closeLightbox() {
        this.setState({
            isImageLightBoxOpen: false
        });
    }

    render() {
        const { isEditingReport, isEditReportButtonClickable } = this.state;
        return (
            <div className="report-list">
                {
                    this.state.isImageLightBoxOpen ? 
                        <Lightbox 
                            className="lighbox-target"
                            mainSrc={this.state.enlargeImageLocation}
                            // nextSrc={files.length == 1 ? null : files[(uploadImageIndex + 1) % files.length].preview}
                            // prevSrc={files.length == 1 ? null : files[(uploadImageIndex + files.length - 1) % files.length].preview}
                            onCloseRequest={this.closeLightbox}
                            // onMovePrevRequest={this.movePrev}
                            // onMoveNextRequest={this.moveNext}
                        />
                    : null
                }
                <div className="report-list-container">
                    <div className="player-container">
                        <div className="player-photo-container">
                            <div className="player-photo-container__photo">
                            </div>
                        </div>
                        {
                            this.state.starterReportList.map( (reportObject, index) => {
                                return (
                                    <div className="player-report-container" key={`starter-report-${index}`}>
                                        {
                                            reportObject.image_location ? 
                                                <div className="report-content-container">
                                                    <img className="report-content report-content__image" 
                                                        src={reportObject.image_location}
                                                        onClick={this.handleImageEnlarge}
                                                    />
                                                </div>
                                            : null
                                        }
                                        {
                                            reportObject.content ?
                                                !isEditingReport ? 
                                                    <div className="report-content-container">
                                                        <button
                                                            onClick={this.handleReportEditClick}
                                                            disabled={!isEditReportButtonClickable}
                                                        >
                                                            編輯
                                                        </button>
                                                        <div className="report-content report-content__text">
                                                            {reportObject.content}
                                                        </div>
                                                    </div>
                                                :
                                                    <Textarea 
                                                        className="report-content__text-edit"
                                                        minRows={2}
                                                        onChange={this.handleReportTextChange}
                                                        onKeyDown={this.handleReportEditText}
                                                        defaultValue={reportObject.content}
                                                        id={`s-${index}`}
                                                    />
                                            : null
                                        }
                                        <CommentBox 
                                            oldComments={reportObject.comments}
                                            report_id={reportObject.report_id} 
                                            {...this.props} 
                                        />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="report-list-container">
                    <div className="player-container">
                        <div className="player-photo-container">
                            <div className="player-photo-container__photo">
                            </div>
                        </div>
                        {
                            this.state.playerReportList.map( (reportObject, index) => {
                                return (
                                    <div className="player-report-container" key={`player-report-${index}`}>
                                        {
                                            reportObject.image_location ? 
                                                <div className="report-content-container">
                                                    <img className="report-content report-content__image" 
                                                        src={reportObject.image_location}
                                                        onClick={this.handleImageEnlarge}
                                                    />
                                                </div>
                                            : null
                                        }
                                        {
                                            reportObject.content ?
                                                !isEditingReport ? 
                                                    <div className="report-content-container">
                                                        <button
                                                            onClick={this.handleReportEditClick}
                                                            disabled={!isEditReportButtonClickable}
                                                        >
                                                            編輯
                                                        </button>
                                                        <div className="report-content report-content__text">
                                                            {reportObject.content}
                                                        </div>
                                                    </div>
                                                :
                                                    <Textarea 
                                                        className="report-content__text-edit"
                                                        minRows={2}
                                                        onChange={this.handleReportTextChange}
                                                        onKeyDown={this.handleReportEditText}
                                                        defaultValue={reportObject.content}
                                                        id={`p-${index}`}
                                                    />
                                            : null
                                        }
                                        <CommentBox 
                                            oldComments={reportObject.comments}
                                            report_id={reportObject.report_id} 
                                            {...this.props} 
                                        />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
};

class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAfterPost: false,
            newCommentList: []
        };
        this.updateNewCommentList = this.updateNewCommentList.bind(this);
        this.updateNewCommentListAfterPost = this.updateNewCommentListAfterPost.bind(this);
    }

    updateNewCommentList(commentContent) {
        const { newCommentList } = this.state;
        const commentObject = {};
        commentObject.content = commentContent
        newCommentList.push(commentObject);
        this.setState({
            newCommentList
        });
    }

    updateNewCommentListAfterPost(updatedCommentList) {
        this.setState({
            isAfterPost: true,
            newCommentList: updatedCommentList
        });
    }

    render() {
        const { isAfterPost, newCommentList } = this.state; 
        return (
            <div className="player-report-comment-box-container">
                <CommentList
                    newCommentList={newCommentList}
                    isAfterPost={isAfterPost}
                    {...this.props} 
                />
                <CommentForm 
                    updateNewCommentList={this.updateNewCommentList}
                    updateNewCommentListAfterPost={this.updateNewCommentListAfterPost}
                    {...this.props} 
                />
            </div>
        );
    }
};

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentContent: null
        };
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    handleCommentSubmit(event) {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault();
            const commentContent = event.target.value;
            this.setState({
                commentContent
            });
            this.props.updateNewCommentList(commentContent);

            const commentPost = {
                'type': 'report',
                'report_id': this.props.report_id,
                'content': commentContent
            };
            // console.log('CommentForm handleCommentSubmit commentPost', commentPost);   //debug
            axios.post('/apis/comment', commentPost)
            .then(response => {
                if(response.data.status == '200') {
                    // console.log('CommentForm updateNewCommentListAfterPost');   // debug
                    this.props.updateNewCommentListAfterPost(response.data.ludo.Attributes.comments);
                } else {
                    console.log('CommentForm post message from server: ', response.data.message);
                    console.log('CommentForm post error from server: ', response.data.err);
                }
            })
            .catch(error => {
                console.log('CommentForm post error', error);
            });

            /* clear the text area of comment form */
            event.target.value = null;
            this.setState({
                commentContent: null
            });
        }
    }

    render() {
        return (
            <div className="comment-container">
                <div className="comment-avatar-container">
                    <img className="comment__avatar" 
                        src="https://api.fnkr.net/testimg/350x200/00CED1/FFF/?text=img+placeholder"
                    />
                </div>
                <Textarea className="comment__message"
                    minRows={2} onKeyDown={this.handleCommentSubmit} placeholder="留言..."
                />
            </div>
        );
    }
}

class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="comment-list">
                {
                    this.props.oldComments && !this.props.isAfterPost? 
                    this.props.oldComments.map( (commentObject, index) => {
                        return (
                            <div className="comment-container" key={`comment-${index}`}>
                                <div className="comment-avatar-container">
                                    <img className="comment__avatar" src="https://api.fnkr.net/testimg/350x200/00CED1/FFF/?text=img+placeholder" />
                                </div>
                                <div className="comment__message">
                                    {commentObject.content}
                                </div>
                            </div>
                        )
                    })
                    : null
                }
                {
                    this.props.newCommentList.map( (commentObject, index) => {
                        // console.log('newCommentList');   // debug
                        return (
                            <div className="comment-container" key={`new-comment-${index}`}>
                                <div className="comment-avatar-container">
                                    <img className="comment__avatar" src="https://api.fnkr.net/testimg/350x200/00CED1/FFF/?text=img+placeholder" />
                                </div>
                                <div className="comment__message">
                                    {commentObject.content}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
};
                // {
                //     this.props.oldComments ? 
                //     this.props.oldComments.map( (commentObject, index) => {
                //         return (
                //             <div className="comment-container" key={`comment-${index}`}>
                //                 <div className="comment-avatar-container">
                //                     <img className="comment__avatar" src="https://api.fnkr.net/testimg/350x200/00CED1/FFF/?text=img+placeholder" />
                //                 </div>
                //                 <div className="comment__message">
                //                     {commentObject.content}
                //                 </div>
                //             </div>
                //         );
                //     })
                //     : null
                // }
