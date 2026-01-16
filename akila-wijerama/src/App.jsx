import { useEffect, useState, useMemo } from 'react'
import './App.css'

const skills = [
  { name: 'HTML5', icon: 'fab fa-html5' },
  { name: 'CSS3', icon: 'fab fa-css3-alt' },
  { name: 'JavaScript', icon: 'fab fa-js' },
  { name: 'Java', icon: 'fab fa-java' },
  { name: 'Node.js', icon: 'fab fa-node-js' },
  { name: 'Python', icon: 'fa-brands fa-python' },
]

const projects = [
  {
    title: 'Sustainfy Website',
    description: 'Implemented website for Sustainable Cities & Communities under the SDG goal 11',
    image: '/Images/image.png',
    live: 'https://sustainify.github.io/splash.html',
    code: '#',
  },
  {
    title: 'Traffic Analyser Project on Python',
    description: 'Using Python tkinter made histogram for analyse traffic data ',
    image: '/Images/Screenshot 2024-12-20 130645.png',
    live: '',
    code: '#',
  },
  {
    title: 'Theater APP Project on Java',
    description: 'Made Theater ticket booking system on Java',
    image: '/Images/Screenshot 2025-04-10 150201.png',
    live: '#',
    code: '#',
  },
  {
    title: 'Research on Quantum Computing',
    description: 'Industry impacts on Quantum Computing',
    image: '/Images/OIP.jpeg',
    live: 'https://www.icloud.com/iclouddrive/0d2vdR-czeKC9CXWrAwJjq6TA#w2121346',
    code: '',
  },
]

const education = [
  {
    title: 'Computer Science Undergraduate - University of Westminster(IIT Sri Lanka) (Sep-2024 - Present)',
    description:
      '"I am currently pursuing a degree in Computer Science at the University of Westminster, with a strong focus on Web Development. My academic journey and personal interests have aligned toward front-end and full-stack development. I am actively working on various web design and development projects to deepen my practical skills, explore modern web technologies, and build a solid foundation for a career in the tech industry."',
    image: '/Images/university_of_westminster_cover.jpg',
    link: 'https://www.westminster.ac.uk/',
  },
  {
    title: 'Royal College Colombo 07 (Feb-2010 - Jan 2024)',
    description:
      '"I completed my school education at Royal College, Colombo 07, where I studied from 2010 to 2024. I successfully passed my GCE Advanced Level examination in the Physical Science stream, with subjects including Combined Mathematics, Chemistry, and Physics. This academic focus helped me develop strong analytical and critical thinking skills. Prior to that, I achieved excellent results at the GCE Ordinary Level examination, obtaining 8 A\'s and 1 B. My deep interest in IT inspired me to pursue higher education in Computer Science. In addition to academics, I was actively involved in extracurricular activities—I represented my school in rugby and was a member of the Murclive Media Unit, where I contributed to media production and played key roles in organizing school events."',
    image: '/Images/Royal.jpg',
    link: 'https://www.bing.com/ck/a?!&&p=3364e6cf44eec741490fb105ae316fb6e06a636e25de65214c1294a6a87e15d4JmltdHM9MTc0NDI0MzIwMA&ptn=3&ver=2&hsh=4&fclid=275ad376-1dd0-6c69-0cd8-c6ee1cd06d81&psq=royal+college+colombo+7&u=a1aHR0cHM6Ly9yb3lhbGNvbGxlZ2UubGsv&ntb=1',
  },
]

const experience = [
  {
    company: 'Dialog Axiata PLC',
    role: 'CSA (Outbound) Feb-2024 - Jul 2024',
    description:
      'As an Outbound CSA at Dialog Axiata, I consistently exceeded monthly sales targets and key performance indicators (KPIs) by delivering high-quality service, building strong customer relationships, and maintaining in-depth product knowledge. I was responsible for driving sales, resolving customer concerns, and supporting financial and billing operations across multiple platforms. This role sharpened my communication, multitasking, and problem-solving skills while giving me a strong foundation in CRM systems, fintech applications, and customer-focused sales strategies.',
    image: '/Images/fe1bc3bee1b40301c1a4204fd5429d85.jpg',
    proof: 'https://www.icloud.com/iclouddrive/0ea9g4vPfX0qhSBkh0mDZz2NQ',
  },
]

const contactInfo = [
  { icon: 'fas fa-envelope', label: 'akila.wijerama@icloud.com' },
  { icon: 'fas fa-phone', label: '+94-767726096' },
  { icon: 'fas fa-map-marker-alt', label: 'Mount Lavinia, Sri Lanka' },
]

// Typed Strings from portfolio.html
const typedWords = ["Web Developer", "UI/UX Designer", "Freelancer", "Machine Learning", "Deep Learning"]

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Theme State
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    // Apply theme class to body
    if (theme === 'light') {
      document.body.classList.add('light-theme')
    } else {
      document.body.classList.remove('light-theme')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  // Typing Effect
  const currentWord = useMemo(() => typedWords[wordIndex % typedWords.length], [wordIndex])

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100 // Speed match
    const pauseTime = 2000

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
            <div className="logo">Akila Wijerama</div>

            <ul className={`nav-links ${isNavOpen ? 'active' : ''}`}>
              <li><a href="#home" onClick={closeNav}>Home</a></li>
              <li><a href="#about" onClick={closeNav}>About</a></li>
              <li><a href="#skills" onClick={closeNav}>Skills</a></li>
              <li><a href="#projects" onClick={closeNav}>Projects</a></li>
              <li><a href="#Education" onClick={closeNav}>Education</a></li>
              <li><a href="#Experience" onClick={closeNav}>Experience</a></li>
              <li><a href="#contact" onClick={closeNav}>Contact</a></li>
              <li>
                <button className="theme-toggle" onClick={toggleTheme}>
                  <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
                </button>
              </li>
            </ul>

            <div className={`burger ${isNavOpen ? 'active' : ''}`} onClick={() => setIsNavOpen(!isNavOpen)}>
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
          </nav>
        </div>
      </header>

      <section id="home" className="hero">
        <video autoPlay muted loop playsInline className="background-video">
          <source src="/Video/intro version 2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="container">
          <div className="hero-content">
            <h1>Hi, I'm <span>Akila Wijerama</span></h1>
            <h2><span id="typed-text">{typedText}</span><span style={{ color: 'var(--primary-color)' }}>|</span></h2>
            <p>Transforming Visions into a reality</p>

            <a href="https://drive.google.com/file/d/12FmDKV2Oj9gTOyt0GiIcZQIiAjF6-6Tt/view?usp=drive_link" target="_blank" rel="noreferrer">
              <button className="cv-btn">
                Download CV
                <div id="clip">
                  <div id="leftTop" className="corner"></div>
                  <div id="rightBottom" className="corner"></div>
                  <div id="rightTop" className="corner"></div>
                  <div id="leftBottom" className="corner"></div>
                </div>
                <span id="rightArrow" className="arrow"></span>
                <span id="leftArrow" className="arrow"></span>
              </button>
            </a>
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
              <img src="/Images/pro.png" alt="About Image" />
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
                    {project.code && <a href={project.code} style={{ color: theme === 'light' ? 'var(--primary-color)' : 'white' }}><i className="fab fa-github"></i> Code</a>}
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
              <button type="submit" className="btn">Send Message</button>
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
