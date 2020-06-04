import React, {Component} from 'react';
import axios from 'axios';

class CitySearch extends Component{
    constructor(props){
        super(props);
        this.state = {
            zipCodes: []
        };
    }
    componentDidMount(){
        axios.get("http://ctp-zip-api.herokuapp.com/city/SPRINGFIELD")
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
        <div className= "cityName">{display}</div>
       ); 
   }
}

export default CitySearch;