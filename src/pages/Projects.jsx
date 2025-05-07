import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ThreeCanvas from '../components/ThreeCanvas';
import Stars from '../components/Stars';

const ProjectsContainer = styled.section`
  position: relative;
  min-height: calc(100vh - 80px); /* Reduced height to account for footer */
  padding: 8rem 0 10rem; /* Increased bottom padding to make space for footer */
  width: 100%;
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 10;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 2rem;
  }
`;

const ExperienceSection = styled.div`
  margin-top: 2rem;
  margin-bottom: 4rem;
  width: 100%;
`;

const ExperienceTitle = styled(motion.h3)`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.7rem;
    margin-bottom: 1.5rem;
  }
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const ExperienceItem = styled(motion.div)`
  background-color: ${props => props.theme.colors.tertiary};
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: ${props => props.theme.shadows.card};
  transition: transform 0.3s ease;
  width: 100%;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1.5rem;
  }
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: 0.75rem;
  }
`;

const CompanyName = styled.h4`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
`;

const JobTitle = styled.h5`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
  margin-top: 0.5rem;
`;

const Duration = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.secondary};
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
`;

const ResponsibilitiesList = styled.ul`
  margin-top: 1.5rem;
  padding-left: 1.5rem;
`;

const ResponsibilityItem = styled.li`
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 0.8rem;
  line-height: 1.6;
  
  &::marker {
    color: ${props => props.theme.colors.primary};
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.tertiary};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.card};
  transition: transform 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${props => props.theme.colors.background};
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.secondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 0.4rem;
    margin-top: 0.75rem;
  }
`;

const TechBadge = styled.span`
  font-size: 0.8rem;
  background-color: ${props => props.theme.colors.primary}30;
  color: ${props => props.theme.colors.primary};
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1.25rem;
  }
`;

const ProjectLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.secondary}50;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    padding: 0.6rem 1rem; /* Slightly larger touch target for mobile */
  }
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
  
  &:active {
    transform: scale(0.98); /* Add slight press effect for touch feedback */
  }
  
  i {
    font-size: 1rem;
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

const Projects = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
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
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
  };
  
  // Placeholder image URLs for project cards
  const placeholderImages = [
    'https://user-images.githubusercontent.com/71584572/125457055-cb49cb8c-6795-4e25-b835-de878a950257.png',
    'https://via.placeholder.com/600x400/1e293b/ffffff?text=3D+Portfolio'
  ];
  
  const workExperiences = [
    {
      company: "Honeywell Internationals",
      position: "Software Engineer",
      duration: "June 2023 - Present",
      responsibilities: [
        "Contributing to the NGOSS project in the aerospace sector, focused on delivering seamless in-flight internet services to enhance customer experience.",
        "Developing and maintaining full-stack applications using React.js, Spring Boot, and NestJS for both front-end and back-end functionalities.",
        "Executing functional and performance testing while designing automation test scripts to ensure system reliability and efficiency.",
        "Writing and optimizing high-performance scripts to enhance application responsiveness and streamline automated test execution.",
        "Managing production support by monitoring live systems, resolving critical issues, and ensuring continuous service availability.",
        "Collaborating with cross-functional teams, including developers, testers, and product owners, to align on project goals, resolve technical challenges, and deliver high-quality software solutions."
      ]
    },
    {
      company: "ThoughtClan Technologies",
      position: "Software Engineer Intern",
      duration: "Nov 2022 - June 2023",
      responsibilities: [
        "Completed training on Java, Spring Boot, and ReactJS, focusing on building and integrating scalable full stack web applications.",
        "Developed front-end and back-end components of projects, ensuring seamless functionality, code efficiency, and alignment with best practices.",
        "Collaborated with cross-functional teams and leveraged online resources to enhance technical knowledge, complete assigned tasks, participate in code reviews, and deepen understanding of the SDLC."
      ]
    }
  ];
  
  const projects = [
    {
      title: "Kisaan Help Desk",
      description: "A machine learning-based web application designed to assist farmers by providing comprehensive information on soil testing centers across India. The platform recommends the most suitable crops to cultivate, suggests appropriate fertilizers, and identifies potential diseases affecting crops to support informed agricultural decisions.",
      image: placeholderImages[0],
      tech: ["Machine Learning", "Web Development", "Python", "Data Analysis"],
      demo: "#",
      code: "#"
    },
    {
      title: "3D Portfolio Website",
      description: "A modern portfolio website built with React, Vite, and Three.js featuring interactive 3D animations and smooth transitions to showcase professional skills and projects in an engaging way.",
      image: placeholderImages[1],
      tech: ["React.js", "Three.js", "Framer Motion", "Styled Components"],
      demo: "#",
      code: "#"
    }
  ];
  
  return (
    <ProjectsContainer id="projects">
      <BackgroundCanvas>
        <ThreeCanvas camera={{ position: [0, 0, 1] }} controls={false}>
          <Stars />
        </ThreeCanvas>
      </BackgroundCanvas>
      
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My <span>Work</span>
        </SectionTitle>
        
        <ExperienceSection ref={ref}>
          <ExperienceTitle
            variants={itemVariants}
            initial="hidden"
            animate={controls}
          >
            Work <span>Experience</span>
          </ExperienceTitle>
          
          {workExperiences.map((exp, index) => (
            <ExperienceItem
              key={index}
              variants={itemVariants}
              initial="hidden"
              animate={controls}
            >
              <ExperienceHeader>
                <div>
                  <CompanyName>{exp.company}</CompanyName>
                  <JobTitle>{exp.position}</JobTitle>
                </div>
                <Duration>{exp.duration}</Duration>
              </ExperienceHeader>
              
              <ResponsibilitiesList>
                {exp.responsibilities.map((resp, idx) => (
                  <ResponsibilityItem key={idx}>{resp}</ResponsibilityItem>
                ))}
              </ResponsibilitiesList>
            </ExperienceItem>
          ))}
        </ExperienceSection>
        
        <ExperienceTitle
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          Personal <span>Projects</span>
        </ExperienceTitle>
        
        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              variants={itemVariants}
              initial="hidden"
              animate={controls}
            >
              <ProjectImage>
                <img src={project.image} alt={project.title} />
              </ProjectImage>
              
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                
                <TechStack>
                  {project.tech.map((tech, idx) => (
                    <TechBadge key={idx}>{tech}</TechBadge>
                  ))}
                </TechStack>
                
                <ProjectLinks>
                  <ProjectLink 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </ProjectLink>
                  
                  <ProjectLink 
                    href={project.code} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fab fa-github"></i> View Code
                  </ProjectLink>
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ContentWrapper>
    </ProjectsContainer>
  );
};

export default Projects;