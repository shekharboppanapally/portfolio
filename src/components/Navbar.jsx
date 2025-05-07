import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
  background: rgba(5, 8, 22, 0.8);
  z-index: 100;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1rem;
  }
`;

const Logo = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  
  span {
    color: ${props => props.theme.colors.text};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.5rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(motion.div)`
  position: relative;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  font-weight: ${props => props.active ? '600' : '400'};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.active ? '100%' : '0%'};
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s ease;
  
  &:hover, &:active {
    background: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    position: fixed;
    top: 70px;
    right: 0;
    width: 100%;
    max-height: min(calc(100vh - 70px), 350px);
    padding: 1.5rem 0;
    background: rgba(5, 8, 22, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    z-index: 99;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow-y: auto;
    transform-origin: top;
    transform: ${props => props.isOpen ? 'scaleY(1)' : 'scaleY(0)'};
    transition: transform 0.3s ease;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1rem 0;
    gap: 1.2rem;
  }
`;

const MobileNavLink = styled(NavLink)`
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  width: 85%;
  text-align: center;
  border-radius: 8px;
  transition: background 0.2s ease;
  
  &:hover, &:active {
    background: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.1rem;
    padding: 0.4rem 0.8rem;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const navVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  const linkVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };
  
  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Projects', path: '/projects' },
    { title: 'Contact', path: '/contact' }
  ];
  
  return (
    <NavbarContainer 
      variants={navVariants}
      initial="hidden"
      animate="visible"
      style={{ 
        boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.3)' : 'none',
      }}
    >
      <Logo
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        B<span>S</span>
      </Logo>
      
      <NavLinks>
        {navItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <NavLink 
              active={location.pathname === item.path}
              variants={linkVariants}
              whileHover="hover"
            >
              {item.title}
            </NavLink>
          </Link>
        ))}
      </NavLinks>
      
      <MobileMenuButton onClick={toggleMenu}>
        {isOpen ? '✕' : '☰'}
      </MobileMenuButton>
      
      <MobileMenu 
        isOpen={isOpen}
        initial={{ opacity: 0, x: 100 }}
        animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 0.3 }}
      >
        {navItems.map((item, index) => (
          <Link 
            to={item.path} 
            key={index} 
            onClick={() => setIsOpen(false)}
          >
            <MobileNavLink active={location.pathname === item.path}>
              {item.title}
            </MobileNavLink>
          </Link>
        ))}
      </MobileMenu>
    </NavbarContainer>
  );
};

export default Navbar;