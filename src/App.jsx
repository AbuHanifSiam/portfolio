import { useState, useEffect, useRef } from 'react'

const CREDENTIAL_TRANSITION_MS = 850

const withBasePath = (path) => {
  if (!path) {
    return path
  }

  // Keep absolute and non-http links unchanged.
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('mailto:') || path.startsWith('#')) {
    return path
  }

  if (path.startsWith('/')) {
    return `${import.meta.env.BASE_URL}${path.slice(1)}`
  }

  return path
}

const credentialSlides = [
  {
    logo: '/assets/google_pm.jpg',
    title: 'Google Project Management',
    subtitle: 'Google Career Certificate',
    description:
      'Completed a comprehensive Project Management certification (7-course program) focused on real-world execution. Developed a strong foundation in Agile and Scrum, including managing sprints, defining roles, and building key artifacts. Gained hands-on experience in creating project documentation across all phases, while strengthening strategic communication, stakeholder management, and problem-solving through practical scenarios.',
    issuer: 'Google',
    issued: '2026',
    alt: 'Google Project Management certificate badge',
  },

  {
    logo: '/assets/google_ai.jpg',
    title: 'Google AI',
    subtitle: 'Google Career Certificate',
    description:
      'Developed the ability to work with AI as a strategic collaborator by crafting clear, outcome-driven instructions. Gained practical expertise in high-impact areas like data analysis, research, and communication, while applying AI responsibly. Built custom solutions using no-code/low-code approaches to solve real workplace challenges efficiently.',
    issuer: 'Google',
    issued: '2026',
    alt: 'Google AI certificate badge',
  },

  {
    logo: '/assets/agile_with_jira.jpg',
    title: 'Agile with Atlassian Jira',
    subtitle: 'Atlassian Professional Certificate',
    description:
      'Built a solid foundation in Agile methodologies, including Scrum and Kanban, with hands-on experience in configuring and managing agile boards in Jira Software Cloud. Applied Agile practices to plan, track, and optimize workflows effectively within project environments.',
    issuer: 'Atlassian',
    issued: '2025',
    alt: 'Agile with Atlassian Jira certificate badge',
  },

  {
    logo: '/assets/cyber101.jpg',
    title: 'Cyber Security 101',
    subtitle: 'TryHackMe Learning Path',
    description:
      'Developed core cybersecurity skills spanning networking, cryptography, and system environments (Linux, Windows, Active Directory). Gained exposure to offensive techniques and defensive security practices, building a balanced foundation for real-world security operations.',
    issuer: 'TryHackMe',
    issued: '2025',
    alt: 'Cyber Security 101 certificate badge',
  },

  {
    logo: '/assets/webfundamentals.jpg',
    title: 'Web Fundamentals',
    subtitle: 'TryHackMe Learning Path',
    description:
      'Acquired practical experience in web application security by learning core web fundamentals, analyzing major vulnerabilities, and using industry-standard tools to perform structured security assessments.',
    issuer: 'TryHackMe',
    issued: '2025',
    alt: 'Web Fundamentals certificate badge',
  },

  {
    logo: '/assets/presecurity.jpg',
    title: 'Pre-Security',
    subtitle: 'TryHackMe Learning Path',
    description:
      'Completed an end-to-end cybersecurity fundamentals program covering networking, web technologies, operating systems, and security principles. Developed practical understanding of how systems interact and where vulnerabilities emerge, with exposure to both offensive attack techniques and defensive strategies.',
    issuer: 'TryHackMe',
    issued: '2023',
    alt: 'Pre-Security certificate badge',
  },

  {
    logo: '/assets/automate_jira.jpg',
    title: 'Automate Tasks and Processes with Jira',
    subtitle: 'Atlassian Professional Certificate',
    description:
      'Built Jira automation workflows to optimize business processes, including auto-generating sub-tasks, updating fields, and tracking progress. Applied branching logic and smart values to handle dependencies and automate communication.',
    issuer: 'Atlassian',
    issued: '2025',
    alt: 'Automate tasks and processes with Jira certificate badge',
  },

  {
    logo: '/assets/postman.jpg',
    title: 'Postman Tutorial: Getting Started with API Testing',
    subtitle: 'Packt Learning Path',
    description:
      'Developed hands-on expertise in API testing using Postman (Desktop and Web), including creating and managing environments, collections, and request configurations. Organized and executed API workflows efficiently to support structured testing and validation.',
    issuer: 'Postman',
    issued: '2025',
    alt: 'Postman API Testing certificate badge',
  }
]

const experiences = [
  {
    date: 'June 2025 - Present',
    company: '6sense HQ',
    role: 'Associate Project Coordinator',
    badge: 'Current role',
    active: true,
    points: [
      'Coordinating cross-functional teams to align project deliverables with business objectives.',
      'Managing project timelines and stakeholder expectations utilizing Jira for Agile methodologies.',
      'Analyzing application performance metrics to identify architectural bottlenecks.',
    ],
  },
  {
    date: 'Jan 2024 - May 2025',
    company: 'BRAC University',
    role: 'Teacher Assistant',
    points: [
      'Facilitating academic growth within Computer Science laboratories through hands-on technical guidance.',
      'Mentoring students in software engineering principles, coding best practices, and algorithmic foundations.',
    ],
  },
]

const projects = [
  {
    image: '/assets/easygig.png',
    title: 'EasyGig',
    status: 'Active',
    summary:
      'Comprehensive gig management ecosystem streamlining freelancer and client interactions through automated workflows.',
    tags: ['React', 'Node.js', 'Agile PM'],
    href: 'https://easygigjunk.com/',
  },
  {
    image: '/assets/ops4team.png',
    title: 'Ops4Team',
    status: 'Active',
    summary:
      'Internal operations tool designed to maximize team productivity through visual project mapping and resource allocation.',
    tags: ['Nest.js', 'mongodb', 'React'],
    href: 'https://ops4.6sensehq.com/',
  },
  {
    image: '/assets/6sense-site.png',
    title: '6sense Official Website',
    summary:
      'Maintained and optimized the flagship digital presence for a leading technical services firm.',
    tags: ['SEO', 'Optimization'],
    href: 'https://www.6sensehq.com',
  },
]

const skillCards = [
  {
    title: 'Programming Skills',
    icon: 'Code',
    type: 'chips',
    items: [
      { label: 'Python', logo: '/assets/python.png' },
      { label: 'JavaScript', logo: '/assets/javascript.png' },
      { label: 'C++', logo: '/assets/cplusplus.png' },
      { label: 'Java', logo: '/assets/java.png' },
      { label: 'PHP', logo: '/assets/php.png' },
      { label: 'MySQL', logo: '/assets/mysql.png' },
      { label: 'HTML5', logo: '/assets/html5.png' },
      { label: 'React', logo: '/assets/react.png' },
    ],
  },
  {
    title: 'Project Management Tools',
    icon: 'Stack',
    type: 'list',
    items: [
      { label: 'Jira', logo: '/assets/jira.png' },
      { label: 'Trello', logo: '/assets/trello.png' },
      { label: 'ClickUp', logo: '/assets/clickup.png' },
      { label: 'Confluence', logo: '/assets/confluence.png' },
    ],
  },
  {
    title: 'OS Environments',
    icon: 'Monitor',
    type: 'list',
    items: [
      { label: 'Ubuntu', logo: '/assets/ubuntu.png' },
      { label: 'Fedora', logo: '/assets/fedora.png' },
      { label: 'Windows Server', logo: '/assets/windows.png' },
    ],
  },
]

const education = {
  title: 'Academic Foundation',
  description: 'Formalizing technical expertise through rigorous research and curriculum.',
  authority: 'PM Master',
  status: 'Certified Excellence',
  institution: 'BRAC University',
  degree: 'B.Sc. in Computer Science',
  period: 'Jun 2021 - May 2025',
  thesis: {
    label: 'Undergraduate Thesis',
    title: 'Yggdrasil- A Dynamic Network Security with Dual-Structured Intrusion Detection and Intrusion Prevention System',
  },
  focusAreas: [
    {
      title: 'Network Security:',
      description: 'Advanced IDS/IPS systems development.',
    },
    {
      title: 'Software Eng:',
      description: 'Scalable systems and design patterns.',
    },
    {
      title: 'Data Structures:',
      description: 'Algorithmic optimization for real-time traffic.',
    },
    {
      title: 'Project Mgmt:',
      description: 'SDLC methodologies and team orchestration.',
    },
  ],
}

const recognitions = [
  {
    title: 'Best Volunteer Award',
    org: 'Hult Prize, BRAC University',
    year: '2023',
  },
  {
    title: "Vice Chancellor's List",
    org: 'Academic distinction (3 semesters)',
    year: '2022-2025',
  },
  {
    title: "Dean's List",
    org: 'Academic distinction (4 semesters)',
    year: '2022-2025',
  },
]

const leadershipEngagement = [
  {
    title: 'Former Convener',
    organization: 'BASIS Students Forum (BRACU Chapter)',
    description:
      'Spearheaded industry-academia collaboration initiatives, orchestrating large-scale tech seminars and bridging the gap between student innovators and industrial veterans.',
    roleTag: 'Executive Role',
    logo: '/assets/BasisDarkTransparent.png',
    logoAlt: 'BASIS Students Forum logo',
  },
  {
    title: 'Former Acting Vice-President',
    organization: 'BRAC University Computer Club (BUCC)',
    description:
      "Directed internal operations and member engagement for one of the university's largest technical bodies, managing diverse sub-committees to deliver impactful coding bootcamps.",
    roleTag: 'Executive Role',
    logo: '/assets/BUCC Logo (Raster).png',
    logoAlt: 'BUCC logo',
  },
]

const contactCards = [
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/ahsiam11',
    copy: 'Professional profile and career updates.',
    href: 'https://www.linkedin.com/in/ahsiam11',
    icon: 'in',
  },
  {
    label: 'GitHub',
    value: 'github.com/AbuHanifSiam',
    copy: 'Projects, reports, and technical work samples.',
    href: 'https://github.com/AbuHanifSiam',
    icon: 'gh',
  },
]

const heroPhotos = ['/assets/hero-profile.png', '/assets/hanif.jpg']
const heroTitles = ['Software Project Manager', 'A Photographer']

function App() {
  const [credentialStart, setCredentialStart] = useState(0)
  const [isCredentialCycling, setIsCredentialCycling] = useState(false)
  const credentialCycleTimeoutRef = useRef(null)
  const [heroPhotoIndex, setHeroPhotoIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const currentTitle = heroTitles[heroPhotoIndex]
  const credentialOrder = rotateItems(credentialSlides, credentialStart)
  const featuredCredential = credentialOrder[0]
  const miniCredentials = credentialOrder.slice(1, 4)
  const incomingMiniCredential = credentialOrder[4]
  const supportCredentials = credentialOrder.slice(5)

  const queueCredentialAdvance = () => {
    if (isCredentialCycling) {
      return
    }

    setIsCredentialCycling(true)

    credentialCycleTimeoutRef.current = window.setTimeout(() => {
      setCredentialStart((current) => (current + 1) % credentialSlides.length)
      setIsCredentialCycling(false)
      credentialCycleTimeoutRef.current = null
    }, CREDENTIAL_TRANSITION_MS)
  }

  const rotateCredentials = (direction) => {
    if (direction === 'right') {
      queueCredentialAdvance()
      return
    }

    if (isCredentialCycling) {
      return
    }

    setCredentialStart((current) => (current - 1 + credentialSlides.length) % credentialSlides.length)
  }

  useEffect(() => {
    return () => {
      if (credentialCycleTimeoutRef.current) {
        window.clearTimeout(credentialCycleTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      rotateCredentials('right')
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroPhotoIndex((current) => (current + 1) % heroPhotos.length)
    }, 20000)

    return () => clearInterval(interval)
  }, [heroPhotos.length])

  useEffect(() => {
    setDisplayedText('')
  }, [heroPhotoIndex])

  useEffect(() => {
    let timeout
    const title = heroTitles[heroPhotoIndex]
    const isTyping = displayedText.length < title.length

    if (isTyping) {
      timeout = setTimeout(() => {
        setDisplayedText(title.slice(0, displayedText.length + 1))
      }, 85)
    }

    return () => clearTimeout(timeout)
  }, [displayedText, heroPhotoIndex])


  return (
    <main className="portfolio-shell">
      <section className="hero-section">
        <div className="hero-radial" />
        <div className="container hero-grid">
          <div className="hero-copy hero-intro-block">
            <p className="eyebrow hero-intro">
              <span>Hi, I&apos;m</span>
              <br />
              <span>Md. Abu Hanif Siam</span>
            </p>
          </div>

          <div className="hero-photo-card">
            <div className="hero-photo-frame" aria-hidden="true">
              <div className="hero-photo-plate" />
            </div>
            <img
              key={heroPhotoIndex}
              className="hero-photo hero-photo-popout"
              src={withBasePath(heroPhotos[heroPhotoIndex])}
              alt="Md. Abu Hanif Siam portrait"
            />
            <div className="hero-photo-glow" />
          </div>

          <div className="hero-copy hero-body-block">
            <h1>
              <span className="accent-text typing-text">
                {displayedText}
                <span className="typing-cursor" />
              </span>
            </h1>
            <p className="lede">
              Application and IT Services Analyst with experience supporting
              digital applications and driving operational excellence through
              agile methodologies and technical precision.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore Work
              </a>
              <a
                className="button button-secondary"
                href={withBasePath('/Md.AbuHanifSiam_CV.pdf')}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>
              <div className="hero-social-links" aria-label="Social links">
                <a
                  className="button button-secondary button-social"
                  href="https://www.linkedin.com/in/ahsiam11"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open LinkedIn"
                >
                  <img src={withBasePath('/assets/linkedin.png')} alt="LinkedIn" />
                </a>
                <a
                  className="button button-secondary button-social"
                  href="https://github.com/AbuHanifSiam"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open GitHub"
                >
                  <img src={withBasePath('/assets/github.png')} alt="GitHub" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section credentials-section">
        <div className="container">
          <div className="section-heading credentials-heading">
            <h2>
              Professional <span className="accent-text">Credentials</span>
            </h2>
            <p>
              Verified expert certifications across project management and
              technical domains.
            </p>
          </div>

          <div className="credentials-carousel">
            <div className="credentials-controls">
              <button
                type="button"
                className="carousel-button"
                aria-label="Show previous credential"
                disabled={isCredentialCycling}
                onClick={() => rotateCredentials('left')}
              >
                <CarouselArrowIcon direction="left" />
              </button>
              <button
                type="button"
                className="carousel-button"
                aria-label="Show next credential"
                disabled={isCredentialCycling}
                onClick={() => rotateCredentials('right')}
              >
                <CarouselArrowIcon direction="right" />
              </button>
            </div>

            <div className="credentials-grid">
              <div className="featured-credential-stage">
                <article
                  key={featuredCredential.title}
                  className={`featured-credential glass-card ${
                    isCredentialCycling ? 'featured-credential-leaving' : ''
                  }`}
                >
                  <div className="featured-credential-media">
                    {'logo' in featuredCredential ? (
                      <img
                        src={withBasePath(featuredCredential.logo)}
                        alt={featuredCredential.alt ?? featuredCredential.title}
                      />
                    ) : null}
                  </div>
                  <div className="featured-credential-copy">
                    <p className="pill">{featuredCredential.subtitle}</p>
                    <h3>{featuredCredential.title}</h3>
                    <p>{featuredCredential.description}</p>
                    <div className="credential-stats">
                      <div>
                        <span>Issuer</span>
                        <strong>{featuredCredential.issuer}</strong>
                      </div>
                      <div>
                        <span>Issued</span>
                        <strong>{featuredCredential.issued}</strong>
                      </div>
                    </div>
                  </div>
                </article>

                {isCredentialCycling ? (
                  <article className="featured-credential glass-card featured-credential-promoting" aria-hidden="true">
                    <div className="featured-credential-media">
                      {'logo' in miniCredentials[0] ? (
                        <img
                          src={withBasePath(miniCredentials[0].logo)}
                          alt={miniCredentials[0].alt ?? miniCredentials[0].title}
                        />
                      ) : null}
                    </div>
                    <div className="featured-credential-copy">
                      <p className="pill">{miniCredentials[0].subtitle}</p>
                      <h3>{miniCredentials[0].title}</h3>
                      <p>{miniCredentials[0].description}</p>
                      <div className="credential-stats">
                        <div>
                          <span>Issuer</span>
                          <strong>{miniCredentials[0].issuer}</strong>
                        </div>
                        <div>
                          <span>Issued</span>
                          <strong>{miniCredentials[0].issued}</strong>
                        </div>
                      </div>
                    </div>
                  </article>
                ) : null}
              </div>

              <div className={`credential-sidebar ${isCredentialCycling ? 'credential-sidebar-cycling' : ''}`}>
                {miniCredentials.map((item, index) => (
                  <article
                    className={`credential-mini glass-card ${
                      isCredentialCycling ? `credential-mini-slot-${index + 1}` : ''
                    }`}
                    key={item.title}
                  >
                    <div className="credential-mini-row">
                      {'logo' in item ? (
                        <img className="credential-mini-logo" src={withBasePath(item.logo)} alt="" />
                      ) : null}
                      <div className="credential-mini-copy">
                        <h3>{item.title}</h3>
                        {'subtitle' in item ? <p>{item.subtitle}</p> : null}
                      </div>
                      <div className="credential-mini-arrow" aria-hidden="true">
                        <ArrowSquareIcon />
                      </div>
                    </div>
                  </article>
                ))}

                {isCredentialCycling && incomingMiniCredential ? (
                  <article className="credential-mini glass-card credential-mini-incoming" key={`incoming-${incomingMiniCredential.title}`}>
                    <div className="credential-mini-row">
                      {'logo' in incomingMiniCredential ? (
                        <img className="credential-mini-logo" src={withBasePath(incomingMiniCredential.logo)} alt="" />
                      ) : null}
                      <div className="credential-mini-copy">
                        <h3>{incomingMiniCredential.title}</h3>
                        {'subtitle' in incomingMiniCredential ? <p>{incomingMiniCredential.subtitle}</p> : null}
                      </div>
                      <div className="credential-mini-arrow" aria-hidden="true">
                        <ArrowSquareIcon />
                      </div>
                    </div>
                  </article>
                ) : null}
              </div>
            </div>

            <div className="credentials-dots">
              {credentialSlides.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === credentialStart ? 'active' : ''}`}
                  aria-label={`View credential ${index + 1}`}
                  disabled={isCredentialCycling}
                  onClick={() => {
                    if (isCredentialCycling || index === credentialStart) {
                      return
                    }

                    setCredentialStart(index)
                  }}
                />
              ))}
            </div>

            <div className="supporting-credentials">
              {supportCredentials.map((item) => (
                <div className="support-pill" key={item.title}>
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section timeline-section">
        <div className="timeline-glow" />
        <div className="container timeline-grid">
          <div className="timeline-intro">
            <h2>
              <span>Work</span>
              <span>Experience</span>
            </h2>
            <p>
              A chronological record of project stewardship and academic
              mentorship.
            </p>
          </div>

          <div className="timeline-list">
            {experiences.map((item, index) => (
              <article className="timeline-item glass-card" key={item.company}>
                <span
                  className={`timeline-node ${item.active ? 'active' : ''}`}
                  aria-hidden="true"
                />
                {index === 0 ? <span className="timeline-line" aria-hidden="true" /> : null}
                <div className="timeline-head">
                  <div>
                    <p className={`timeline-date ${item.active ? 'active' : ''}`}>
                      {item.date}
                    </p>
                    <h3>{item.company}</h3>
                    <p className="timeline-role">{item.role}</p>
                  </div>
                </div>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>
                      <BulletIcon />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="container">
          <div className="section-heading">
            <h2>
              Featured <span className="accent-text">Infrastructures</span>
            </h2>
            <div className="section-rule" />
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-image-wrap">
                  <img src={withBasePath(project.image)} alt={project.title} />
                </div>
                <div className="project-content">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    {project.status ? <span className="project-status">{project.status}</span> : null}
                  </div>
                  <p>{project.summary}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href={project.href} target="_blank" rel="noreferrer" className="project-link">
                    Visit Live Site <ArrowRightIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section systems-section">
        <div className="container">
          <div className="section-heading">
            <p className="overline">System Design And Delivery</p>
            <h2>Architecting Performance</h2>
          </div>

          <div className="systems-grid">
            {skillCards.map((card) => (
              <article className="system-card" key={card.title}>
                <div className="system-card-title">
                  <div className="system-icon">
                    <CategoryIcon type={card.icon} />
                  </div>
                  <h3>{card.title}</h3>
                </div>

                {card.type === 'chips' ? (
                  <div className="skill-chip-grid">
                    {card.items.map((item) => (
                      <div className="skill-chip" key={item.label}>
                        <img src={withBasePath(item.logo)} alt="" />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="system-list">
                    {card.items.map((item) => (
                      <div className="system-list-item" key={item.label}>
                        <div className="system-list-left">
                          <img src={withBasePath(item.logo)} alt="" />
                          <span>{item.label}</span>
                        </div>
                        <span className="system-list-dot" aria-hidden="true" />
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section education-section">
        <div className="container">
          <div className="education-shell glass-card">
            <div className="education-header">
              <div className="education-intro">
                <p className="overline">Academic Profile</p>
                <h2>{education.title}</h2>
                <p>{education.description}</p>
              </div>
              <div className="education-badges">
                <div className="education-badge">
                  <span className="badge-label">Authority Level</span>
                  <span className="badge-value">{education.authority}</span>
                </div>
                <div className="education-badge">
                  <span className="badge-label">Status</span>
                  <span className="badge-value">{education.status}</span>
                </div>
              </div>
            </div>

            <div className="education-card">
              <article className="education-card-left">
                <div className="education-main-row">
                  <div className="education-icon">
                    <img src={withBasePath('/assets/bracu_logo.png')} alt="BRAC University logo" />
                  </div>
                  <div className="education-institution">
                    <h3>{education.institution}</h3>
                    <p>{education.degree}</p>
                  </div>
                </div>

                <div className="education-period">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>{education.period}</span>
                </div>

                <div className="education-thesis">
                  <span className="thesis-label">{education.thesis.label}</span>
                  <p className="thesis-title">"{education.thesis.title}"</p>
                </div>
              </article>

              <aside className="education-card-right">
                <div className="focus-areas">
                  <h4>Architectural Focus Areas</h4>
                  <div className="focus-items">
                    {education.focusAreas.map((area, index) => (
                      <div className="focus-item" key={index}>
                        <span className="focus-index">{String(index + 1).padStart(2, '0')}</span>
                        <div>
                          <span className="focus-title">{area.title}</span>
                          <span className="focus-description">{area.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="section recognition-section">
        <div className="container recognition-grid">
          <div className="recognition-copy">
            <p className="overline">Academic And Project Highlights</p>
            <h2>Recognition</h2>
            <p>Validated excellence in academic and project domains.</p>
          </div>

          <div className="recognition-list">
            {recognitions.map((item) => (
              <article className="recognition-item" key={item.title}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.org}</p>
                </div>
                <span>{item.year}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section leadership-section">
        <div className="container">
          <div className="leadership-header">
            <h2>Leadership &amp; Engagement</h2>
          </div>

          <div className="leadership-grid">
            {leadershipEngagement.map((item) => (
              <article className="leadership-card" key={item.title}>
                <div className="leadership-card-head">
                  <div className="leadership-icon" aria-hidden="true">
                    <img src={withBasePath(item.logo)} alt={item.logoAlt} />
                  </div>
                  <span className="leadership-role-tag">{item.roleTag}</span>
                </div>

                <h3>{item.title}</h3>
                <p className="leadership-org">{item.organization}</p>
                <p className="leadership-description">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="section-heading centered">
            <h2>
              Let&apos;s <span className="accent-text">Connect</span>
            </h2>
            <p>Available for consultation and project leadership roles.</p>
          </div>

          <div className="contact-grid">
            <article className="contact-feature glass-card">
              <div className="contact-feature-icon">
                <MailIcon />
              </div>
              <h3>
                Let&apos;s connect around application delivery, project
                coordination, and service-focused technical work.
              </h3>
              <p>
                Reach out for professional opportunities, project discussions,
                or conversations around application support, service
                performance, and cross-functional delivery.
              </p>
              <div className="contact-actions">
                <a
                  className="button button-primary"
                  href="mailto:hanif.siam@6sensehq.com"
                >
                  Email Md. Abu Hanif Siam
                </a>
                <a
                  className="button button-tertiary"
                  href="https://www.linkedin.com/in/ahsiam11"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open LinkedIn
                </a>
              </div>
            </article>

            <div className="contact-sidecards">
              {contactCards.map((item) => (
                <a
                  className="contact-card glass-card"
                  href={item.href}
                  key={item.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="contact-card-icon">{item.icon}</div>
                  <div>
                    <p className="contact-label">{item.label}</p>
                    <h3>{item.value}</h3>
                    <p className="contact-copy">{item.copy}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-row">
          <p>
            <span className="footer-brand">© 2024 Midnight Architect.</span>{' '}
            Built with Precision.
          </p>
          <nav>
            <a href="https://www.linkedin.com/in/ahsiam11" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/AbuHanifSiam" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={withBasePath('/Md.AbuHanifSiam_CV.pdf')} target="_blank" rel="noreferrer">
              Resume
            </a>
          </nav>
        </div>
      </footer>
    </main>
  )
}

function ArrowSquareIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M5 13L13 5M8 5h5v5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 8h9M8.5 3.5L13 8l-4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function BulletIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M3 12l3-3 3 3 6-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function CategoryIcon({ type }) {
  if (type === 'Stack') {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path
          d="M10 3l7 3.5L10 10 3 6.5 10 3Zm7 6L10 12.5 3 9m14 4L10 16.5 3 13"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
      </svg>
    )
  }

  if (type === 'Monitor') {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path
          d="M4 5.5h12v7H4v-7Zm4 10h4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M6 5h8M6 10h5m-5 5h8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 7.5h16v9H4v-9Zm0 0 8 5.5 8-5.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  )
}

function CarouselArrowIcon({ direction }) {
  const transform = direction === 'left' ? 'rotate(180 16 16)' : undefined

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <g transform={transform}>
        <path
          d="M9 16h14M18 10l6 6-6 6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </g>
    </svg>
  )
}

function rotateItems(items, startIndex) {
  return [...items.slice(startIndex), ...items.slice(0, startIndex)]
}

export default App
