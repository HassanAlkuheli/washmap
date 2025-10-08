# 🤝 Contributing to WashMap

First off, thank you for considering contributing to WashMap! It's people like you that make WashMap such a great tool.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. By participating, you are expected to uphold this code.

### Our Standards

- ✅ Be respectful and inclusive
- ✅ Welcome newcomers and encourage diverse perspectives
- ✅ Give and accept constructive feedback gracefully
- ✅ Focus on what is best for the community

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Git
- Code editor (VS Code recommended)
- Basic knowledge of React Native and Express.js

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/washmap.git
   cd washmap
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/HassanAlkuheli/washmap.git
   ```

4. **Install dependencies**
   ```bash
   # Backend
   cd server
   npm install
   
   # Frontend
   cd ../client
   npm install
   ```

5. **Setup environment variables**
   ```bash
   # Frontend
   cd client
   cp .env.example .env
   # Add your Google Maps API key
   
   # Backend
   cd ../server
   cp .env.example .env
   ```

6. **Run the application**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm start
   
   # Terminal 2 - Frontend
   cd client
   npx expo start --web
   ```

---

## 🔄 Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Follow the existing code style
- Write clear, concise comments
- Update documentation as needed
- Add tests if applicable

### 3. Test Your Changes

```bash
# Run the app and test manually
npm start

# Check for errors
npm run lint  # (if configured)
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing new feature"
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

Go to GitHub and create a Pull Request from your fork to the main repository.

---

## 💻 Coding Standards

### JavaScript Style Guide

```javascript
// ✅ Good
const getUserLocation = async () => {
  try {
    const location = await Location.getCurrentPositionAsync();
    return location;
  } catch (error) {
    console.error('Location error:', error);
    return null;
  }
};

// ❌ Avoid
function getlocation(){
const loc=await Location.getCurrentPositionAsync()
return loc
}
```

### Key Principles

1. **SOLID Principles** - Single Responsibility, etc.
2. **DRY** - Don't Repeat Yourself
3. **KISS** - Keep It Simple, Stupid
4. **Meaningful Names** - Use descriptive variable/function names

### File Organization

```
- Components should be in PascalCase: `FacilityCard.js`
- Hooks should start with 'use': `useFacilities.js`
- Utils in camelCase: `helpers.js`
- One component per file
- Group related files in folders
```

### Code Comments

```javascript
/**
 * Fetch facilities from API based on location
 * @param {Object} location - User's current location
 * @returns {Promise<Array>} Array of facility objects
 */
export const fetchFacilities = async (location) => {
  // Implementation
};
```

---

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks

### Examples

```bash
# Good commit messages
git commit -m "feat(map): add custom marker icons"
git commit -m "fix(booking): resolve time slot overlap issue"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(hooks): extract location logic to custom hook"

# Bad commit messages (avoid these)
git commit -m "fixed stuff"
git commit -m "updates"
git commit -m "asdfghjkl"
```

---

## 🔀 Pull Request Process

### Before Submitting

- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No merge conflicts with main branch
- [ ] Tested locally and works as expected

### PR Title Format

```
[Type] Brief description of changes

Example:
[Feature] Add user authentication system
[Fix] Resolve map loading issue on iOS
[Docs] Update API documentation
```

### PR Description Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe how you tested your changes.

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have commented my code
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested this on mobile/web
```

### Review Process

1. Maintainer will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be credited in the project

---

## 🐛 Bug Reports

Found a bug? Please create an issue with the following information:

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., iOS, Android, Windows]
- Browser: [e.g., Chrome, Safari]
- App Version: [e.g., 1.0.0]

**Additional context**
Any other relevant information.
```

---

## 💡 Feature Requests

Have an idea? We'd love to hear it!

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
Clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Any other context or screenshots.
```

---

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Redux Toolkit](https://redux-toolkit.js.org/)

---

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

---

## ❓ Questions?

Feel free to:
- Open an issue with the label `question`
- Contact the maintainer via GitHub
- Check existing issues for similar questions

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

<div align="center">

**Thank you for contributing to WashMap! 🚗✨**

</div>
