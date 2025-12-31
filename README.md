# 📅 Svelte Calendar

A minimal, clean calendar component built with **Svelte 5** and **Tailwind CSS 4** — designed as a starting point for your own DatePicker.

![Svelte 5](https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)

## ✨ Features

- 🚀 **Svelte 5 Runes** — reactive state with `$state` and `$derived`
- 🎨 **Tailwind CSS 4** — modern utility-first styling with `@import "tailwindcss"`
- 📦 **Zero runtime deps** — only `dayjs` for date manipulation
- 🧩 **Composable logic** — clean separation of calendar math in `calendar.ts`
- 🔄 **Month navigation** — slide through months with prev/next controls


## 🚀 Quick Start

```bash
# Install dependencies
bun i

# Start dev server
bun run dev
```

## 📁 Structure

```
src/
├── routes/
│   ├── +page.svelte    # Calendar UI component
│   └── calendar.ts     # Date generation logic
└── app.css             # Global styles
```

## 🧠 How It Works

The core logic lives in `calendar.ts`:

- **`genMonths(date, count)`** — generates surrounding months for the navigation bar
- **`genCells(date)`** — builds a 2D array of days for the calendar grid, handling overflow from adjacent months

```ts
const rows = calendar.genCells(currentDate);
// → [[day1, day2, ...], [day8, day9, ...], ...]
```
