import React from 'react';
import '../styles/ContactPage.css'


const Contact = () => {
  return (

    <>
       
    <div class="contact-container">
      <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h2 class="display-4 fw-normal" style={{fontFamily: 'sans-serif', padding:'10px 10px 5px 10px', fontWeight:'bold'}}>CONTACT US</h2>
        <p class="fs-5 text-body-secondary" style={{fontFamily: 'sans-serif', fontSize: '14px'}}>Got questions? We are here to help!</p>
      </div>
      <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm border-dark">
            <div class="card-header py-3" style={{backgroundColor:'#f5ba13'}}>
              <h4 class="my-0 fw-normal" style={{color: 'white', fontWeight:'bold'}}>EMAIL</h4>
            </div>
            <div class="card-body">
              <ul class="list-unstyled mt-3 mb-4">
                <li>Typical reply time: within a day or two</li>
                <li>Everyday 6AM to 6PM IST</li>
                <li>communications@intellishop.com</li>
                <li className='emoji'>📧</li>
              </ul>
      
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm border-dark">
            <div class="card-header py-3" style={{backgroundColor:'#f5ba13'}}>
              <h4 class="my-0 fw-normal" style={{color: 'white', fontWeight:'bold'}}>HELP CENTER</h4>
            </div>
            <div class="card-body">
              <ul class="list-unstyled mt-3 mb-4">
                <li>Typical reply time: within a minute or two</li>
                <li>Everyday 10AM to 6PM IST</li>
                <li>+120-5446787879</li>
                <li>+120-5446800333</li>
                <li className='emoji'>📞</li>
              </ul>
              
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm border-dark">
            <div class="card-header py-3" style={{backgroundColor:'#f5ba13'}}>
              <h4 class="my-0 fw-normal" style={{color: 'white', fontWeight:'bold'}}>ADDRESS</h4>
            </div>
            <div class="card-body">
              
              <ul class="list-unstyled mt-3 mb-4">
                <li>A7/34 Bommenahalli, Bidarahalli</li>
                <li>Bengaluru, Karnataka</li>
                <li className='emoji'>📍</li>
              </ul>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  
    </>






  )
}

export default Contact;