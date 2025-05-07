import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.tertiary};
  padding: 3rem 0;
  color: ${props => props.theme.colors.text};
  position: relative;
  z-index: 20; /* Increased z-index to ensure it's above other elements */
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FooterLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  
  span {
    color: ${props => props.theme.colors.text};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const SocialIcon = styled(motion.a)`
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.secondary};
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialIconVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        type: 'spring',
        stiffness: 300
      }
    }
  };
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>
          Boppanapally Shekhar<span>.</span>
        </FooterLogo>
        
        <SocialLinks>
          <SocialIcon 
            href="https://github.com/shekharboppanapally/" 
            target="_blank" 
            rel="noopener noreferrer"
            variants={socialIconVariants}
            whileHover="hover"
          >
            <i className="fab fa-github"></i>
          </SocialIcon>
          <SocialIcon 
            href="https://www.linkedin.com/in/shekhar-boppanapally-647a281bb/" 
            target="_blank" 
            rel="noopener noreferrer"
            variants={socialIconVariants}
            whileHover="hover"
          >
            <i className="fab fa-linkedin"></i>
          </SocialIcon>
          <SocialIcon 
            href="https://leetcode.com/u/shekharboppanapally944/" 
            target="_blank" 
            rel="noopener noreferrer"
            variants={socialIconVariants}
            whileHover="hover"
          >
            <i className="fas fa-code"></i>
          </SocialIcon>
          <SocialIcon 
            href="https://www.hackerrank.com/profile/shekharboppanap1" 
            target="_blank" 
            rel="noopener noreferrer"
            variants={socialIconVariants}
            whileHover="hover"
          >
            <i className="fab fa-hackerrank"></i>
          </SocialIcon>
          <SocialIcon 
            href="https://www.codechef.com/users/shekharb_12" 
            target="_blank" 
            rel="noopener noreferrer"
            variants={socialIconVariants}
            whileHover="hover"
          >
            <i className="fas fa-code"></i>
          </SocialIcon>
        </SocialLinks>
        
        <Copyright>
          © {currentYear} Boppanapally Shekhar. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;