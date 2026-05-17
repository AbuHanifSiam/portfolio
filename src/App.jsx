import { useState, useEffect, useRef, useCallback } from 'react'

const CREDENTIAL_TRANSITION_MS = 700
const CASE_STUDY_HASH_OPS4 = '#/case-studies/ops4team'
const CASE_STUDY_HASH_EASYGIG = '#/case-studies/easygig'
const CASE_STUDY_HASHES = [CASE_STUDY_HASH_OPS4, CASE_STUDY_HASH_EASYGIG]

const getInitialView = () => (CASE_STUDY_HASHES.includes(window.location.hash) ? 'case-study' : 'portfolio')

const getCaseStudyFromHash = () => {
  if (window.location.hash === CASE_STUDY_HASH_EASYGIG) {
    return 'easygig'
  }
  return 'ops4'
}

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
    caseStudyHref: CASE_STUDY_HASH_EASYGIG,
  },
  {
    image: '/assets/ops4team.png',
    title: 'Ops4Team',
    status: 'Active',
    summary:
      'Internal operations tool designed to maximize team productivity through visual project mapping and resource allocation.',
    tags: ['Nest.js', 'mongodb', 'React'],
    href: 'https://ops4.6sensehq.com/',
    caseStudyHref: CASE_STUDY_HASH_OPS4,
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

const ops4CaseStudy = {
  title: 'Ops4Team Enterprise Hub',
  eyebrow: 'Featured Case Study',
  summary:
    'Architecting a centralized internal operations platform to replace expensive SaaS tools and unify cross-departmental data.',
  role: 'Technical PM',
  status: 'Active Production',
  domain: 'Enterprise ERP',
  focus: 'Requirements Engineering',
  challengeParts: [
    'Management lacked a single source of truth, relying on a fragmented and expensive suite of third-party tools to handle employee time-tracking, project statuses, and HR leave management.',
    'The objective was to architect a proprietary internal platform from scratch, securely handling complex data from micro-level developer idle-time to macro-level portfolio health for the executive team.',
  ],
  impact: [
    {
      value: '40+',
      label: 'Active Daily Users',
    },
    {
      value: '100%',
      label: 'SaaS Cost Consolidation',
    },
    {
      value: 'Unified Visibility',
      label: 'Cross-Department Executive Dashboard',
    },
  ],
  execution: [
    {
      title: 'Executive Discovery & SRS',
      copy:
        'Spearheaded requirements gathering with the CTO and HR leadership. Translated business needs into a developer-ready Software Requirements Specification (SRS).',
    },
    {
      title: 'Complex Logic Facilitation',
      copy:
        'Facilitated architectural planning sessions with senior engineers to define complex algorithms for merging desktop tracker data with Jira performance metrics.',
    },
    {
      title: 'Agile Build Orchestration',
      copy:
        'Managed the end-to-end execution. Configured Jira workspaces and maintained strict two-week Scrum sprints to keep React and NestJS teams aligned.',
    },
    {
      title: 'Feature Consolidation',
      copy:
        'Successfully coordinated the integration of disparate modules, client project dashboards, time-tracking APIs, and HR systems, into a single unified UI.',
    },
  ],
}

const easygigCaseStudy = {
  title: 'EasyGig Project Rescue',
  eyebrow: 'Featured Case Study',
  summary:
    'Transforming a stalled, buggy codebase into a stable, revenue-generating ecosystem through Agile management.',
  role: 'Technical PM',
  status: 'Active Production',
  domain: 'Marketplace SaaS',
  focus: 'System Architecture & Integration',
  challengeParts: [
    'EasyGig was struggling with high customer bounce rates due to critical live bugs. The platform was handed over mid-flight from a previous team that had initiated multiple features but completed none.',
    'The immediate priority was stopping the loss of live customers, conducting a full codebase audit, and establishing predictable delivery cadences to replace unstructured Kanban workflows.',
  ],
  impact: [
    {
      value: '7-10',
      label: 'Weekly Hauls Booked',
    },
    {
      value: '$150+',
      label: 'Min Per Haul Value',
    },
    {
      value: '100% Automated',
      label: 'Weekly Hauler Payroll Rollout',
    },
  ],
  execution: [
    {
      title: 'Technical Audit & Triage',
      copy:
        'Executed a comprehensive audit of all in-progress features. Shifted engineering focus to isolating and resolving critical live bugs to stabilize the customer experience.',
    },
    {
      title: 'Agile Scrum Implementation',
      copy:
        'Migrated the infrastructure from Kanban to Scrum. Restructured the Jira backlog, established strict two-week sprints, and instituted daily standups to regain timeline control.',
    },
    {
      title: 'Design-to-Dev Pipeline',
      copy:
        'Implemented a strict gateway where logic changes (driven by live feedback) had to be finalized in design before entering a sprint, eliminating scope creep.',
    },
    {
      title: 'Technical Logic Facilitation',
      copy:
        'Mapped out complex logical flows and edge cases with the engineering team, ensuring robust testing protocols were established before deployment.',
    },
  ],
}

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

const specializedSolutions = [
  {
    title: 'Agile Workspace Setup',
    description:
      'Organize development chaos by configuring high-velocity Jira or Trello dashboards, standardizing workflows, and setting up sprint planning templates.',
    icon: 'hierarchy',
    items: [
      'Jira/Trello Configuration',
      'Workflow Customization',
      'Sprint Reporting Dashboards',
      'Ceremony Templates',
    ],
    buttonText: 'Request Setup',
    buttonHref: '#contact',
  },
  {
    title: 'Technical Discovery',
    description:
      'Translate complex feature ideas into rigorous, developer-ready Software Requirements Specifications (SRS) that engineering teams can execute immediately.',
    icon: 'document',
    items: [
      'ISO 29148 Standard SRS',
      'Functional Requirements',
      'Acceptance Criteria Mapping',
      'Architecture Flowcharts',
    ],
    buttonText: 'Start Discovery',
    buttonHref: '#contact',
  },
  {
    title: 'Project Rescue & Audit',
    description:
      'Audit stalled development projects, evaluate legacy codebases, mitigate technical risks, and manage handoffs when transitioning to new teams.',
    icon: 'audit',
    items: [
      'Codebase Health Audit',
      'Technical Risk Assessment',
      'Repository Management',
      'Recovery Sprint Roadmap',
    ],
    buttonText: 'Audit My Project',
    buttonHref: '#contact',
  },
]

const heroPhotos = ['/assets/hero-profile.png', '/assets/hanif.jpg']
const heroTitles = ['Software Project Manager', 'A Photographer']
const calendlyMeetingUrl = 'https://calendly.com/mdabuhanifsiam/30min'

function App() {
  const [view, setView] = useState(getInitialView)
  const [credentialStart, setCredentialStart] = useState(0)
  const [isCredentialCycling, setIsCredentialCycling] = useState(false)
  const [credentialAdvanceDirection, setCredentialAdvanceDirection] = useState(null)
  const credentialCycleTimeoutRef = useRef(null)
  const featuredCredentialTimeoutRef = useRef(null)
  const credentialSidebarRef = useRef(null)
  const [heroPhotoIndex, setHeroPhotoIndex] = useState(0)
  const calendlyWidgetRef = useRef(null)
  const [displayedText, setDisplayedText] = useState('')
  const [displayedFeaturedCredential, setDisplayedFeaturedCredential] = useState(credentialSlides[0])
  const [previousFeaturedCredential, setPreviousFeaturedCredential] = useState(null)
  const [isFeaturedCredentialTransitioning, setIsFeaturedCredentialTransitioning] = useState(false)
  const credentialOrder = rotateItems(credentialSlides, credentialStart)
  // Show 3 mini cards on the right; keep one incoming card for smooth scroll
  const miniCredentials = credentialOrder.slice(1, 4)
  const incomingMiniCredential = credentialOrder[4]
  const supportCredentials = credentialOrder.slice(5)

  const commitCredentialStart = useCallback((nextStart) => {
    const nextFeaturedCredential = credentialSlides[nextStart]

    if (nextFeaturedCredential === displayedFeaturedCredential) {
      setCredentialStart(nextStart)
      return
    }

    if (featuredCredentialTimeoutRef.current) {
      window.clearTimeout(featuredCredentialTimeoutRef.current)
    }

    setPreviousFeaturedCredential(displayedFeaturedCredential)
    setDisplayedFeaturedCredential(nextFeaturedCredential)
    setIsFeaturedCredentialTransitioning(true)
    setCredentialStart(nextStart)

    featuredCredentialTimeoutRef.current = window.setTimeout(() => {
      setPreviousFeaturedCredential(null)
      setIsFeaturedCredentialTransitioning(false)
    }, CREDENTIAL_TRANSITION_MS)
  }, [displayedFeaturedCredential])

  const handleCredentialAnimationComplete = () => {
    const nextStart = credentialAdvanceDirection === 'left'
      ? (credentialStart - 1 + credentialSlides.length) % credentialSlides.length
      : (credentialStart + 1) % credentialSlides.length

    commitCredentialStart(nextStart)
    setIsCredentialCycling(false)
    setCredentialAdvanceDirection(null)
    
    // Reset transform for next cycle
    if (credentialSidebarRef.current) {
      credentialSidebarRef.current.style.transform = 'translateY(0)'
    }
  }

  const queueCredentialAdvance = useCallback((direction, isManual = false) => {
    if (isCredentialCycling) {
      return
    }

    setIsCredentialCycling(true)
    if (isManual) {
      setCredentialAdvanceDirection(direction)
    }
  }, [isCredentialCycling])

  const rotateCredentials = useCallback((direction, isManual = false) => {
    if (direction === 'right') {
      // For right direction, directly advance without sidebar animation
      if (isCredentialCycling) {
        return
      }
      const nextStart = (credentialStart + 1) % credentialSlides.length
      commitCredentialStart(nextStart)
      return
    }

    if (isCredentialCycling) {
      return
    }

    if (isManual) {
      queueCredentialAdvance(direction, true)
      return
    }

    commitCredentialStart((credentialStart - 1 + credentialSlides.length) % credentialSlides.length)
  }, [commitCredentialStart, credentialStart, isCredentialCycling, queueCredentialAdvance])

  useEffect(() => {
    return () => {
      if (credentialCycleTimeoutRef.current) {
        window.clearTimeout(credentialCycleTimeoutRef.current)
      }

      if (featuredCredentialTimeoutRef.current) {
        window.clearTimeout(featuredCredentialTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // Calculate the height of one card + gap for proper animation distance
    if (credentialSidebarRef.current && isCredentialCycling) {
      const firstCard = credentialSidebarRef.current.querySelector('.credential-mini')
      if (firstCard) {
        const cardHeight = firstCard.offsetHeight
        const gap = 16 // 1rem = 16px
        const translateDistance = -(cardHeight + gap)
        credentialSidebarRef.current.style.setProperty('--card-translate-distance', `${translateDistance}px`)
      }
    }
  }, [isCredentialCycling])

  useEffect(() => {
    // Handle auto-rotation completion (no animation)
    if (isCredentialCycling && !credentialAdvanceDirection) {
      if (credentialCycleTimeoutRef.current) {
        window.clearTimeout(credentialCycleTimeoutRef.current)
      }
      
      credentialCycleTimeoutRef.current = window.setTimeout(() => {
        commitCredentialStart((credentialStart + 1) % credentialSlides.length)
        setIsCredentialCycling(false)
      }, 50)
    }

    return () => {
      if (credentialCycleTimeoutRef.current) {
        window.clearTimeout(credentialCycleTimeoutRef.current)
      }
    }
  }, [commitCredentialStart, credentialAdvanceDirection, credentialStart, isCredentialCycling])

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroPhotoIndex((current) => (current + 1) % heroPhotos.length)
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDisplayedText('')
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [heroPhotoIndex])

  useEffect(() => {
    const widgetElement = calendlyWidgetRef.current

    if (!widgetElement) {
      return undefined
    }

    const mountCalendly = () => {
      if (!widgetElement || !window.Calendly?.initInlineWidget) {
        return
      }

      widgetElement.innerHTML = ''
      window.Calendly.initInlineWidget({
        url: calendlyMeetingUrl,
        parentElement: widgetElement,
      })
    }

    if (window.Calendly?.initInlineWidget) {
      mountCalendly()
      return undefined
    }

    const existingScript = document.querySelector('script[data-calendly-widget="true"]')

    if (existingScript) {
      existingScript.addEventListener('load', mountCalendly, { once: true })
      return () => existingScript.removeEventListener('load', mountCalendly)
    }

    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.dataset.calendlyWidget = 'true'
    script.onload = mountCalendly
    document.body.appendChild(script)

    return () => {
      script.onload = null
    }
  }, [])

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

  useEffect(() => {
    const handleHashChange = () => {
      setView(CASE_STUDY_HASHES.includes(window.location.hash) ? 'case-study' : 'portfolio')
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (view !== 'case-study') {
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [view])

  if (view === 'case-study') {
    const caseStudyType = getCaseStudyFromHash()
    const caseStudy = caseStudyType === 'easygig' ? easygigCaseStudy : ops4CaseStudy
    return <CaseStudyPage caseStudy={caseStudy} />
  }


  return (
    <main className="portfolio-shell">
      <section className="hero-section">
        <div className="hero-radial" />
        <div className="container hero-grid">
          <div className="hero-copy hero-intro-block">
            <p className="eyebrow hero-intro">
              <span>Hi, I&apos;m</span>
              <br />
              <span className="hero-name">Md. Abu Hanif Siam</span>
            </p>
          </div>

          <div className="hero-photo-card">
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
              I bridge the gap between business requirements and 
              engineering execution. I specialize in rescuing stalled projects, 
              writing developer-ready documentation, and configuring 
              Agile workflows.
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
                onClick={() => rotateCredentials('left', true)}
              >
                <CarouselArrowIcon direction="left" />
              </button>
              <button
                type="button"
                className="carousel-button"
                aria-label="Show next credential"
                disabled={isCredentialCycling}
                onClick={() => rotateCredentials('right', true)}
              >
                <CarouselArrowIcon direction="right" />
              </button>
            </div>

            <div className="credentials-grid">
              <div className="featured-credential-stage">
                {isFeaturedCredentialTransitioning && previousFeaturedCredential ? (
                  <>
                    <article
                      key={`leaving-${previousFeaturedCredential.title}`}
                      className="featured-credential glass-card featured-credential-transition featured-credential-leaving"
                    >
                      <div className="featured-credential-media">
                        {'logo' in previousFeaturedCredential ? (
                          <img
                            src={withBasePath(previousFeaturedCredential.logo)}
                            alt={previousFeaturedCredential.alt ?? previousFeaturedCredential.title}
                          />
                        ) : null}
                      </div>
                      <div className="featured-credential-copy">
                        <p className="pill">{previousFeaturedCredential.subtitle}</p>
                        <h3>{previousFeaturedCredential.title}</h3>
                        <p>{previousFeaturedCredential.description}</p>
                        <div className="credential-stats">
                          <div>
                            <span>Issuer</span>
                            <strong>{previousFeaturedCredential.issuer}</strong>
                          </div>
                          <div>
                            <span>Issued</span>
                            <strong>{previousFeaturedCredential.issued}</strong>
                          </div>
                        </div>
                      </div>
                    </article>

                    <article
                      key={`entering-${displayedFeaturedCredential.title}`}
                      className="featured-credential glass-card featured-credential-transition featured-credential-promoting"
                    >
                      <div className="featured-credential-media">
                        {'logo' in displayedFeaturedCredential ? (
                          <img
                            src={withBasePath(displayedFeaturedCredential.logo)}
                            alt={displayedFeaturedCredential.alt ?? displayedFeaturedCredential.title}
                          />
                        ) : null}
                      </div>
                      <div className="featured-credential-copy">
                        <p className="pill">{displayedFeaturedCredential.subtitle}</p>
                        <h3>{displayedFeaturedCredential.title}</h3>
                        <p>{displayedFeaturedCredential.description}</p>
                        <div className="credential-stats">
                          <div>
                            <span>Issuer</span>
                            <strong>{displayedFeaturedCredential.issuer}</strong>
                          </div>
                          <div>
                            <span>Issued</span>
                            <strong>{displayedFeaturedCredential.issued}</strong>
                          </div>
                        </div>
                      </div>
                    </article>
                  </>
                ) : (
                  <article key={displayedFeaturedCredential.title} className="featured-credential glass-card">
                    <div className="featured-credential-media">
                      {'logo' in displayedFeaturedCredential ? (
                        <img
                          src={withBasePath(displayedFeaturedCredential.logo)}
                          alt={displayedFeaturedCredential.alt ?? displayedFeaturedCredential.title}
                        />
                      ) : null}
                    </div>
                    <div className="featured-credential-copy">
                      <p className="pill">{displayedFeaturedCredential.subtitle}</p>
                      <h3>{displayedFeaturedCredential.title}</h3>
                      <p>{displayedFeaturedCredential.description}</p>
                      <div className="credential-stats">
                        <div>
                          <span>Issuer</span>
                          <strong>{displayedFeaturedCredential.issuer}</strong>
                        </div>
                        <div>
                          <span>Issued</span>
                          <strong>{displayedFeaturedCredential.issued}</strong>
                        </div>
                      </div>
                    </div>
                  </article>
                )}

              </div>

              <div 
                ref={credentialSidebarRef}
                className={`credential-sidebar ${credentialAdvanceDirection ? 'credential-sidebar-cycling' : ''}`}
                onAnimationEnd={handleCredentialAnimationComplete}
              >
                {miniCredentials.map((item) => (
                  <article
                    className="credential-mini glass-card"
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

                              {incomingMiniCredential ? (
                                <article className="credential-mini glass-card" key={`incoming-${incomingMiniCredential.title}`}>
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

                    commitCredentialStart(index)
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
                  <div className="project-links">
                    <a href={project.href} target="_blank" rel="noreferrer" className="project-link">
                      Visit Live Site <ArrowRightIcon />
                    </a>
                    {project.caseStudyHref ? (
                      <a href={project.caseStudyHref} className="project-link project-case-study-link">
                        Case Studies <ArrowRightIcon />
                      </a>
                    ) : null}
                  </div>
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

      <section className="section specialized-solutions-section">
        <div className="container">
          <div className="section-heading specialized-solutions-heading">
            <p className="overline">Fractional PM Services</p>
            <h2>Specialized Solutions</h2>
            <p>
              Standard-compliant deliverables and operational frameworks tailored for startups,
              technical founders, and agency owners.
            </p>
          </div>

          <div className="solutions-grid">
            {specializedSolutions.map((solution) => (
              <article className="solution-card glass-card" key={solution.title}>
                <div className="solution-icon">
                  <SolutionIcon type={solution.icon} />
                </div>

                <h3>{solution.title}</h3>
                <p className="solution-description">{solution.description}</p>

                <ul className="solution-items">
                  {solution.items.map((item) => (
                    <li key={item}>
                      <span className="solution-dot" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a href={solution.buttonHref} className="button button-primary solution-button">
                  {solution.buttonText} <ArrowRightIcon />
                </a>
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
              <div className="contact-feature-header">
                <div className="contact-feature-icon">
                  <MailIcon />
                </div>
                <div>
                  <p className="contact-label">Calendly</p>
                  <h3>Choose a time and book the meeting directly.</h3>
                  <p>
                    Use the embedded scheduler below to request a meeting
                    without leaving the page.
                  </p>
                </div>
              </div>
              <div className="contact-calendly-shell">
                <div
                  ref={calendlyWidgetRef}
                  className="calendly-inline-widget contact-calendly-widget"
                  data-url={calendlyMeetingUrl}
                />
              </div>
            </article>
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

function CaseStudyPage({ caseStudy }) {
  return (
    <main className="portfolio-shell case-study-shell">
      <section className="case-study-section">
        <div className="container case-study-container">
          <div className="case-study-card glass-card">
            <div className="case-study-hero">
              <p className="case-study-eyebrow">
                <span className="case-study-eyebrow-icon" aria-hidden="true">
                  <CaseStudyIcon />
                </span>
                {caseStudy.eyebrow}
              </p>
              <h1>{caseStudy.title}</h1>
              <p className="case-study-summary">{caseStudy.summary}</p>
            </div>

            <div className="case-study-badges">
              <span className="case-study-badge-role">Role: {caseStudy.role}</span>
              <span className="case-study-badge-status">Status: {caseStudy.status}</span>
              <span>{caseStudy.domain}</span>
              <span>{caseStudy.focus}</span>
            </div>

            <div className="case-study-grid">
              <div className="case-study-left">
                <article className="case-study-challenge">
                  <div className="case-study-panel-title">
                    <div className="case-study-panel-icon case-study-panel-icon-challenge">
                      <TargetIcon />
                    </div>
                    <h2>The Challenge</h2>
                  </div>
                  <div className="case-study-challenge-copy">
                    {caseStudy.challengeParts.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>

                <article className="case-study-panel glass-card case-study-impact-panel">
                  <div className="case-study-panel-title">
                    <div className="case-study-panel-icon case-study-panel-icon-green">
                      <ImpactIcon />
                    </div>
                    <h2>Business Impact</h2>
                  </div>

                  <div className="case-study-metrics">
                    {caseStudy.impact.map((item) => (
                      <div className="case-study-metric" key={item.label}>
                        <strong>{item.value}</strong>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="case-study-impact-summary">
                    <h3>{caseStudy.impactHeading}</h3>
                    <p>{caseStudy.impactCopy}</p>
                  </div>
                </article>
              </div>

              <div className="case-study-right">
                <div className="case-study-execution-head">
                  <div className="case-study-panel-icon case-study-panel-icon-blue">
                    <GearIcon />
                  </div>
                  <h2>Management Execution</h2>
                </div>

                <div className="case-study-step-list">
                  {caseStudy.execution.map((step) => (
                    <article className="case-study-step glass-card" key={step.title}>
                      <span className="case-study-step-dot" aria-hidden="true" />
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.copy}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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

function CaseStudyIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M4 4.5h10M4 9h10M4 13.5h7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="9" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 1.5v2.2M16.5 9h-2.2M9 16.5v-2.2M1.5 9h2.2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.3"
      />
    </svg>
  )
}

function ImpactIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M3 12.5l3.5-3.5 2.2 2.2 5.3-6.2M12.5 5H14.5V7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function GearIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M9 4.1v1.2m0 7.4v1.2m4.9-4.9h-1.2M5.3 9H4.1m7.1-3.8-.85.85M6.75 11.95l-.85.85m6.95 0-.85-.85M6.75 6.05l-.85-.85"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
      <circle cx="9" cy="9" r="2.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
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

function SolutionIcon({ type }) {
  if (type === 'hierarchy') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="7" cy="5" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="5" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="14" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 7v4m10 0v-4M14 16v2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === 'document') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6 3h9l5 5v13a2 2 0 01-2 2H8a2 2 0 01-2-2V3zm3 7h6m-6 4h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (type === 'audit') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 14l2 2 4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return null
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
