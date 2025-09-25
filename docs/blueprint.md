# **App Name**: AutoReadmeGen

## Core Features:

- Repo URL Input: Accept a GitHub repository URL as input through a web UI form.
- Fetch Repo Data: Use the GitHub REST API to fetch repository metadata and file content.
- Analyze Repo: Detect the project's primary language, dependencies, and project structure by analyzing the fetched data and relevant files.
- Generate README Content: Send the structured repo metadata and analysis to a large language model. Use a tool to generate a comprehensive README.md file with sections for Project Title, Description, Features, Installation, Usage, Tech Stack, Contributing, and License.
- Display README Preview: Display the generated README content in a styled preview on the web UI.
- Download README: Provide an option to download the generated README as a README.md file.

## Style Guidelines:

- Primary color: Soft blue (#90AFC5) to convey trustworthiness and professionalism.
- Background color: Light gray (#F0F4F8) for a clean, uncluttered look.
- Accent color: Teal (#336B87) to highlight key UI elements, such as the 'Generate README' button and links.
- Headline font: 'Space Grotesk' (sans-serif) for a computerized, techy, scientific feel, and for short amounts of text; body text: 'Inter' (sans-serif) for longer passages.
- Use simple, monochrome icons from a library like FontAwesome or Feather Icons to represent different sections and actions.
- Maintain a clean and structured layout with clear separation between sections using whitespace and dividers.
- Use subtle animations, like a fade-in effect, when displaying the generated README preview to enhance user experience.