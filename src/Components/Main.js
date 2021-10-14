import React, { Component } from 'react'
import ForcastingDetails from './ForcastingDetails';
import "./main.css"
import {Animated} from "react-animated-css";




class Main extends Component {

        state={
            cityName:"",
            inputCityName:"",
            weatherDetails:"",
            currentDetails:"",
            currentIcon:"",
            countryName:"",
            feelsLike:"",
            currentDesc:"",
            windSpeed:"",
            windSi:"",
            minTemp:"",
            minTempIcon:"",
            maxTemp:"",
            maxTempIcon:"",
            windSpeedIcon:"",
            populations:"",
            populationIcon:"",
            animeError:"",
            descriptions:[],
            time:[],
            temperature:[],
            
            weatherIcon:[],
            key:[],
            Celsius:"",
            isVisible:false,
            buttonVisible:false,
            animeVisibility:false,
            

            
        }

        inputRef = React.createRef()

        componentDidMount(){
            this.inputRef.current.focus()
        }

        inputHandler=(event)=>{
            this.setState({inputCityName:event.target.value})
        }
    

        visibilityHandler=()=>{
            if(!this.state.isVisible){
                this.setState({isVisible:true})
            }
            else{
                this.setState({isVisible:false})
            }
            
        }
    
    onClickToShow=(event)=>{
        
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.inputCityName}&units=metric&appid=18c1a68730497ed99ff8e1d3e2a2045d`)
        .then((response) => response.json())
        .then((data)=>{
            this.setState({cityName:data.city.name})
            this.setState({currentDetails:data.list[0].main.temp})
            this.setState({ currentIcon:`http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`})
            this.setState({countryName:data.city.country})
            this.setState({feelsLike:data.list[0].main.feels_like})
            this.setState({currentDesc:data.list[0].weather[0].description})
            this.setState({windSpeed:data.list[0].wind.speed,windSpeedIcon:"fas fa-wind fa-1x customWindIcon"})
            this.setState({minTemp:data.list[0].main.temp_min,minTempIcon:"fas fa-temperature-low fa-1x customWindIcon"})
            this.setState({maxTemp:data.list[0].main.temp_max,maxTempIcon:"fas fa-temperature-high fa-1x customWindIcon"})
            this.setState({populations:data.city.population,populationIcon:"fas fa-user-friends fa-1x customWindIcon"})
            this.setState({windSi:"km"})
            this.setState({descriptions:data.list.map((item)=>{
                return{
                    key:item.dt,
                    CloudsDetails:item.weather[0].description,
                    timing:item.dt_txt,
                    temperature:item.main.temp,
                    weatherIcon:`http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
                   
                }
                
            })})
            if(!this.state.buttonVisible){
                this.setState({buttonVisible:true})
            }
            this.setState({
                Celsius:"°C",
                animeVisibility:true,
                
            })
           
           
        })
        
        .catch(err => {
	        console.log(err);
        });
        
        event.preventDefault()
    }

    render() {
        let moreDetails
        let buttonVisibility

        if(this.state.buttonVisible){
            buttonVisibility =  <button className="btn btn-outline-dark custom-moreButton" onClick={this.visibilityHandler}>More details...</button>
        }
        else{
            buttonVisibility=null
        }

        if(this.state.isVisible){
            moreDetails = <ForcastingDetails values={this.state.descriptions} />
            
        }
        
        else{
            moreDetails=null
            
        }
      
        return (
            <React.Fragment>
                {/* Input Section */}
                
                <Animated animationIn="animate__backInDown" className="current-Details-section col-lg-6 col-12 container p-3 ">
                <h1>Weather</h1>
                    <div className="weatherSection pt-3">
                        <form className="d-flex flex-column col-lg-6 col-12 mx-auto">
                            <Animated animationIn={this.state.animeError} >
                                <input ref={this.inputRef} type="text" className="text-white form-control mb-3 custom-input" value={this.state.inputCityName} onChange={this.inputHandler} placeholder="City name"/>
                            </Animated>
                            {this.err}
                            <button type="submit" className="btn custom-search-button mx-auto px-5" onClick={this.onClickToShow}>Search</button>
                        </form>
                    </div>
                   
                  
                    {/* Current Details */}
                    <div className="d-flex justify-content-between currentWeatherCard">
                        <Animated animationIn="animate__flipInX" className="current-details p-lg-3  pt-lg-5 pt-3" isVisible={this.state.animeVisibility}>
                            <p className="mb-0">{this.state.cityName}, {this.state.countryName}</p>
                            <div className="d-flex">
                                <p className="my-auto feelsLike">{this.state.currentDesc}</p>
                                <img src={this.state.currentIcon} alt=""/>
                            </div>
                            <p className="feelsLike">Feels Like {this.state.feelsLike} {this.state.Celsius}</p>
                            <p className="temp my-auto">{this.state.currentDetails} {this.state.Celsius}</p>
                        </Animated>
                        <Animated className="current-details d-flex flex-column align-items-center justify-content-between p-lg-3 pt-lg-5 pt-3 " animationIn="animate__flipInX" isVisible={this.state.animeVisibility}>
                            <i className={this.state.windSpeedIcon}>  {this.state.windSpeed} {this.state.windSi}</i>
                            <i className={this.state.minTempIcon}> {this.state.minTemp} {this.state.Celsius}</i>
                            <i className={this.state.maxTempIcon}> {this.state.maxTemp} {this.state.Celsius}</i>
                            <i className={this.state.populationIcon}>  {this.state.populations}</i>
                        </Animated>
                        
                  </div>
                </Animated>
                <Animated className="d-flex justify-content-center m-3 p-lg-3 pt-lg-0 pt-2" animationIn="animate__fadeInLeft" isVisible={this.state.buttonVisible}>
                    {buttonVisibility}
                </Animated>
                <div className="p-2"> 
                    {moreDetails}
                </div>
            </React.Fragment>
        )
    }
}

export default Main
