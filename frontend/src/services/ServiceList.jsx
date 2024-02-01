import React from 'react'
import { Col } from 'reactstrap'
import customizationImg from '../assets/images/customization.png'
import guideImg from '../assets/images/guide.png'
import weatherImg from '../assets/images/weather.png'
import ServiceCard from './ServiceCard'

const servicesData = [
   {
      imgUrl: weatherImg,
      title: `Calculate Weather`,
      desc: `we provide weather forcast to our users`,
   },
   {
      imgUrl: guideImg,
      title: `Best Tour Guide`,
      desc: `we provide the best possible tour guide`,
   },
   {
      imgUrl: customizationImg,
      title: 'Customization',
      desc: `customers can customize their choice of hiking and trails`,
   },
]

const ServiceList = () => {
   return <>
      {
         servicesData.map((item, index) => (
            <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
               <ServiceCard item={item} />
            </Col>))
      }
   </>

}

export default ServiceList