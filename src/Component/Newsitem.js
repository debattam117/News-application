import React from 'react'
 //import './newsitemstyle.css';
const Newsitem =(props)=> {

  let{title,description,imgurl,alt,newsurl,author,date,source}=props; //declaring the prop and we are getting the data into 
    return (
      <div className='my-3' style={{width:"286px",margin:"auto"}}>{/*this style is for the adjustment of the cards outer layer divison */}
        <div className="card" style={{width:"18rem"  }}>
      <img src={!imgurl?"https://img.myloview.com/posters/latest-news-symbol-mobile-phone-with-offer-message-media-newspaper-sign-daily-information-customer-service-banner-latest-news-badge-shape-phone-app-speech-bubble-mobile-help-experience-vector-700-234857859.jpg":imgurl} alt={alt} style={{height:"210px", width:"285.5px"}}/>
            <div className="card-body">
                <h5 className="card-title">{title}<span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"90%",fontSize:"12px"}}>{source}<span className="visually-hidden">unread messages</span></span></h5>
                <p className="card-text">{description}..</p>
                <p className="card-text"><small className="text-muted">By {!author?"Unknown": author} on {date}</small></p>
               <div className='btn'>
                <a href={newsurl}  className="btn btn-dark">Go somewhere</a>
                </div> 
            </div>
         </div>
      </div>
    )
  }

  export default Newsitem
