import { useEffect } from 'react';
import { useState }from 'react';
import axios from 'axios';

import './App.css'

function App() {

  const [data , setData] = useState([]);
  const [filteredData ,setFilteredData] = useState(null);
  const [filterValue , setFilterValue] = useState(null); 


  useEffect(()=>{
    const fetchData = async () => {
      const url = "https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6";
      const response = await axios.get(url);
      setData(response.data);
    }
  fetchData();
  } , [])


    const changeInput = (e) => {
      e.preventDefault();
      setFilterValue(e.target.value);
    }

    const filterData = (event) => {
      event.preventDefault();
      // Filter the data based on the input value and update the filteredData state
    
      const filteredItems = data.filter(
        (item) =>
          item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.description.toLowerCase().includes(filterValue.toLowerCase())
      );
      setFilteredData(filteredItems);
    }



  
  return (
    <>
    
<div className='container p-4'>
<form  onSubmit={filterData}>
 <div className='d-flex  my-2 p-2 ' >
    <input className="mr-3 p-2 mb-2 p-2 filterInput" name="filter" type="text" onChange={changeInput} placeholder='Search by filter'/>
     <button className='mb-2 col-md-1 btn btn-success p-2 rounded-end' onSubmit={filterData}>Search</button>
    </div>
    </form>
    <div className='row row-cols-1 row-cols-md-4 g-3 gx-2 '>
    {  
      filteredData == null ? 
      data.map((item , index) => { 
     return ( 
      <div className="col" key={item.id}>
        <div className="card custom-card">
        <img className='p-4 mx-auto' src={item.image_url} alt="" height="400px" width="150px" />
        <div className="card-body">
          <h2>{item.name.substring(0,13)}</h2>
          <p>{item.description.length <= 300 ?  item.description  :  item.description.substring(0,300)}</p>
        </div>
        </div>
        </div>
      )
 }) 
 :
  filteredData.map((item , index) => { 
     return ( 
      <div className="col" key={item.id}>
        <div className="card custom-card">
        <img className='p-4 mx-auto' src={item.image_url} alt="" height="400px" width="150px" />
        <div className="card-body">
          <h2>{item.name.substring(0,13)}</h2>
          <p>{item.description.length <= 300 ?  item.description  :  item.description.substring(0,300)}</p>
        </div>
        </div>
        </div>
      )
 }) }
</div>

</div>
     
    </>
  )
}

export default App
