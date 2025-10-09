# Contributing to Ahmed Ehab's Portfolio

First off, thank you for considering contributing to this portfolio project! 🎉

## How Can I Contribute?

### 🐛 Reporting Bugs

If you find a bug, please create an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser and OS information

### 💡 Suggesting Enhancements

Enhancement suggestions are welcome! Please include:
- Clear use case
- Why this enhancement would be useful
- Possible implementation approach

### 🔧 Pull Requests

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Make your changes**:
   - Follow the existing code style
   - Test thoroughly across browsers
   - Update documentation if needed
4. **Commit with clear messages**:
   ```bash
   git commit -m "Add: Amazing new feature"
   ```
5. **Push to your fork**:
   ```bash
   git push origin feature/AmazingFeature
   ```
6. **Open a Pull Request**

## Code Style Guidelines

### JavaScript
- Use ES6+ features
- Use `const` and `let`, avoid `var`
- Use async/await for promises
- Add JSDoc comments for functions
- Keep functions focused and small

### CSS
- Follow BEM naming convention where applicable
- Use CSS variables for colors and spacing
- Mobile-first responsive design
- Comment complex selectors

### HTML
- Semantic HTML5 elements
- Include ARIA labels for accessibility
- Optimize images before committing
- Validate HTML structure

## Project Structure

```
portfolio/
├── assets/
│   ├── css/
│   │   └── main.css          # All styles
│   ├── js/
│   │   └── main.js           # All JavaScript
│   ├── img/                  # Images
│   └── pdf/                  # Resume/CV
├── data/                     # JSON data files
│   ├── settings.json
│   ├── experience.json
│   ├── projects.json
│   ├── skills.json
│   ├── volunteering.json
│   └── testimonials.json
├── index.html                # Main HTML
├── README.md
└── LICENSE
```

## Testing Checklist

Before submitting a PR, please verify:

- [ ] Code works in Chrome, Firefox, Safari, Edge
- [ ] Responsive on mobile, tablet, desktop
- [ ] No console errors
- [ ] Accessibility features work (keyboard nav, screen readers)
- [ ] Images are optimized
- [ ] No broken links
- [ ] Dark and light themes both work
- [ ] Performance is acceptable (< 3s load time)

## Adding Features

### New Section
1. Add HTML structure to `index.html`
2. Add styles to `assets/css/main.css`
3. Add functionality to `assets/js/main.js`
4. Update README.md features list
5. Test thoroughly

### New Data Type
1. Create JSON file in `data/` folder
2. Add loading function in JavaScript
3. Add render function
4. Update configuration section in README

## Questions?

Feel free to open an issue with the "question" label, or contact:
- 📧 Email: ahmedehab1232@gmail.com
- 💼 LinkedIn: [linkedin.com/in/ahmedehab1232](https://linkedin.com/in/ahmedehab1232)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the project
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information

## Recognition

Contributors will be recognized in the README.md file!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping improve this portfolio! 🚀
