import React, { useEffect , useState} from 'react'

import axios from 'axios'

export default function Temppage() {

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    axios.get('https://api.first.org/data/v1/countries',{
      headers:{
        // 'apy-token': 'APY0jJE9HxtW3A0f9GtpKEjYZ1Iwp6ncUHnNlHyPDpFFBAOuVM6MourVRNh1e8eU5ojdGS3HiYPiS',
        // 'Content-Type': 'application/json'
      }
    })
    .then(response=>{
      const countriesData = response.data?.data;
      console.log(countriesData);
      if (countriesData) {
        const countryNames = Object.values(countriesData).map(item => item.country);
        setCountries(countryNames);
        setLoading(false);
      } else {
        setError("Failed");
        setLoading(false);
      }
    })
    .catch((error)=>{
      if(error.response?.status==429){
        console.log("Too many requests! Try later");}
      else{
        console.log(error);}
    });
  },[]);

  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all',{
      headers:{
        // 'apy-token': 'APY0jJE9HxtW3A0f9GtpKEjYZ1Iwp6ncUHnNlHyPDpFFBAOuVM6MourVRNh1e8eU5ojdGS3HiYPiS',
        // 'Content-Type': 'application/json'
      }
    })
    .then(response=>{
      const currencyData = response.data;
      console.log(currencyData);
    })
    .catch((error)=>{
      if(error.response?.status==429){
        console.log("Too many requests! Try later");}
      else{
        console.log(error);}
    });
  },[]);
  
  if (loading) {
    return <div>Loading country list...</div>;
  }

  if (error) {
    return <div>Error loading countries: {error}</div>;
  }

  return (
    <div>
      Country list: 
      <ul>
        {countries.map((country, index) => (
          <li key={index}>{country}</li>
        ))}
      </ul>
    </div>
  )
}
