import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import ThreeCanvas from '../components/ThreeCanvas';
import Stars from '../components/Stars';

const HomeContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 70px;
  overflow: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    align-items: flex-start;
    padding-top: 120px; /* Increased padding-top for mobile */
  }
  
  @media (max-height: 500px) and (orientation: landscape) {
    height: auto;
    min-height: 100vh;
    padding: 100px 0 50px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 10;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 1rem;
  }
`;

const HeroContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
`;

const Greeting = styled(motion.h3)`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.secondary};
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  line-height: 1.2;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 2rem;
  line-height: 1.2;
  color: ${props => props.theme.colors.secondary};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.secondary};
  margin-top: 1rem;
  max-width: 500px;
  line-height: 1.6;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    max-width: 250px;
  }
`;

const PrimaryButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.5rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.button};
  }
`;

const SecondaryButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.5rem;
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const ComputerCanvas = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const BackgroundCanvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none; /* This ensures the canvas doesn't block interaction */
`;

// Make sure ThreeCanvas inside BackgroundCanvas also doesn't block pointer events
const StyledThreeCanvas = styled(ThreeCanvas)`
  pointer-events: none;
`;

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the screen size is for mobile view
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  // Framer Motion variants
  const fadeIn = (direction, delay) => {
    return {
      hidden: {
        y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
        x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
        opacity: 0,
      },
      show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 0.8,
          delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        },
      },
    };
  };
  
  return (
    <HomeContainer>
      <BackgroundCanvas>
        <StyledThreeCanvas camera={{ position: [0, 0, 1] }} controls={false}>
          <Stars />
        </StyledThreeCanvas>
      </BackgroundCanvas>
      
      <ContentWrapper>
        <HeroContent>
          <Greeting
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            animate="show"
          >
            Hi there, I'm
          </Greeting>
          
          <Title
            variants={fadeIn('up', 0.3)}
            initial="hidden"
            animate="show"
          >
            <span>
              <TypeAnimation
                sequence={[
                  'Shekhar', // Type "Shekhar"
                  2000,       // Wait 2 seconds
                  '',         // Delete all
                  500,        // Wait 0.5 seconds
                  'Shekhar',  // Type "Shekhar" again
                  2000,       // Wait 2 seconds
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ display: 'inline-block', color: 'inherit' }}
              />
            </span>
          </Title>
          
          <Subtitle
            variants={fadeIn('up', 0.35)}
            initial="hidden"
            animate="show"
          >
            Software Engineer at Honeywell
          </Subtitle>
          
          <Description
            variants={fadeIn('up', 0.4)}
            initial="hidden"
            animate="show"
          >
            Full Stack Developer with expertise in building scalable applications using
            React.js, Java, Spring Boot, and NestJS. Passionate about creating innovative
            solutions and delivering high-quality software products.
          </Description>
          
          <ButtonGroup
            variants={fadeIn('up', 0.5)}
            initial="hidden"
            animate="show"
          >
            <PrimaryButton
              to="/projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </PrimaryButton>
            
            <SecondaryButton
              to="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </SecondaryButton>
          </ButtonGroup>
        </HeroContent>
      </ContentWrapper>
      
      {/* Computer model for hero section */}
      {/* <ComputerCanvas>
        <ThreeCanvas controls={false}>
          <ComputerModel isMobile={isMobile} />
        </ThreeCanvas>
      </ComputerCanvas> */}
    </HomeContainer>
  );
};

export default Home;