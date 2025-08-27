import React from 'react'
import Page from '@/components/sections/Page'
import Header from '@/components/sections/Header'
import Navigation from '@/components/sections/Navigation'
import Hero from '@/components/sections/Hero'
import Reviews from '@/components/sections/Reviews'
import Logo from '@/components/sections/logo'
import { Main } from '@/components/sections/main'
import Features from '@/components/sections/Features'
import FAQ from '@/components/sections/FAQ/FAQs'
import Testimonial from '@/components/sections/Testimonials/Testimonial'
import Footer from '@/components/sections/Footer'
const page = () => {
  return (
   <div>
    <Page>
      <Header>
        <Navigation/>
        <Hero/>
        <Reviews/>
      </Header>
      <Main>
        <Logo/>
        <Features/>
        <FAQ/>
        <Testimonial/>
        
      </Main>
     


        <Footer/>        
      </Page>
   </div>
  )
}

export default page