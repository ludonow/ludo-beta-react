import React from 'react';

import DropZone from 'react-dropzone';

import uploadIcon from '../../images/active/upload-icon.png';

export default class ReportImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enlargeImageLocation: '',
            files: [],
            image_location: '',
            isImageLightBoxOpen: false,
            isImageUploaded: false
        };
        this.handleImageDrop = this.handleImageDrop.bind(this);
        this.handleImageEnlarge = this.handleImageEnlarge.bind(this);
        this.handleImageEditingCancelClick = this.handleImageEditingCancelClick.bind(this);
        this.handleImageEditingConfirmClick = this.handleImageEditingConfirmClick.bind(this);
        this.handleImageRemove = this.handleImageRemove.bind(this);
    }

    handleImageDrop(files) {
        if (files.length == 1) {
            this.setState({
                files,
                isImageUploaded: true
            });
            const { ludoId }= this.props.params;
            const imgPost = new FormData();
            imgPost.append('file', files[0]);
            axios.post('/apis/report-image', imgPost)
            .then(response => {
                if (response.data.status === '200') {
                    this.setState({
                        image_location: response.data.location
                    });
                } else {
                    console.error('ActiveReports handleImageDrop response from server: ', response);
                    console.error('ActiveReports handleImageDrop message from server: ', response.data.message);
                }
            })
            .catch(error => {
                console.error('ActiveReports handleImageDrop error', error);
            });
        } else if (files.length > 1) {
            this.setState({
                files: []
            });
            window.alert('一次只能上傳一張圖片');
        }
    }

    handleImageEnlarge(event) {
        this.setState({
            enlargeImageLocation: event.currentTarget.src,
            isImageLightBoxOpen: true
        });
    }

    handleImageEditingCancelClick(event) {
        event.preventDefault();
        /* drop the user click target out of image-editing array */
        this.props.handleIsEditingImage(false);
    }

    handleImageEditingConfirmClick(event) {
        event.preventDefault();
        const reportPutBody = {
            content: '',
            image_location: this.state.image_location
        };
        const { reportId } = this.props;
        if (reportId) {
            axios.put(`/apis/report/${reportId}`, reportPutBody)
            .then( response => {
                if(response.data.status === '200') {
                    /* remove the specific element in image-edit array */
                    this.setState({
                        files: [],
                        image_location: '',
                        isEditingImageReportIndex: [],
                        isImageUploaded: false,
                        reportTextContent: '',
                    });
                    this.props.handleShouldReportUpdate(true);
                } else {
                    console.error('ActiveReports handleImageReportModifyConfirmClick report put else response from server: ', response);
                    window.alert(`回報編輯時發生錯誤，請重試一次；若問題依然發生，請通知開發人員`);
                }
            })
            .catch( error => {
                console.error('ActiveReports handleImageReportModifyConfirmClick report put error', error);
                window.alert(`回報編輯時發生錯誤，請重試一次；若問題依然發生，請通知開發人員`);
            });
        }
    }

    handleImageRemove(event) {
        event.preventDefault();
        // const imageIndex = Number(event.currentTarget.value);  // For multiple picture upload
        this.setState({
            files: [],
            isImageUploaded: false
        });
    }

    render() {
        const { isEditingImage, reportObject } = this.props;
        return (
            <div className="report-content-container">
                <img
                    className="report-content report-content__image"
                    src={reportObject.image_location}
                    onClick={this.handleImageEnlarge}
                />
                {
                    isEditingImage ?
                        <div className="editing-image">
                            {/* components/_single-report.scss */}
                            <DropZone
                                accept={["image/png", "image/pjepg", "image/jpeg"]}
                                // TODO: find out why png is not accepted
                                className="upload"
                                maxSize={5242880}
                                onClick={this.handleImageDrop}
                                onDrop={this.handleImageDrop}
                            >
                                <img
                                    alt="重新上傳圖片"
                                    className="upload-picture-button__icon"
                                    src={uploadIcon}
                                />
                                <span className="upload-description">重新上傳圖片</span>
                            </DropZone>
                            <button
                                className="cancel-button"
                                onClick={this.handleImageEditingCancelClick}
                            >
                                取消編輯
                            </button>
                            {
                                this.state.isImageUploaded ?
                                    <div className="upload-preview">
                                        <span className="upload-preview__text">準備變更的圖片: </span>
                                        <div className="upload-preview__image-container">
                                            <img
                                                className="upload-preview__image"
                                                onClick={this.handleImageEnlarge}
                                                src={this.state.files[0].preview}
                                            />
                                            <div className="upload-preview-instruction-container">
                                                <button
                                                    className="upload-preview-instruction__remove"
                                                    onClick={this.handleImageRemove}
                                                    value="0"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                        <button onClick={this.handleImageEditingConfirmClick}>
                                            確定變更
                                        </button>
                                    </div>
                                : null
                            }
                        </div>
                    : null
                }
            </div>
        );
    }
}