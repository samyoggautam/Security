import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import maleTourist from '../assets/images/male-tourist.png'
import './newsletter.css'

const NewsLetter = () => {
   return (
      <section className='newsletter'>
         <Container>
            <Row>
               <Col lg='6'>
                  <div className="newsletter__content">
                     <h2>Follow us to get useful information</h2>

                     <div className="newsletter__input">
                        <input type="email" placeholder='Follow us in social media platform'/>
                        <button className="btn newsletter__btn">Follow</button>
                     </div>
                     <p>we are active on facebook,instagram & youtube also twitter
                     </p>
                  </div>
               </Col>
               <Col lg='6'>
                  <div className="newsletter__img">
                     <img src={maleTourist} alt="" />
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default NewsLetter