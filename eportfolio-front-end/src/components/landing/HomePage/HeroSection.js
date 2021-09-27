import React from 'react';
import './HeroSection.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';


function HeroSection({
  lightBg,
  topLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  buttontrue,
  buttonLabel,
  img,
  alt,
  imgStart,
}) {

  return (
    <>
      <div
        className={lightBg ? 'home__hero-section' : 'home__hero-section darkBg'}
      >
        <div className='container'>
          <div
            className='row home__hero-row'
            style={{
              display: 'flex',
              flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'
            }}
          >
            <div className='col'>
              <div className='home__hero-text-wrapper'>
                <div className='top-line'>{topLine}</div>
                <div className={lightText ? 'heading' : 'heading dark'}>
                  {headline}
                </div>
                <p
                  className={
                    lightTextDesc
                      ? 'home__hero-subtitle'
                      : 'home__hero-subtitle dark'
                  }
                >
                  {description}
                </p>
                {buttontrue ? 
                    <>
                    <Link to='/register'>
                    <Button buttonSize='btn--wide' buttonColor='blue'>
                        {buttonLabel}
                    </Button>
                    </Link>
                    <Link to="/login" className={lightTextDesc ? 'login_text light':"login_text dark"}> Log in </Link>
                    </>
                    :
                    null
                }
              </div>
            </div>
            <div className='col'>
              <div className='home__hero-img-wrapper'>
                <img src={img} alt={alt} className='home__hero-img' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
