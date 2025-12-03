import { ResumeData } from './types';

export const RESUME: ResumeData = {
  personal: {
    name: "VIKAS KUMAR",
    role: "Senior QA Automation Analyst | DevOps & CI/CD Specialist",
    location: "London, ON (Open to Remote)",
    phone: "+1 226-978-9697",
    email: "vkvikaskumar447@gmail.com",
    summary: "Senior QA Automation Analyst with 8 years of experience architecting scalable test automation frameworks and implementing DevOps-enabled CI/CD pipelines. Proven track record of improving team efficiency by 35% and reducing regression testing cycles by 60%. Expert in Playwright, Selenium, Cucumber BDD, GitLab CI, Docker, and AWS. Currently expanding expertise in DevOps engineering and AI-augmented testing."
  },
  skills: [
    { name: "Automation (Playwright/Selenium)", level: 95, fullMark: 100 },
    { name: "DevOps (GitLab/Docker/AWS)", level: 85, fullMark: 100 },
    { name: "Languages (Java/TS/Python)", level: 90, fullMark: 100 },
    { name: "API Testing (Postman/REST)", level: 90, fullMark: 100 },
    { name: "Databases (SQL/NoSQL)", level: 80, fullMark: 100 },
    { name: "AI Tools (Copilot/LLM)", level: 75, fullMark: 100 },
  ],
  experience: [
    {
      company: "JD Power & Associates",
      role: "Senior QA Automation Analyst",
      location: "London, ON (Remote)",
      period: "March 2022 – Present",
      tech: ["Playwright", "TypeScript", "Serenity BDD", "Cucumber", "Docker", "AWS", "GitLab CI"],
      details: [
        "Lead team of 5 QA analysts in Agile environment, collaborating with developers to deliver mission-critical automotive intelligence solutions.",
        "Architect and maintain scalable test automation frameworks using Playwright, TypeScript, Serenity BDD, and Cucumber (500+ scenarios).",
        "Design and implement GitLab CI/CD pipelines with Docker containerization and AWS integration.",
        "Improved team efficiency by 35% through process optimization and JIRA metrics.",
        "Leverage GitHub Copilot to achieve 3X velocity in test script development.",
        "Perform complex database validation using SQL queries against MS SQL Server and NoSQL."
      ]
    },
    {
      company: "CGI (Financial Services Client)",
      role: "Automation Tester",
      location: "Remote",
      period: "April 2021 – February 2022",
      tech: ["Java", "Selenium", "Cucumber BDD", "Maven", "Jenkins"],
      details: [
        "Designed and implemented test automation frameworks using Java, Selenium, Cucumber BDD.",
        "Reduced regression testing time by 60% by converting 100+ manual test cases into reusable automated scripts.",
        "Configured and maintained Jenkins CI/CD pipelines for continuous integration.",
        "Collaborated with development teams to implement shift-left testing practices."
      ]
    },
    {
      company: "The Peer Group (Manufacturing Client)",
      role: "Automation Tester",
      location: "Remote",
      period: "May 2019 – March 2021",
      tech: ["Java", "Selenium", "BDD", "SoapUI", "Postman"],
      details: [
        "Built automation frameworks using Java, Selenium, and BDD methodology (200+ scenarios).",
        "Reduced manual testing efforts by 70% through Jenkins-integrated automated execution.",
        "Executed comprehensive API testing using Postman and SoapUI for RESTful/SOAP services.",
        "Implemented cross-browser testing strategies and mobile testing on iOS and Android."
      ]
    },
    {
      company: "Echo Exit Webcorner",
      role: "QA Analyst",
      location: "India",
      period: "2015 – 2016",
      tech: ["Manual Testing", "Regression", "Web/Mobile"],
      details: [
        "Executed functional, regression, and integration testing across web and mobile platforms.",
        "Reduced manual testing time by 50% through automation initiatives."
      ]
    }
  ],
  education: [
    {
      degree: "Post-Graduate Diploma",
      school: "Conestoga College, Ontario",
      year: "2016 – 2019"
    },
    {
      degree: "Bachelor of Engineering in Mechanical Engineering",
      school: "Graduated",
      year: "June 2015"
    }
  ],
  certifications: [
    { 
        name: "ISTQB® Certified Tester", 
        issuer: "Foundation Level | iSQI",
        url: "https://app.skillsclub.com/credential/58652-b436e6c4706431e857fadc98ba6fec8674377c89904264bcb94e1e8362a912f2"
    },
    { 
        name: "AWS Certified Cloud Practitioner", 
        issuer: "Amazon Web Services",
        url: "https://www.credly.com/badges/1713094d-ad9c-415e-973e-529e7520be7d/linked_in_profile"
    },
    { 
        name: "Intro to Gen AI & LLMs", 
        issuer: "Google Cloud",
        url: "https://www.coursera.org/account/accomplishments/specialization/G1Q0YLAU7AXA"
    },
    { 
        name: "MCP Servers and Automation", 
        issuer: "ShiftSync",
        url: "https://credsverse.com/credentials/74ba4580-56c7-42a8-87e6-e0053fb19e62"
    }
  ],
  achievements: [
    { title: "Efficiency Boost", description: "Improved team efficiency by 35%." },
    { title: "Velocity Increase", description: "3X test dev velocity with AI." },
    { title: "Regression Cut", description: "Reduced regression time by 60%." },
    { title: "Migration Lead", description: "Migrated 200+ tests to automation." }
  ]
};