# Ahmed Ehab - Professional Portfolio

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://ahmedehab411.github.io/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A modern, responsive portfolio website showcasing R&D Product Engineering expertise in Robotics, Embedded Systems, and AI/ML.

🌐 **Live Demo**: [ahmedehab411.github.io](https://ahmedehab411.github.io/)

---

## ✨ Features

### 🎨 Design & UX
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme Toggle**: User preference saved in localStorage
- **Custom Cursor**: Interactive cursor with hover effects (desktop only)
- **Smooth Animations**: AOS (Animate On Scroll) library integration
- **Particle Background**: Dynamic canvas-based particle system
- **Glassmorphism UI**: Modern frosted glass effects

### 🚀 Core Functionality

#### 📊 Interactive Components
- **Entrance Quiz**: Personalized experience based on visitor type (Recruiter/Client/Visitor)
- **Image Carousel**: Auto-rotating profile images with manual controls
- **Typing Animation**: Dynamic role display with multiple phrases
- **Live Visitor Counter**: Real-time visitor tracking with API integration
- **Animated Counters**: Smooth number counting animations on scroll

#### 🎮 Interactive Features
- **Typing Speed Test Game**: Built-in typing test with WPM, accuracy tracking
- **AI Chatbot Assistant**: Context-aware chatbot with 20+ response patterns
- **Project Pagination**: Navigate through projects (3 per page)
- **Skill Categories**: Organized tech stack with hover effects
- **Testimonial Carousel**: Featured testimonials with navigation
- **All Testimonials Modal**: View complete testimonial list with filtering

#### 📱 Navigation & Accessibility
- **Sticky Navbar**: Fixed navigation with scroll progress bar
- **Mobile Hamburger Menu**: Slide-in sidebar navigation
- **Quick Navigation Sidebar**: Floating sidebar with portfolio stats
- **Back to Top Button**: Smooth scroll to top
- **Section Highlighting**: Active link based on scroll position
- **Keyboard Navigation**: Full keyboard support for accessibility

### 📂 Data-Driven Content

All content is loaded from JSON files for easy updates:

```
data/
├── settings.json       # Personal info, taglines, availability
├── experience.json     # Professional experience timeline
├── volunteering.json   # Volunteering activities
├── projects.json       # Project portfolio with metadata
├── skills.json         # Technical skills categorized
└── testimonials.json   # Client testimonials
```

### 🎯 Sections

1. **Hero Section**
   - Animated greeting and role display
   - Profile image carousel (4 images)
   - Live visitor counter with daily active users
   - CTA buttons (View Work, Contact, Chat with AI)
   - Portfolio stats preview

2. **About Section**
   - Illustrated story timeline
   - Quick info cards (Location, Role, Education, Availability)
   - Animated statistics (Projects, Students, Experience)
   - Typing Speed Test Game widget

3. **Experience Section**
   - Professional timeline with current position indicator
   - Company details, achievements, tech tags
   - Animated timeline dots

4. **Skills Section**
   - Categorized skill display (5 categories)
   - Currently Learning section with progress bars
   - GitHub Activity stats (Repos, Stars, Contributions)
   - Hover animations on skill tags

5. **Projects Section**
   - Filter by category (All, Robotics, AI, Embedded, Software)
   - Status badges (Complete, GitHub Soon, Available, Unavailable)
   - Featured project highlighting
   - Pagination (3 projects per page)
   - Project overlay with GitHub links

6. **Volunteering Section**
   - IEEE and community involvement timeline
   - Leadership roles and achievements

7. **Testimonials Section**
   - Featured testimonials carousel
   - Average rating display (4.9/5)
   - "View All" modal with filtering
   - "Add Feedback" form (Formspree integration)

8. **Contact Section**
   - Contact cards (Email, Phone, Location)
   - Social media links (GitHub, LinkedIn, Facebook, WhatsApp)
   - Contact form with Formspree backend
   - Availability status indicator

### 🎨 Theme System

#### Color Schemes
**Dark Theme** (Default):
- Primary: `#4ecdc4` (Cyan)
- Secondary: `#ff6b6b` (Red)
- Background: `#0f0c29` → `#302b63` → `#24243e` (Gradient)

**Light Theme**:
- Background: `#f0f4f8` → `#d9e2ec` → `#bcccdc`
- Text adapts automatically for contrast

#### Responsive Breakpoints
- **Desktop**: > 1200px
- **Tablet**: 769px - 1024px
- **Mobile**: 481px - 768px
- **Small Mobile**: < 480px

### 🔧 Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Animations**: AOS Library, Custom CSS animations
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Inter, JetBrains Mono (Google Fonts)
- **APIs**: 
  - CountAPI.xyz (Visitor tracking)
  - Formspree.io (Contact form)
  - Hits.sh (View counter badge)

### 🎮 Easter Eggs & Secret Features

1. **Konami Code**: `↑ ↑ ↓ ↓ ← → ← → B A`
   - Activates "Secret Mode" with visual effects

2. **Keyboard Commands**:
   - Type `matrix` → Matrix Mode (10s)
   - Type `rainbow` → Rainbow Mode (10s)
   - Type `stats` → Show session statistics

3. **Secret Stats Tracking**:
   - Time on site
   - Sections viewed
   - Total clicks
   - Secret commands found

### 📊 Analytics & Tracking

- **Live Visitors**: Simulated active users (1-5 range)
- **Total Views**: Hits.sh badge integration
- **Session Tracking**: localStorage for return visits
- **Section Views**: IntersectionObserver tracking
- **Click Tracking**: SessionStorage counter

### 🔒 Security & Performance

- **No localStorage/sessionStorage in critical paths**: Browser storage safe
- **Lazy Loading**: Images load on demand
- **Optimized Assets**: Minified CSS, compressed images
- **CSP Ready**: No inline scripts (ready for Content Security Policy)
- **HTTPS Only**: All external resources use HTTPS

### ♿ Accessibility Features

- **ARIA Labels**: Proper semantic HTML and ARIA attributes
- **Keyboard Navigation**: Full keyboard support
- **Focus Indicators**: Visible focus states
- **High Contrast Mode**: Adapts to user preferences
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Screen Reader Support**: Descriptive alt text

---

## 📦 Installation & Setup

### Local Development

```bash
# Clone the repository
git clone https://github.com/ahmedehab411/ahmedehab411.github.io.git

# Navigate to project
cd ahmedehab411.github.io

# Open in browser
# Simply open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit: http://localhost:8000
```

### Deployment to GitHub Pages

1. **Create Repository**: `yourusername.github.io`
2. **Push Code**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
3. **Enable GitHub Pages**: 
   - Settings → Pages → Source: main branch
4. **Access**: `https://yourusername.github.io`

---

## ⚙️ Configuration

### Update Personal Information

Edit `data/settings.json`:
```json
{
  "currentPosition": "Your Position",
  "currentCompany": "Your Company",
  "companyUrl": "https://company.com",
  "tagline": "Your Tagline",
  "typingPhrases": ["Phrase 1", "Phrase 2"],
  "aboutDesc1": "First paragraph...",
  "aboutDesc2": "Second paragraph...",
  "location": "Your City, Country",
  "email": "your@email.com",
  "availableForWork": true,
  "Projects": 50,
  "trainingSessions": 80,
  "studentsTrained": 3000,
  "yearsExperience": 2
}
```

### Add Projects

Edit `data/projects.json`:
```json
{
  "id": 1,
  "title": "Project Name",
  "description": "Short description",
  "image": "path/to/image.jpg",
  "tags": ["Tag1", "Tag2"],
  "category": "robotics",
  "featured": true,
  "priority": "high",
  "status": "complete",
  "github": "https://github.com/username/repo",
  "demo": "#"
}
```

**Status Options**:
- `complete`: ✅ Complete
- `github-soon`: 🚧 GitHub Coming Soon
- `github-available`: 📁 Code Available
- `completed-unavailable`: 📂 Completed (Unavailable)

### Add Skills

Edit `data/skills.json`:
```json
{
  "skills": {
    "programming_languages": ["C++", "Python", "JavaScript"],
    "robotics_frameworks": ["ROS1", "ROS2", "Gazebo"],
    "embedded_systems": ["STM32", "ARM", "RTOS"],
    "ai_ml": ["PyTorch", "TensorFlow", "OpenCV"],
    "tools_others": ["Git", "Linux", "Docker"]
  }
}
```

### Update Resume

Replace `assets/pdf/Ahmed Ehab (R&D Product Engineer).pdf` with your CV.

### Change Theme Colors

Edit `assets/css/main.css`:
```css
:root {
  --accent-primary: #4ecdc4;
  --accent-secondary: #ff6b6b;
  --bg-primary: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
}
```

---

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | ✅ 90+ |
| Firefox | ✅ 88+ |
| Safari | ✅ 14+ |
| Edge | ✅ 90+ |
| Opera | ✅ 76+ |

---

## 🐛 Known Issues

1. **Custom Cursor**: Disabled on mobile (touch devices)
2. **Particle Canvas**: Performance may vary on older devices
3. **CountAPI**: May fail on network restrictions (fallback implemented)

---

## 🔄 Future Enhancements

- [ ] Blog section integration
- [ ] Project case studies
- [ ] Certifications showcase
- [ ] Video testimonials
- [ ] Multi-language support (EN/AR)
- [ ] Advanced analytics dashboard
- [ ] WebGL project previews

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is **MIT Licensed** - feel free to use it for your own portfolio!

### Attribution (Optional but Appreciated)
If you use this template, a link back to [github.com/ahmedehab411](https://github.com/ahmedehab411) would be appreciated.

---

## 📧 Contact

**Ahmed Ehab Atif**  
📧 Email: ahmedehab1232@gmail.com  
💼 LinkedIn: [linkedin.com/in/ahmedehab1232](https://linkedin.com/in/ahmedehab1232)  
🐙 GitHub: [github.com/ahmedehab411](https://github.com/ahmedehab411)  
📱 WhatsApp: [+20 1027715033](https://wa.me/201027715033)

---

## 🙏 Acknowledgments

- **AOS Library**: [michalsnik/aos](https://github.com/michalsnik/aos)
- **Font Awesome**: [fontawesome.com](https://fontawesome.com)
- **Google Fonts**: [fonts.google.com](https://fonts.google.com)
- **Formspree**: [formspree.io](https://formspree.io)
- **Inspiration**: Modern portfolio designs from Dribbble & Behance

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ by Ahmed Ehab | © 2025 All Rights Reserved**
