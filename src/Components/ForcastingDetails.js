import React, { Component } from 'react'
import "./ForcastingDetails.css"
import Moment from 'react-moment';
import 'moment-timezone';
import { AnimationOnScroll } from 'react-animation-on-scroll';


class ForcastingDetails extends Component {

     
    render() {
        const {values,time}=this.props
        
       
        
        return (
            <React.Fragment>
                <div className="container-lg detailSection d-flex">
                    {values.map((item)=>{
                        return(
                        <AnimationOnScroll animateIn="animate__fadeInRight" className="Weather-card col-lg-3 col-md-7 col-11 m-2 p-3" key={item.key}>
                            <div className="d-flex justify-content-between p-2">
                                <Moment format="dddd" >
                                    {item.timing}
                                </Moment>
                                <Moment format="DD-MMM-yy" >
                                    {item.timing}
                                </Moment>
                                <Moment format="hh:mm a" >
                                    {item.timing}
                                </Moment>
                            </div>
                           
                            <p className="temperature">{item.temperature}&#xb0;C</p>
                            <img className="icons" src={item.weatherIcon} alt=""/>
                            <p>{item.CloudsDetails}</p>
                        </AnimationOnScroll>
                        )
                    })}
                    {time}
                </div>
                
            </React.Fragment>
        )
    }
}

export default ForcastingDetails
