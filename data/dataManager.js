// data/dataManager.js - Central Data Management System

class PortfolioDataManager {
    constructor() {
        this.storageKey = 'portfolio_data_v1';
        this.init();
    }

    init() {
        // Initialize with default data if not exists
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify(this.getDefaultData()));
        }
    }

    getDefaultData() {
        return {
            settings: {
                fullName: 'Ahmed Ehab Atif',
                currentPosition: 'R&D Product Engineer',
                currentCompany: 'FEDIS',
                companyUrl: 'https://fedis-eg.com',
                location: 'Cairo, Egypt',
                email: 'ahmedehab1232@gmail.com',
                phone: '(+20) 1027715033',
                githubUsername: 'ahmedehab1232',
                linkedinUsername: 'ahmedehab411',
                facebookUrl: '',
                yearsExperience: 3,
                totalProjectsCompleted: 50,
                studentsTrained: 3000,
                ieeePrizes: 3,
                trainingSessions: 80,
                roboticsProjects: 15,
                tagline: 'R&D Product Engineer | Robotics & AI Specialist',
                typingPhrases: [
                    'Building Autonomous Robots',
                    'Developing Embedded Systems',
                    'Training AI Models',
                    'Implementing Motion Control',
                    'ROS1 & ROS2 Expert',
                    'STM32 Firmware Developer'
                ],
                aboutDesc1: "I'm an R&D Product Engineer with extensive experience in developing autonomous robotic systems using ROS1 (Noetic) and ROS2 (Humble/Jazzy), C/C++, and Python. My work focuses on firmware development on STM32, implementation of motion control algorithms (PD/PID), and integration of embedded systems with navigation and perception modules.",
                aboutDesc2: "With a background in AI model deployment for computer vision tasks and machine learning in robotics, I specialize in real-time control, robotic navigation, sensor integration, and system-level automation.",
                availableForWork: true,
                lastUpdated: new Date().toISOString()
            },
            experiences: [
                {
                    id: 1,
                    position: 'R&D Product Engineer',
                    company: 'FEDIS (Fixed Egypt for Digital Solutions)',
                    location: 'Cairo, Egypt',
                    startDate: '2025-06',
                    endDate: null,
                    current: true,
                    achievements: [
                        'Drive end-to-end product development, integrating embedded systems',
                        'Develop and test prototypes with rigorous validation protocols',
                        'Optimize product functionality through iterative testing'
                    ],
                    technologies: ['Embedded Systems', 'Product Development', 'Prototyping'],
                    order: 1
                },
                {
                    id: 2,
                    position: 'Part-time Technical Instructor',
                    company: 'Sector B5 - ITIDA',
                    location: 'Smart Village, Egypt',
                    startDate: '2023-07',
                    endDate: null,
                    current: true,
                    achievements: [
                        'Conducted 80+ instructional sessions on Advanced Robotics and Modern C++',
                        'Led 40+ practical projects guiding participants with diverse backgrounds',
                        'Applied theoretical knowledge in robotics and embedded systems training'
                    ],
                    technologies: ['Robotics', 'C++', 'Education'],
                    order: 2
                }
            ],
            projects: [],
            skills: {
                programming_languages: ['C', 'Modern C++', 'Python'],
                robotics_frameworks: ['ROS1 (Noetic)', 'ROS2 (Humble/Jazzy)', 'Motion Control', 'PD/PID Control'],
                embedded_systems: ['STM32', 'Embedded C', 'Firmware Development', 'Real-time Systems'],
                ai_ml: ['TensorFlow', 'PyTorch', 'Computer Vision', 'Model Deployment'],
                tools_others: ['Git', 'Linux', 'Qt', 'Docker']
            },
            testimonials: [],
            messages: [],
            visitors: {
                total: 0,
                lastUpdated: new Date().toISOString()
            }
        };
    }

    // Get all data
    getAllData() {
        return JSON.parse(localStorage.getItem(this.storageKey));
    }

    // Get specific section
    getData(section) {
        const data = this.getAllData();
        return data[section] || null;
    }

    // Update specific section
    updateData(section, newData) {
        const data = this.getAllData();
        data[section] = newData;
        data.settings.lastUpdated = new Date().toISOString();
        localStorage.setItem(this.storageKey, JSON.stringify(data));
        return true;
    }

    // Settings methods
    getSettings() {
        return this.getData('settings');
    }

    updateSettings(settings) {
        return this.updateData('settings', settings);
    }

    // Experience methods
    getExperiences() {
        return this.getData('experiences') || [];
    }

    addExperience(experience) {
        const experiences = this.getExperiences();
        experience.id = Date.now();
        experiences.push(experience);
        return this.updateData('experiences', experiences);
    }

    updateExperience(id, updatedExperience) {
        const experiences = this.getExperiences();
        const index = experiences.findIndex(exp => exp.id === id);
        if (index !== -1) {
            experiences[index] = { ...experiences[index], ...updatedExperience };
            return this.updateData('experiences', experiences);
        }
        return false;
    }

    deleteExperience(id) {
        let experiences = this.getExperiences();
        experiences = experiences.filter(exp => exp.id !== id);
        // Reorder
        experiences.forEach((exp, index) => exp.order = index + 1);
        return this.updateData('experiences', experiences);
    }

    // Project methods
    getProjects() {
        return this.getData('projects') || [];
    }

    addProject(project) {
        const projects = this.getProjects();
        project.id = Date.now();
        projects.push(project);
        return this.updateData('projects', projects);
    }

    updateProject(id, updatedProject) {
        const projects = this.getProjects();
        const index = projects.findIndex(proj => proj.id === id);
        if (index !== -1) {
            projects[index] = { ...projects[index], ...updatedProject };
            return this.updateData('projects', projects);
        }
        return false;
    }

    deleteProject(id) {
        const projects = this.getProjects().filter(proj => proj.id !== id);
        return this.updateData('projects', projects);
    }

    // Skills methods
    getSkills() {
        return this.getData('skills') || {};
    }

    updateSkills(skills) {
        return this.updateData('skills', skills);
    }

    addSkill(category, skillName) {
        const skills = this.getSkills();
        if (!skills[category]) {
            skills[category] = [];
        }
        if (!skills[category].includes(skillName)) {
            skills[category].push(skillName);
            return this.updateData('skills', skills);
        }
        return false;
    }

    removeSkill(category, skillName) {
        const skills = this.getSkills();
        if (skills[category]) {
            skills[category] = skills[category].filter(s => s !== skillName);
            return this.updateData('skills', skills);
        }
        return false;
    }

    // Testimonial methods
    getTestimonials() {
        return this.getData('testimonials') || [];
    }

    addTestimonial(testimonial) {
        const testimonials = this.getTestimonials();
        testimonial.id = Date.now();
        testimonial.status = 'pending';
        testimonial.date = new Date().toISOString();
        testimonials.push(testimonial);
        return this.updateData('testimonials', testimonials);
    }

    updateTestimonialStatus(id, status) {
        const testimonials = this.getTestimonials();
        const index = testimonials.findIndex(t => t.id === id);
        if (index !== -1) {
            testimonials[index].status = status;
            return this.updateData('testimonials', testimonials);
        }
        return false;
    }

    deleteTestimonial(id) {
        const testimonials = this.getTestimonials().filter(t => t.id !== id);
        return this.updateData('testimonials', testimonials);
    }

    getApprovedTestimonials() {
        return this.getTestimonials().filter(t => t.status === 'approved');
    }

    // Message methods
    getMessages() {
        return this.getData('messages') || [];
    }

    addMessage(message) {
        const messages = this.getMessages();
        message.id = Date.now();
        message.date = new Date().toISOString();
        message.status = 'unread';
        messages.push(message);
        return this.updateData('messages', messages);
    }

    markMessageAsRead(id) {
        const messages = this.getMessages();
        const index = messages.findIndex(m => m.id === id);
        if (index !== -1) {
            messages[index].status = 'read';
            return this.updateData('messages', messages);
        }
        return false;
    }

    deleteMessage(id) {
        const messages = this.getMessages().filter(m => m.id !== id);
        return this.updateData('messages', messages);
    }

    // Visitor methods
    updateVisitorCount(count) {
        return this.updateData('visitors', {
            total: count,
            lastUpdated: new Date().toISOString()
        });
    }

    getVisitorCount() {
        return this.getData('visitors');
    }

    // Export data for backup
    exportData() {
        return JSON.stringify(this.getAllData(), null, 2);
    }

    // Import data from backup
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Import failed:', e);
            return false;
        }
    }

    // Reset to defaults
    resetData() {
        if (confirm('Are you sure you want to reset all data? This cannot be undone!')) {
            localStorage.setItem(this.storageKey, JSON.stringify(this.getDefaultData()));
            return true;
        }
        return false;
    }
}

// Create global instance only if not already created
if (typeof portfolioData === 'undefined') {
    window.portfolioData = new PortfolioDataManager();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioDataManager;
}