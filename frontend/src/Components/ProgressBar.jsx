import React from 'react';

const Progress_bar = ({ bgcolor, progress, height }) => {
    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: '#809ebc',
        borderRadius: 40,
        overflow: 'hidden' // Ensures smooth rounded corners
    };

    const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius: 40,
        transition: 'width 0.3s ease-in-out', // Animation effect
    };

    return (
        <div style={Parentdiv}>
            <div style={Childdiv}></div>
        </div>
    );
};

export default Progress_bar;