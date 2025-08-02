import React,{useEffect, useRef,useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'




const TitleCards = ({title,category}) => {

const [apiData,setApiData] = useState([]);
const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDY1ZmFlOTZkNzdhODZiZTU5YmMzNTYyMmNkN2U0MCIsIm5iZiI6MTc1NDAxNzE1OC44NjIwMDAyLCJzdWIiOiI2ODhjMmQ4NjRkZmExNGM2Y2IyNjBlMTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5Mf37yJ19D5s6ehQm_gxO0Y_9vmSTUaGl-Bj7COUHGQ'
  }
};



const handlewheel =(event)=>{
   event.preventDefault();
   cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel',handlewheel);
},[]);



  return (
    <div className='Title-Cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
      {apiData.map((card,index)=>{
         return <Link to={`/player/${card.id}`}className="card" key={index}>
          <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
          <p>{card.original_title}</p>

        </Link>
      })}
      </div>
      
    </div>
  )
}

export default TitleCards
