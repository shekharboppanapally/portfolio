import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ThreeCanvas from '../components/ThreeCanvas';
import Stars from '../components/Stars';
// Import EmailJS
import emailjs from 'emailjs-com';
// Import email config constants
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID } from '../utils/emailConfig';

const ContactContainer = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 6rem 0;
  width: 100%; /* Ensure full width */
  overflow-x: hidden; /* Prevent horizontal scrolling */
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 8rem 0 4rem; /* Increased top padding for mobile to account for navbar */
  }
  
  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

const BackgroundCanvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Changed from -1 to 0 for better mobile visibility */
  pointer-events: none;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  z-index: 10;
  width: 100%; /* Ensure full width on all devices */
  position: relative; /* Added to ensure proper stacking context */
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 1rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  margin-bottom: 3rem;
  text-align: center;
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const ContactContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    flex-direction: row;
  }
`;

const ContactInfo = styled(motion.div)`
  flex: 1;
`;

const ContactHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
`;

const ContactText = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.secondary};
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  svg {
    color: ${props => props.theme.colors.primary};
    font-size: 1.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 0.75rem;
    
    svg {
      font-size: 1.3rem;
    }
  }
`;

const ContactItemText = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
`;

const ContactForm = styled(motion.form)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 1.2rem;
    width: 100%;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;
  width: 100%;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(100, 255, 218, 0.1);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0.8rem 1rem;
    font-size: 16px; /* Prevents iOS zoom on focus */
    border-radius: 8px; /* Slightly larger for better touch targets */
  }
`;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 5px;
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;
  width: 100%;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(100, 255, 218, 0.1);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0.8rem 1rem;
    min-height: 120px;
    font-size: 16px; /* Prevents iOS zoom on focus */
    border-radius: 8px; /* Slightly larger for better touch targets */
  }
`;

const SubmitButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.dark};
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 5px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0.9rem 2rem; /* Larger padding for better touch target */
    width: 100%; /* Full width on mobile */
    align-self: stretch;
    border-radius: 8px;
    font-size: 1.1rem;
  }
  
  @media (max-height: 600px) and (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0.7rem 1.5rem;
    font-size: 0.95rem;
  }
`;

const Contact = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // If you've installed EmailJS, uncomment this section
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        EMAILJS_USER_ID
      );
      
      // For now, simulate a successful submission while testing
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
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
  
  return (
    <ContactContainer id="contact">
      <BackgroundCanvas>
        <ThreeCanvas 
          camera={{ position: [0, 0, 1] }} 
          controls={false}
          style={{ pointerEvents: 'none' }}  /* Added to ensure canvas doesn't block interactions */
        >
          <Stars />
        </ThreeCanvas>
      </BackgroundCanvas>
      
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get In <span>Touch</span>
        </SectionTitle>
        
        <ContactContent ref={ref}>
          <ContactInfo
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <ContactHeading>Let's Connect</ContactHeading>
            <ContactText>
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
            </ContactText>
            
            <ContactDetails>
              <ContactItem>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <ContactItemText>shekhar.boppanapally@gmail.com</ContactItemText>
              </ContactItem>
              
              <ContactItem>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <ContactItemText>
                  <a href="https://instagram.com/soulwithhelmet" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    @soulwithhelmet
                  </a>
                </ContactItemText>
              </ContactItem>
              
              <ContactItem>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <ContactItemText>+91 6309402919</ContactItemText>
              </ContactItem>
              
              <ContactItem>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <ContactItemText>Hyderabad, India</ContactItemText>
              </ContactItem>
            </ContactDetails>
          </ContactInfo>
          
          <ContactForm
            ref={form}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            onSubmit={handleSubmit}
          >
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <SubmitButton 
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
            
            {submitStatus === 'success' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: '#64ffda', marginTop: '1rem' }}
              >
                Your message has been sent successfully! I'll get back to you soon.
              </motion.p>
            )}
            
            {submitStatus === 'error' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: '#ff6464', marginTop: '1rem' }}
              >
                There was an error sending your message. Please try again or contact me directly via email.
              </motion.p>
            )}
          </ContactForm>
        </ContactContent>
      </ContentWrapper>
    </ContactContainer>
  );
};

export default Contact;