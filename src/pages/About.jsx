import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ThreeCanvas from '../components/ThreeCanvas';
import Stars from '../components/Stars';

const AboutContainer = styled.section`
  position: relative;
  min-height: 100vh; /* Changed from fixed height to minimum height */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 4rem 0; /* Added padding to ensure content doesn't get cut off */
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    align-items: flex-start;
    padding-top: 6rem; /* Extra padding on top for mobile to account for navbar */
    overflow-y: auto; /* Allow scrolling on mobile */
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.2rem; /* Further reduced padding */
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: auto; /* Allow natural height on mobile */
    padding: 0 1rem;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    height: 92%; /* Keep the height constraint on larger screens */
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  margin-bottom: 2rem;
  text-align: center;
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const AboutContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem; /* Further reduced gap */
  flex: 1;
  overflow: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: 1rem;
    overflow: visible; /* Show all content on mobile */
  }
`;

const ProfileSection = styled(motion.div)`
  flex: 0.35; /* Take even less space - reduced from 0.4 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: none;
    margin-bottom: 1rem;
  }
`;

const ProfileImagePlaceholder = styled(motion.div)`
  width: clamp(150px, 20vh, 180px); /* Responsive sizing */
  height: clamp(150px, 20vh, 180px); /* Responsive sizing */
  border-radius: 10px;
  margin: 0 auto 0.5rem; /* Further reduced bottom margin */
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: clamp(120px, 15vh, 150px); /* Smaller on mobile */
    height: clamp(120px, 15vh, 150px); /* Smaller on mobile */
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, ${props => props.theme.colors.primary}, transparent);
    opacity: 0.2;
    border-radius: 10px;
    pointer-events: none;
  }
`;

const InfoSection = styled(motion.div)`
  flex: 0.65;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  overflow-x: hidden;
  padding-right: 0.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: none;
    padding-right: 0;
    overflow-y: visible; /* Ensure text is fully visible on mobile */
    margin-bottom: 2rem; /* Add space at bottom for mobile */
  }
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary}50;
    border-radius: 3px;
  }
`;

const AboutText = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.secondary};
  line-height: 1.6;
  margin-bottom: 0.8rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const SkillsContainer = styled(motion.div)`
  margin-top: 0.4rem; /* Further reduced from 0.6rem */
`;

const SkillsTitle = styled.h3`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(100% / 10), 1fr)); /* Increased to 10 columns */
  gap: 0.3rem; /* Further reduced from 0.4rem */
  
  @media (max-height: 700px) {
    grid-template-columns: repeat(auto-fill, minmax(calc(100% / 12), 1fr)); /* 12 columns for smaller heights */
  }
`;

const Skill = styled(motion.div)`
  background-color: ${props => props.theme.colors.tertiary};
  padding: 0.3rem; /* Further reduced from 0.4rem */
  border-radius: 4px; /* Reduced from 6px */
  text-align: center;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  
  &:hover {
    transform: translateY(-2px);
    background-color: ${props => props.theme.colors.primary}20;
  }
`;

const SkillIcon = styled.img`
  width: clamp(16px, 2.5vh, 20px); /* Responsive icon sizing */
  height: clamp(16px, 2.5vh, 20px); /* Responsive icon sizing */
  object-fit: contain;
  margin-bottom: 0.1rem; /* Further reduced */
`;

const SkillName = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.secondary};
  margin-top: 0.2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.7rem;
  }
`;

const BackgroundCanvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const [skills] = useState([
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { name: 'NestJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' }
  ]);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.15, // Reduced from 0.2
        staggerChildren: 0.08, // Faster stagger
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 }, // Reduced y movement from 15
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 } // Faster transition
    },
  };
  
  return (
    <AboutContainer id="about">
      <BackgroundCanvas>
        <ThreeCanvas camera={{ position: [0, 0, 1] }} controls={false}>
          <Stars />
        </ThreeCanvas>
      </BackgroundCanvas>
      
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: -10 }} // Reduced y movement from -15
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }} // Faster transition
        >
          About <span>Me</span>
        </SectionTitle>
        
        <AboutContent>
          <ProfileSection
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <ProfileImagePlaceholder
              variants={itemVariants}
            >
              <img src="https://media.licdn.com/dms/image/v2/C5603AQHTiWwEAZmo-Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1657694491150?e=1752105600&v=beta&t=tGcwZ195J1hLE8kkAMz9rvkcXWMMIHysQOWWyCWcVcs" alt="Boppanapally Shekhar" />
            </ProfileImagePlaceholder>
          </ProfileSection>
          
          <InfoSection
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <AboutText 
              variants={itemVariants}
              initial="hidden"
              animate={controls}
            >
              I'm a detail-oriented Full Stack Developer with over 2 years of experience building scalable applications using Python, React.js, Java, Spring Boot, and NestJS.
            </AboutText>
            
            <AboutText 
              variants={itemVariants}
              initial="hidden"
              animate={controls}
            >
              Currently at Honeywell, I work on the NGOSS initiative in the aerospace sector, enhancing in-flight digital experiences. I'm proficient in Python and Java, with a strong foundation in Data Structures, Algorithms, and OOP principles.
            </AboutText>
            
            <AboutText 
              variants={itemVariants}
              initial="hidden"
              animate={controls}
            >
              I have a 5-star rating in Problem Solving on HackerRank and recognition in the Ideation Competition hosted by BME, BVRIT.
            </AboutText>
            
            <SkillsContainer 
              variants={itemVariants}
              initial="hidden"
              animate={controls}
            >
              <SkillsTitle>My Skills</SkillsTitle>
              <SkillsGrid>
                {skills.map((skill, index) => (
                  <Skill 
                    key={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate={controls}
                    whileHover={{ scale: 1.05 }}
                  >
                    <SkillIcon src={skill.icon} alt={skill.name} />
                    <SkillName>{skill.name}</SkillName>
                  </Skill>
                ))}
              </SkillsGrid>
            </SkillsContainer>
          </InfoSection>
        </AboutContent>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About;