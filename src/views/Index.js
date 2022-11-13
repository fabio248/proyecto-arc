import React from 'react';
// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import CardsFooter from 'components/Footers/CardsFooter.js';

// index page sections
import Hero from './IndexSections/Hero.js';
import Carousel from './IndexSections/Carousel.js';
import Formulario from './Simulacion/Formulario.js';

class Index extends React.Component {
  render() {
    return (
      <>
        <main ref='main'>
          <Hero />
          <section
            className='section section-components'
            id='section-simulador'
          >
            <Formulario />
          </section>
          <Carousel />
        </main>
        <CardsFooter />
      </>
    );
  }
}

export default Index;
