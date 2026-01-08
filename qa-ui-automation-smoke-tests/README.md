# QA UI Automation Smoke Tests (Playwright)

## Project Overview
This repository contains a small, **high-signal** UI automation suite using **Playwright**. The intent is to demonstrate QA judgment: automating a **stable smoke layer** rather than attempting full UI coverage.

## Target Application
Tests run against the public demo site:
- Base URL: `https://the-internet.herokuapp.com`

This site is commonly used for QA practice and provides stable pages (auth, dynamic elements, etc.).

## What’s Included
- 6 Playwright smoke tests:
  - Login (happy path)
  - Login (invalid credentials)
  - Add/Remove Elements
  - Checkboxes (set a known state)
  - Dropdown selection
  - Broken image detection (simple heuristic)
- Playwright HTML reporting
- GitHub Actions workflow to run tests on push / PR

## How to Run

### 1) Install
```bash
npm install
npx playwright install --with-deps
```

### 2) Run tests
```bash
npm test
```

### 3) View HTML report
```bash
npx playwright show-report
```

## Design Notes (Why Smoke Tests)
- These tests target flows that are typically business-critical and stable.
- Volatile UI areas are intentionally left for manual/exploratory testing.

## Limitations
- This is a public demo site; availability/content may change.
- The suite does not cover cross-browser matrices beyond default Playwright capabilities.
