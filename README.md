# Modern 3D Portfolio Website

A stunning portfolio website built with React, Vite, and Three.js featuring interactive 3D animations and a modern design.

![Portfolio Preview](./src/assets/images/portfolio-preview.png)

## ✨ Features

- **Interactive 3D Elements**: Engaging 3D animations using Three.js and React Three Fiber
- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI/UX**: Sleek animations and transitions using Framer Motion
- **Dark Theme**: Beautiful dark theme with glowing accents
- **Dynamic Content**: Easily updatable project and skill information
- **Contact Form**: Functional contact form to connect with visitors
- **Performance Optimized**: Fast loading and smooth animations

## 🛠️ Technologies Used

- **React**: UI building and component architecture
- **Vite**: Fast development and optimized builds
- **Three.js**: 3D graphics and animations
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Useful helpers for React Three Fiber
- **Framer Motion**: Advanced animations and transitions
- **Styled Components**: Component-level styling
- **React Router**: Page routing and navigation

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📂 Project Structure

```
portfolio/
├── public/              # Public assets
├── src/
│   ├── assets/          # Images, models, and fonts
│   │   ├── images/      # Image files
│   │   ├── models/      # 3D model files
│   │   └── fonts/       # Custom fonts
│   ├── components/      # Reusable components
│   │   ├── ComputerModel.jsx     # 3D computer model
│   │   ├── Stars.jsx             # Stars background effect
│   │   ├── ThreeCanvas.jsx       # Three.js canvas wrapper
│   │   ├── Navbar.jsx            # Navigation component
│   │   └── Footer.jsx            # Footer component
│   ├── pages/           # Application pages
│   │   ├── Home.jsx             # Home/landing page
│   │   ├── About.jsx            # About me section
│   │   ├── Projects.jsx         # Projects showcase
│   │   └── Contact.jsx          # Contact form
│   ├── styles/          # Global styles
│   │   ├── GlobalStyles.js      # Global styling
│   │   └── theme.js             # Theme configuration
│   ├── context/         # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
└── index.html           # HTML template
```

## 🔧 Customization

### Changing the Content

To personalize the portfolio with your information:

1. **Personal Information**: Update your name, bio, and contact details in the respective components.
2. **Projects**: Edit the project data in `src/pages/Projects.jsx` to showcase your own work.
3. **Skills**: Modify the skills list in `src/pages/About.jsx` to reflect your expertise.
4. **Resume**: Update your resume information or link to your actual resume.
5. **Social Links**: Change the social media links in the `Footer.jsx` and `Contact.jsx` components.

### Modifying the Theme

The color scheme and design tokens can be adjusted in `src/styles/theme.js`.

### Adding New 3D Models

1. Place your 3D model files (glTF/GLB format preferred) in the `src/assets/models` directory.
2. Create a new component in the `components` directory that imports and renders your model.
3. Use the `useGLTF` hook from drei to load your model.

## 📱 Responsive Design

The website is designed to work on all device sizes. The layout will automatically adjust for:

- Large desktop screens
- Standard laptops and desktops
- Tablets
- Mobile phones

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) for the 3D graphics library
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) for the React renderer
- [React Three Drei](https://github.com/pmndrs/drei) for the useful Three.js helpers
- [Framer Motion](https://www.framer.com/motion/) for the animation library
- [Styled Components](https://styled-components.com/) for the styling solution

---

Designed and developed with ❤️ by [Your Name]
