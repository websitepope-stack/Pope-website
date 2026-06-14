# Pope Memorial Higher Secondary School

A modern, responsive web application for Pope Memorial Higher Secondary School, Sawyerpuram. Built with Next.js and Tailwind CSS, this project serves as the official school website, providing information about academics, activities, achievements, and school history.

## Technology Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: AOS (Animate on Scroll)
- **Media Viewing**: LightGallery, React Medium Image Zoom
- **Image Optimization**: Next Image Export Optimizer

## Architecture

The application is built using the Next.js App Router paradigm, heavily utilizing React Server Components for optimal performance and SEO. 

### Key Directories
- `/app`: Contains the routing structure (`/`, `/activities`, `/achievements`, `/gallery`).
- `/components`: Modular UI components used across the application (e.g., `Navbar`, `Footer`, `Hero`, `Contact`).
- `/lib`: Core utilities and API integration logic. The `api.js` file handles all data fetching from the headless CMS.

### Data Fetching
Content is dynamically fetched from the Pope Memorial CMS backend (`api.popememorialhss.org`). The application uses Next.js fetch caching mechanisms to ensure fast delivery while keeping content up to date. Contact submissions are also routed through this API.

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Install the dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build and Deployment

The project is configured for static export by default in `next.config.mjs` (`output: "export"`). 

To build the project for production:

```bash
npm run build
```

This will generate an optimized static HTML/CSS/JS output in the `out` directory, which can be deployed to any static hosting provider.

## License

Copyright © Pope Memorial Higher Secondary School. All rights reserved.
