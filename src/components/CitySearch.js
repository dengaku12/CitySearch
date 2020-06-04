import React, {Component} from 'react';
import axios from 'axios';

class CitySearch extends Component{
    constructor(props){
        super(props);
        this.state = {
            zipCodes: [],
            city: "",
        };
        this.handleCityChange = this.handleCityChange.bind(this);
    }
    
    handleCityChange(e){
        this.setState({
            city: e.target.value,
        });
    }
    componentDidUpdate(){
        axios.get(`http://ctp-zip-api.herokuapp.com/city/${this.state.city.toUpperCase()}`)
        .then((response)=>{
            const data = response.data;
            const zipObj = {
                zipCodes: data
            };
            this.setState({zipCodes: zipObj});
        }
        )
        .catch((err)=>console.log(err));
    }
   render(){
       let display;
       if(!this.state.zipCodes.zipCodes){
           display = <p>Loading...</p>
       }else{
        display=(
            <>
            <ul>
            {this.state.zipCodes.zipCodes.map((zipcode) => <li key= { zipcode }> {zipcode} </li>)}
            </ul>
            </>
        );
       }
       
       return(
        <>
            <div>
                {this.state.submit}
                <div>
                    <label for="CityName">CityName</label>
                    <input
                        type="text"
                        name = "CityName"
                        value = {this.state.city}
                        onChange={this.handleCityChange}
                    />
                    {display}
                </div>
            </div>
        </>
       ); 
   }
}

export default CitySearch;