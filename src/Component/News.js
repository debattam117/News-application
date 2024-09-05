import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner.js'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News =(props)=> {

    const [articles,setArticles]= useState ([])
    const [loading,setLoading]= useState(true)
    const [page,setPage]= useState(1)
    const [totalResults,setTotalResults]= useState(0)


     
    const  capitalFirst =(SString)=>
    {
           return SString.charAt(0).toUpperCase()+SString.slice(1);          //We are getting the value into this function from props and we are passing an argument named SString and returning it
    }

    //document.title=`${capitalFirst(props.category)} - NewsMonkey`;

    
  

  

   /*async componentDidMount()
  {
    let urls="https://newsapi.org/v2/everything?q=apple&from=2023-08-14&to=2023-08-14&sortBy=popularitycategory=${props.category}&apiKey=b6dd62f2eb3041729cf2b7488b5c315e";
    fetch(urls)

    .then(data =>data.json())
      .then(res=> {this.setState({articles: res.articles})
       })

      console.log(this.articles)
  }*/

      //let urls=`https://newsapi.org/v2/top-headlines?country=us&apiKey=b6dd62f2eb3041729cf2b7488b5c315e`;
// Another way to use fetchapi  let urls=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b6dd62f2eb3041729cf2b7488b5c315e&page=${page}&pageSize=${props.pageSize}`;
//  console.log("Props: ", props.country);
 const updateNews = async () => {

  props.setProgress(10);
  let urls=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b6dd62f2eb3041729cf2b7488b5c315e&page=${page}&pageSize=${props.pageSize}`;
  setLoading(true)
  let data=await fetch(urls);
  props.setProgress(30);
  let parsedData=await data.json();
  console.log(parsedData);
  props.setProgress(70);

  setArticles(parsedData.articles)   //here we are storing the json format result i.e objects into the article state variable
  setTotalResults(parsedData.totalResults)
  setLoading(false)

  
  console.log(data)
  props.setProgress(100);

}


//Replace componentDidmount and using useeffect
useEffect(()=>{             
updateNews();
// eslint-disable-next-line 
}, [])



    // const handlePrevClick = async ()=>{
    
    // setPage(page-1)
    // updateNews();

    // }

    // const handleNextClick = async ()=>{
    //   setPage(page+1)
    //   updateNews();
  
    // }

    const fetchMoreData = async () => {
      
      
      let urls=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b6dd62f2eb3041729cf2b7488b5c315e&page=${page+1}&pageSize=${props.pageSize}`; //bug fix
      setPage(page+1)
      setLoading(true)
      let data=await fetch(urls);
      let parsedData=await data.json();
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
      setLoading(false)
      
      
    }

 
    return (
        <div className='Container1' style={{}}>
      <div className="Containermain" style={{width:"1700px",margin:"auto"}} >
        <h2 style={{paddingTop:"100px",paddingBottom:"50px", marginLeft:"460px",fontSize:"40px"}}>NewsMonkey - Top Headlines on {capitalFirst(props.category)}</h2>
        {loading&&<Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalResults}
          loader={<Spinner/>}
        >

           <div className='row' style={{justifyContent:"between"}}>
               {articles.map((element)=>{    //here we are maping the article array element is an argument we are passing in article.map
                 return <div className='col-md-4' key={element.url} >
                           <Newsitem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,100):""} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} alt="1"/>
                        </div>
               })}
           </div>
         </InfiniteScroll>
           

      </div>
      </div>
    )
  
}

News.defaultProps={
  country:'in',
  pageSize:6,
  category: 'general'
}

News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string

}

export default News


//example of map 

// map() creates a new array from calling a function for every array element.

// map() does not execute the function for empty elements.

// map() does not change the original array.

// const persons = [
//   {firstname : "Malcom", lastname: "Reynolds"},
//   {firstname : "Kaylee", lastname: "Frye"},
//   {firstname : "Jayne", lastname: "Cobb"}
// ];

// persons.map(getFullName);

// function getFullName(item) {
//   return [item.firstname,item.lastname].join(" ");
// }



// ex-2

// const numbers1 = [45, 4, 9, 16, 25];
// const numbers2 = numbers1.map(myFunction);

// function myFunction(value, index, array) {
//   return value * 2;
// }

// Create a new array by performing a function on each array element:

// 90,8,18,32,50