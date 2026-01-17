import { useEffect, useState, useMemo } from 'react'
import './App.css'
import data from './data.json'

const { skills, projects, education, experience, contactInfo } = data

// Typed Strings from portfolio.html
const typedWords = ["ML Engineer", "Frontend Automation", "UI/UX Designer", "Data Analyst"]

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  // Typing Effect State
  const [typedText, setTypedText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const currentWord = useMemo(() => typedWords[wordIndex % typedWords.length], [wordIndex])

  useEffect(() => {
    const typingSpeed = isDeleting ? 40 : 80 // Smoother speed
    const pauseTime = 1500

    const handler = setTimeout(() => {
      if (!isDeleting && charIndex <= currentWord.length) {
        setTypedText(currentWord.slice(0, charIndex))
        setCharIndex((prev) => prev + 1)
      } else if (isDeleting && charIndex >= 0) {
        setTypedText(currentWord.slice(0, charIndex))
        setCharIndex((prev) => prev - 1)
      }

      if (!isDeleting && charIndex === currentWord.length + 1) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      }

      if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % typedWords.length)
      }
    }, typingSpeed)

    return () => clearTimeout(handler)
  }, [charIndex, currentWord, isDeleting])

  const closeNav = () => setIsNavOpen(false)

  return (
    <div className="App">
      <header>
        <div className="container">
          <nav>
            {/* Split Nav Left */}
            <div className={`nav-split left ${isNavOpen ? 'active' : ''}`}>
              <a href="#home" className="nav-link" onClick={closeNav}>Home</a>
              <a href="#about" className="nav-link" onClick={closeNav}>About</a>
              <a href="#skills" className="nav-link" onClick={closeNav}>Skills</a>
            </div>

            {/* Logo Center */}
            <div className="logo-container">
              <div className="logo">AKILA</div>
            </div>

            {/* Split Nav Right */}
            <div className={`nav-split right ${isNavOpen ? 'active' : ''}`}>
              <a href="#projects" className="nav-link" onClick={closeNav}>Projects</a>
              <a href="#Experience" className="nav-link" onClick={closeNav}>Experience</a>
              <a href="#contact" className="nav-link" onClick={closeNav}>Contact</a>
            </div>

            {/* Mobile Burger */}
            <div className="burger" onClick={() => setIsNavOpen(!isNavOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </nav>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="hero-background-text">DEVELOPER</div>

        <div className="container">
          <div className="hero-content">
            <h1 className="hero-main-title">{typedText}<span className="cursor">|</span></h1>
            <h2 className="hero-subtitle">Transforming Visions into Reality</h2>

            <div className="hero-image-wrapper">
              <img src="Images/pro.png" alt="Akila Wijerama" />
            </div>

            <div className="hero-actions">
              <a href="https://drive.google.com/file/d/12FmDKV2Oj9gTOyt0GiIcZQIiAjF6-6Tt/view?usp=drive_link" target="_blank" rel="noreferrer">
                <button className="btn-primary">Download CV</button>
              </a>
              <a href="#contact">
                <button className="btn-secondary">Let's Talk</button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>Hello! I'm a passionate and dedicated developer currently pursuing my degree in Computer Science and Web Development. I specialize in front-end development and am always looking for innovative ways to bring designs to life with clean, efficient code. I'm also deeply interested in cutting-edge technologies, including quantum computing and its impact on computer security.
                In addition to my academic pursuits, I enjoy tackling real-world coding challenges, whether it's creating interactive web applications or exploring the latest trends in programming. With a strong foundation in Python, JavaScript, HTML, CSS, and Java, I am focused on building scalable and user-friendly solutions.
                I am currently working on several projects, including a sustainability-focused website and an individual report on the future of quantum computing. I love collaborating on projects and am always eager to learn more about how technology shapes our world.
                When I'm not coding, I enjoy staying up-to-date on the latest tech trends and pushing the limits of what I can create. You can find me experimenting with new tools, working on my personal projects, or helping others overcome challenges in tech.
                Feel free to explore my website to see some of my work and get in touch if you'd like to collaborate or chat about technology!</p>

              <div className="social-links">
                <a href="https://github.com/akila20040720" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
                <a href="https://www.linkedin.com/in/akila-wijerama-7b9884202/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
                <a href="https://www.instagram.com/akila_wijerama/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <div className="about-image">
              <img src="Images/about.png" alt="About Image" />
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title">My Skills</h2>
          <div className="skills-container">
            {skills.map(skill => (
              <div key={skill.name} className="skill">
                <div className="skill-icon">
                  <i className={skill.icon}></i>
                </div>
                <h3>{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">My Projects</h2>
          <div className="projects-grid">
            {projects.map((project, idx) => (
              <div key={idx} className="project-card">
                <img src={project.image} alt={project.title} />
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-links">
                    {project.live && <a href={project.live} target="_blank" rel="noreferrer"><i className="fas fa-external-link-alt"></i> Live Demo</a>}
                    {project.code && <a href={project.code}><i className="fab fa-github"></i> Code</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="Education" className="projects">
        <div className="container">
          <h2 className="section-title">Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="project-card" style={{ marginBottom: '20px' }}>
              <img src={edu.image} alt="Education" />
              <div className="project-info">
                <h3>{edu.title}</h3>
                <p>{edu.description}</p>
                <div className="project-links">
                  <a href={edu.link} target="_blank" rel="noreferrer"><i className="fas fa-external-link-alt"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="Experience" className="projects">
        <div className="container">
          <h2 className="section-title">Experience</h2>
          {experience.map((exp, idx) => (
            <div key={idx} className="project-card">
              <img src={exp.image} alt="Experience" />
              <div className="project-info">
                <h3 style={{ color: 'red' }}>{exp.company}</h3>
                <h3>{exp.role}</h3>
                <p>{exp.description}</p>
                <div className="project-links">
                  <a href={exp.proof} target="_blank" rel="noreferrer"><i className="fas fa-external-link-alt"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-container">
            <div className="contact-info">
              <h3>Contact Information</h3>
              {contactInfo.map((info, idx) => (
                <p key={idx}><i className={info.icon}></i> {info.label}</p>
              ))}
            </div>
            {/* Formspree Form */}
            <form className="contact-form" action="https://formspree.io/f/xldjzrgj" method="POST">
              <div className="form-group">
                <input type="text" name="name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="text" name="subject" placeholder="Subject" />
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="Your Message" required></textarea>
              </div>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2026 Akila Wijerama. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
