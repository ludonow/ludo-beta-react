import React from 'react';
import styled from 'styled-components';

const EmptyDraft = ({
    handleStepNext,
    reportType
}) => {
    switch(reportType) {
        case 'image':
            return (
                <div>
                    <div>
                        empty image
                    </div>
                    <div>
                        empty text
                    </div>
                </div>
            );
        case 'text':
            return (
                <div>
                    empty text
                </div>
            );
        case 'video':
            return (
                <div>
                    <div>
                        empty video
                    </div>
                    <div>
                        empty text
                    </div>
                </div>
            );
        default:
            return (
                <div>
                    please select a type
                </div>
            );
    }
};

export default EmptyDraft;
