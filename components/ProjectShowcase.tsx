
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
    "README.md": `# Playwright Automation Showcase

## Overview
This repository contains a production-grade test automation framework for the portfolio website. It demonstrates strict adherence to the **Page Object Model (POM)** pattern, modular utilities, and a robust CI/CD pipeline integrated with **GitHub Actions** and **Allure Reporting**.

## Project Structure
The project is organized to separate concerns and ensure scalability:

\`\`\`
playwright-automation-showcase/
├── tests/              # Test specifications (specs)
│   ├── portfolio.spec.ts   # Main functional tests
│   └── navigation.spec.ts  # Routing and scroll tests
├── pages/              # Page Object Models (POM)
│   └── PortfolioPage.ts    # Locators & methods for the main page
├── utils/              # Shared utilities
│   ├── testData.ts         # Centralized test data
│   └── helpers.ts          # Common helper functions
├── .github/workflows/  # CI/CD Configuration
└── playwright.config.ts # Global Test Configuration
\`\`\`

## Key Features

### 1. Page Object Model (POM)
All selectors and interactions are encapsulated within \`pages/\`. Tests never interact with raw locators (e.g., \`page.locator('.class')\`), ensuring that UI changes only require updates in one place.

### 2. Allure Reporting & Dashboard
We use **Allure** for rich reporting. 
- **Local:** Run \`npm run report:open\` to view interactive graphs of test execution.
- **CI/CD:** The pipeline automatically generates the report and deploys it to **GitHub Pages**, providing a persistent history of test runs.

### 3. GitHub Actions Pipeline
The workflow defined in \`.github/workflows/playwright.yml\`:
1.  Sets up the Node.js environment.
2.  Installs dependencies and Playwright browsers.
3.  Executes tests across Chromium, Firefox, and WebKit.
4.  Generates the Allure HTML report.
5.  Deploys the report to the \`gh-pages\` branch.
`
  }
};

const FileIcon = ({ name }: { name: string }) => {
  if (name.endsWith('.ts')) return <span className="text-blue-400 font-bold text-xs mr-2">TS</span>;
  if (name.endsWith('.yml')) return <span className="text-yellow-400 font-bold text-xs mr-2">YML</span>;
  if (name.endsWith('.json')) return <span className="text-green-400 font-bold text-xs mr-2">{}</span>;
  if (name.endsWith('.md')) return <span className="text-gray-400 font-bold text-xs mr-2">MD</span>;
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
