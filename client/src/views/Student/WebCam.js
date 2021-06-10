import React, { Component, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import './cameraStyles.css'
import Webcam from "react-webcam";
import { uploadSelfi } from '../../actions/student';

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 260,
    height: 200,
    facingMode: "user"
};

const WebcamCapture = (props) => {



    const webcamRef = React.useRef(null);

    const [src, setSrc] = useState('');

    var timestamp = new Date().getTime();
    var uid = props.match.params.uniqueId

    var names = timestamp.toString() + uid.toString()

    const handleSubmit = () => {

        props.uploadSelfi(uid, src);
    }

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            props.uploadSelfi(uid, imageSrc);
            setSrc(imageSrc)
            // handleSubmit()
        },

        [webcamRef]
    );

    if (props.student.isSelfiUploaded) {
        return <Redirect to="/auth/student/login" />
    }

    return (
        <>
            <h1 className="text-white text-center">Capture Face to Continue</h1>
            <div className="container">
                {src == '' ? <Webcam
                    style={{ border: '2px solid #2dce89', marginTop: '20px', borderRadius: '10px' }}
                    className="text-center"
                    audio={false}
                    height={200}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={260}
                    videoConstraints={videoConstraints}
                /> : <img src={src} style={{ border: '2px solid #2dce89', marginTop: '20px', borderRadius: '10px' }} />}
                {src == '' ? <button className="btn btn-success mt-5" onClick={(e) => { e.preventDefault(); capture(); }}>Capture</button> : <button className="btn btn-success mt-5" onClick={(e) => setSrc('')}>Retake</button>}
            </div>
            {src}
        </>
    );
};


const mapStateToProps = (state) => ({
    studentAuth: state.studentAuth,
    student: state.students
});

export default connect(mapStateToProps, { uploadSelfi })(WebcamCapture)