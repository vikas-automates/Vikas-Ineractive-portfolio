
# 🎭 Playwright Automation Showcase

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
*   Includes a `Jenkinsfile` for Declarative Pipelines.
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

```sh
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
```

## ⚡ Getting Started

### Prerequisites
*   Node.js 18+
*   npm

### Installation
```bash
git clone https://github.com/vkvikaskumar/playwright-showcase.git
cd playwright-showcase
npm install
npx playwright install --with-deps
```

### Running Tests
```bash
# Run all tests in headless mode
npx playwright test

# Run with UI Mode (Interactive)
npx playwright test --ui
```

---
*Built with ❤️ by Vikas Kumar*
