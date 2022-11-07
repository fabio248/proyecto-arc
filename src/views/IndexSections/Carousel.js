import React from 'react';

// reactstrap components
import { Container, Row, Col, UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: require('assets/img/index/disco-duro.png'),
    altText: 'disco-duro',
    caption: '',
    header: '',
  },
  {
    src: require('assets/img/index/disco-duro-ssd.jpg'),
    altText: '',
    caption: '',
    header: '',
  },
];

class Carousel extends React.Component {
  render() {
    return (
      <>
        <section className='section section-shaped'>
          <div className='shape shape-style-1 shape-default'>
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className='py-md'>
            <Row className='justify-content-between align-items-center'>
              <Col className='mb-5 mb-lg-0' lg='5'>
                <h1 className='text-white font-weight-light'>
                  Algoritmos de planificación
                </h1>
                <p className='lead text-white mt-4'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </Col>
              <Col className='mb-lg-auto' lg='6'>
                <div className='rounded shadow-lg overflow-hidden transform-perspective-right'>
                  <UncontrolledCarousel items={items} />
                </div>
              </Col>
            </Row>
          </Container>
          {/* SVG separator */}
          <div className='separator separator-bottom separator-skew'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              preserveAspectRatio='none'
              version='1.1'
              viewBox='0 0 2560 100'
              x='0'
              y='0'
            >
              <polygon className='fill-white' points='2560 0 2560 100 0 100' />
            </svg>
          </div>
        </section>
      </>
    );
  }
}

export default Carousel;
