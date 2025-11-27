
import React, { useState } from 'react';
import { Folder, FileCode, ChevronRight, ChevronDown, Play } from 'lucide-react';

const FILE_STRUCTURE = {
  "playwright-automation-showcase": {
    "tests": {
      "portfolio.spec.ts": `import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../pages/PortfolioPage';
import { TEST_DATA } from '../utils/testData';

test.describe('Portfolio UX - Comprehensive Testing', () => {
  let portfolioPage: PortfolioPage;

  test.beforeEach(async ({ page }) => {
    portfolioPage = new PortfolioPage(page);
    await portfolioPage.navigate();
  });

  test('Verify Hero Section identity matches candidate', async ({ page }) => {
    // Validates that the landing area correctly identifies the candidate
    await expect(portfolioPage.heroTitle).toBeVisible();
    await expect(portfolioPage.heroTitle).toHaveText(TEST_DATA.candidateName);
    await expect(page).toHaveTitle(/Vikas Kumar/);
  });

  test('Navigation to Projects section verification', async ({ page }) => {
    // Simulates user interaction to scroll/navigate to projects
    await portfolioPage.navigateToProjects();
    await expect(portfolioPage.projectSection).toBeInViewport();
    await expect(portfolioPage.projectSection).toBeVisible();
  });

  test('Skill Radar Chart renders correctly', async ({ page }) => {
    // Ensures complex data visualizations are loaded
    await expect(portfolioPage.skillRadar).toBeVisible();
  });

  test('Contact link validation', async ({ page }) => {
    await expect(portfolioPage.contactLink).toHaveAttribute('href', \`mailto:\${TEST_DATA.email}\`);
  });
});`,
      "navigation.spec.ts": `import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../pages/PortfolioPage';

test.describe('Navigation Flow', () => {
  test('Smooth scroll behavior', async ({ page }) => {
    const portfolioPage = new PortfolioPage(page);
    await portfolioPage.navigate();
    
    // Check initial state
    await expect(page).toHaveURL(/#$/);
    
    // Trigger navigation
    await portfolioPage.navigateToHighlights();
    
    // Verify viewport movement
    await expect(page.locator('#highlights')).toBeInViewport();
  });
});`
    },
    "pages": {
      "PortfolioPage.ts": `import { Page, Locator } from '@playwright/test';

export class PortfolioPage {
  readonly page: Page;
  readonly heroTitle: Locator;
  readonly viewWorkButton: Locator;
  readonly projectSection: Locator;
  readonly skillRadar: Locator;
  readonly contactLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroTitle = page.locator('h1');
    this.viewWorkButton = page.getByRole('button', { name: 'View Work' });
    this.projectSection = page.locator('#projects');
    this.skillRadar = page.locator('.recharts-responsive-container');
    this.contactLink = page.locator('a[href^="mailto:"]');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async navigateToProjects() {
    // Triggers smooth scroll to projects
    const projectButton = this.page.getByText('Projects', { exact: true });
    await projectButton.click();
  }

  async navigateToHighlights() {
    await this.viewWorkButton.click();
  }
}`
    },
    "utils": {
      "testData.ts": `export const TEST_DATA = {
  candidateName: 'Vikas Kumar',
  role: 'Senior QA Automation Analyst',
  email: 'vkvikaskumar447@gmail.com',
  sections: ['Highlights', 'Projects', 'Experience']
};`,
      "helpers.ts": `import { Page } from '@playwright/test';

export async function takeScreenshotOnFailure(page: Page, testInfo: any) {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({ path: \`screenshots/\${testInfo.title}.png\` });
  }
}`
    },
    ".github": {
      "workflows": {
        "playwright.yml": `name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18

    - name: Install Dependencies
      run: npm ci

    - name: Install Playwright Browsers
      run: npx playwright install --with-deps

    - name: Run Playwright Tests
      run: npx playwright test

    - name: Generate Allure Report
      if: always()
      run: npm run report:generate

    - name: Upload Allure Artifact
      uses: actions/upload-pages-artifact@v2
      if: always()
      with:
        path: allure-report

  deploy-report:
    needs: test
    if: always()
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2`
      }
    },
    "Jenkinsfile": `pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.40.0-jammy'
            args '--ipc=host'
        }
    }
    
    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                // Runs tests in headless mode inside the Docker container
                sh 'npx playwright test'
            }
        }

        stage('Generate Report') {
            steps {
                sh 'npm run report:generate'
            }
        }
    }

    post {
        always {
            // Publish Allure Report using the Jenkins Allure Plugin
            allure includeProperties: false, 
                   jdk: '', 
                   results: [[path: 'allure-results']]
            
            // Clean up workspace to save disk space
            cleanWs()
        }
    }
}`,
    "playwright.config.ts": `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['line'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
      environmentInfo: {
        os_platform: 'Linux',
        node_version: process.version,
      }
    }]
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});`,
    "package.json": `{
  "name": "playwright-automation-showcase",
  "version": "1.0.0",
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "report:generate": "allure generate allure-results -o allure-report --clean",
    "report:open": "allure open allure-report"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "allure-commandline": "^2.25.0",
    "allure-playwright": "^2.10.0",
    "typescript": "^5.0.0"
  }
}`,
    "README.md": `# 🎭 Playwright Automation Showcase

[![Playwright Tests](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Jenkins](https://img.shields.io/badge/Jenkins-Build-red)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]()

> **A production-grade test automation framework designed to validate the modern web experience of this portfolio.**

## 🚀 Project Mission

This repository demonstrates a **robust, scalable, and maintainable** test automation architecture. It implements industry best practices used in enterprise environments to validate mission-critical applications.

It specifically targets the **Vikas Kumar Portfolio**, verifying:
*   **UX/UI Integrity**: Smooth scrolling, responsive layouts, and animations.
*   **Functional Criticality**: Contact links, navigation flows, and data visualization rendering.
*   **Content Accuracy**: Resume data validation against source of truth.

## ♾️ Multi-CI Support (Jenkins & GitHub Actions)

This framework is **CI-Agnostic**, demonstrating versatility in DevOps environments:

### 1. GitHub Actions (Cloud Native)
*   Automatically triggers on PRs and merges.
*   Parallel execution across Chromium, Firefox, and WebKit.
*   Deploys Allure reports to GitHub Pages.

### 2. Jenkins (Enterprise Standard)
*   Includes a \`Jenkinsfile\` for Declarative Pipelines.
*   Uses **Docker Agents** to ensure a consistent execution environment.
*   Integrates with the **Allure Plugin** for historical trend analysis.

## 🛠️ Tech Stack & Architecture

Built with a focus on **Page Object Model (POM)** and **Type Safety**.

| Category | Technology | Usage |
|----------|------------|-------|
| **Core** | **Playwright** | End-to-end testing engine |
| **Language** | **TypeScript** | Type-safe implementation |
| **CI/CD** | **Jenkins & GH Actions** | Automated pipeline execution |
| **Reporting** | **Allure** | Historical trend analysis & rich reporting |

## 📂 Project Structure

The project follows a modular structure to ensure maintainability:

\`\`\`sh
playwright-automation-showcase/
├── 📁 tests/              # Test specifications (The "What")
│   ├── portfolio.spec.ts  # Functional validation of the portfolio
│   └── navigation.spec.ts # UX & Routing validation
├── 📁 pages/              # Page Object Models (The "How")
│   └── PortfolioPage.ts   # Encapsulated locators & actions
├── 📁 utils/              # Shared Utilities
│   ├── testData.ts        # Single source of truth for test data
│   └── helpers.ts         # Custom assertions & error handling
├── 📄 Jenkinsfile         # Enterprise CI Pipeline Config
└── 📁 .github/workflows/  # Cloud CI Pipeline Config
\`\`\`

## ⚡ Getting Started

### Prerequisites
*   Node.js 18+
*   npm

### Installation
\`\`\`bash
git clone https://github.com/vkvikaskumar/playwright-showcase.git
cd playwright-showcase
npm install
npx playwright install --with-deps
\`\`\`

### Running Tests
\`\`\`bash
# Run all tests in headless mode
npx playwright test

# Run with UI Mode (Interactive)
npx playwright test --ui
\`\`\`

---
*Built with ❤️ by Vikas Kumar*
`
  }
};

const FileIcon = ({ name }: { name: string }) => {
  if (name.endsWith('.ts')) return <span className="text-blue-400 font-bold text-xs mr-2">TS</span>;
  if (name.endsWith('.yml')) return <span className="text-yellow-400 font-bold text-xs mr-2">YML</span>;
  if (name.endsWith('.json')) return <span className="text-green-400 font-bold text-xs mr-2">{}</span>;
  if (name.endsWith('.md')) return <span className="text-gray-400 font-bold text-xs mr-2">MD</span>;
  if (name === 'Jenkinsfile') return <span className="text-red-400 font-bold text-xs mr-2">J</span>;
  return <FileCode size={14} className="mr-2 text-text-secondary" />;
};

export const ProjectShowcase = () => {
  const [selectedFile, setSelectedFile] = useState<string>("portfolio.spec.ts");
  const [content, setContent] = useState<string>(FILE_STRUCTURE['playwright-automation-showcase']['tests']['portfolio.spec.ts']);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'playwright-automation-showcase': true,
    'tests': true,
    'pages': true,
    'utils': true,
    '.github': false,
    'workflows': false
  });

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const handleFileClick = (fileName: string, fileContent: string) => {
    setSelectedFile(fileName);
    setContent(fileContent);
  };

  // Recursive function to render tree
  const renderTree = (node: any, path: string = '') => {
    return Object.keys(node).map((key) => {
      const isFolder = typeof node[key] === 'object';
      const currentPath = path ? `${path}/${key}` : key;
      const isExpanded = expandedFolders[key];

      if (isFolder) {
        return (
          <div key={currentPath} className="ml-4">
            <div 
              className="flex items-center py-1 cursor-pointer hover:text-white text-text-secondary transition-colors"
              onClick={() => toggleFolder(key)}
            >
              {isExpanded ? <ChevronDown size={14} className="mr-1" /> : <ChevronRight size={14} className="mr-1" />}
              <Folder size={14} className="mr-2 text-primary" />
              <span className="text-sm">{key}</span>
            </div>
            {isExpanded && renderTree(node[key], currentPath)}
          </div>
        );
      } else {
        return (
          <div 
            key={currentPath} 
            className={`ml-8 flex items-center py-1 cursor-pointer transition-colors ${selectedFile === key ? 'text-primary bg-primary/10 rounded px-2 -ml-6' : 'text-text-secondary hover:text-white'}`}
            onClick={() => handleFileClick(key, node[key])}
          >
            <FileIcon name={key} />
            <span className="text-sm">{key}</span>
          </div>
        );
      }
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-6 h-[600px] glass-panel rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        
        {/* Sidebar / File Explorer */}
        <div className="w-full md:w-64 bg-black/50 border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="ml-3 text-xs font-mono text-text-secondary">EXPLORER</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
            {renderTree(FILE_STRUCTURE)}
          </div>
        </div>

        {/* Code Editor Area */}
        <div className="flex-1 flex flex-col bg-[#0d0d0d]">
          {/* Editor Header */}
          <div className="h-12 border-b border-white/10 flex items-center px-4 justify-between bg-black/20">
            <div className="flex items-center gap-2">
              <FileIcon name={selectedFile} />
              <span className="text-sm text-white font-medium">{selectedFile}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-green-500/10 border border-green-500/20 cursor-pointer hover:bg-green-500/20 transition-colors">
                <Play size={10} className="text-green-500" />
                <span className="text-xs text-green-500 font-medium">Run Test</span>
              </div>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1 overflow-auto p-4 font-mono text-sm leading-relaxed relative group">
             <pre className="text-gray-300">
                <code>
                    {content.split('\n').map((line, i) => (
                        <div key={i} className="table-row">
                            <span className="table-cell text-right pr-4 select-none text-gray-700 w-8">{i + 1}</span>
                            <span className="table-cell whitespace-pre-wrap">{line}</span>
                        </div>
                    ))}
                </code>
             </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
