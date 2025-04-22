# TopicLenx Frontend

## Overview
This is the frontend for the TopicLenx application, a tool for advanced text analysis and topic clustering. It is built with Next.js, React, and Tailwind CSS.

## Project Structure
- **/app**: Next.js app directory (pages, layout, main UI)
- **/components**: Reusable React components
- **/types**: TypeScript type definitions (including API types)
- **/public**: Static assets (images, etc.)
- **/styles**: Global and utility CSS (merged into `app/globals.css`)

## Setup Instructions
1. **Install dependencies:**
   ```sh
   npm install
   ```
   > **Note:** If you encounter dependency conflicts, use:
   > ```sh
   > npm install --legacy-peer-deps
   > ```
2. **Run the development server:**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   npm start
   ```

## API Integration
The frontend expects a backend API for processing clustering requests. The main integration points are:

- **Endpoint:** `/api/process-clusters` (POST)
  - **Request:**
    - `file`: Excel file (multipart/form-data)
    - `columns`: JSON string of selected columns
    - `clusterCount`: Number of clusters
  - **Response:**
    - On success: `{ data: { topics: Topic[], ... }, error?: string }`
    - On error: `{ error: string }`

- **Endpoint:** `/api/download-results?id=...` (GET)
  - Used for downloading processed results as an Excel file.

### API Types
See `types/api.ts` for TypeScript interfaces used in API requests and responses.

## Mock Data
- The frontend uses mock data (`mocks/clusterData.ts`) for development and testing.
- To integrate with the backend, replace the mock logic in `app/page.tsx` with real API calls (see commented code in `handleClusterConfiguration` and `handleDownload`).

## Notes 
- The backend should handle file uploads (Excel), parse columns, and return clustering results in the expected format.
- Error messages should be returned as `{ error: string }` for frontend display.
- The download endpoint should return a valid Excel file for the given result ID.

## Development Tips
- Tailwind CSS is used for styling. See `app/globals.css` and `tailwind.config.ts` for theme and color variables.
- All UI components are in `/components/ui`.
- TypeScript is used throughout the project for type safety.

## Application Flow
The application flow works like this:
1. User uploads Excel file (`upload-excel.tsx`)
2. User selects columns to analyze (`column-selection.tsx`)
3. User configures clustering parameters (`cluster-configuration.tsx`)
4. Results are displayed through:
   - Topic distribution visualization (`topic-distribution.tsx`)
   - Cluster scatter plot (`cluster-scatter-plot.tsx`)
   - Topics table (`topics-table.tsx`)
   - All managed by the results visualization component (`results-visualization.tsx`)

The `wells-fargo-header.tsx` and `footer.tsx` provide consistent branding and layout across all pages.

---
