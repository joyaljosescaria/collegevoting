import React from 'react'
import { Link } from 'react-router-dom'
import './Lost.css'

export default function Lost() {
    return (
        <>
            <div className="d-flex p-5 bac">
                <div className="wrapper py-4">
                    <h1 className="text-primary">Hmm...😑</h1>
                    <p className="text-secondary">It seems that you're lost in an empty space. No nomination this time. Look back later</p>
                    <Link to="/student/index"><a className="text-danger">Take Me Home</a></Link>
                </div>
                <div style={{ width: '100%', height: '100%' }} className="col-md-4">
                    <img src={"https://i.pinimg.com/originals/c5/d2/cf/c5d2cf3f4c66680e3182e58e4f533e0f.gif"} className="imgs" />
                </div>
            </div>
        </>
    )
}
