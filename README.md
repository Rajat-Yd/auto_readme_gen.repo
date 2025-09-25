# AutoReadmeGen

AutoReadmeGen is a Next.js application that takes a public GitHub repository URL and uses Generative AI to automatically create a comprehensive `README.md` file for it.

![AutoReadmeGen Screenshot](https://picsum.photos/seed/autoreadmegen/1200/800)

## ✨ Features

- **Simple Web UI**: A clean and modern interface to input a GitHub repository URL.
- **GitHub Data Fetching**: Automatically fetches repository metadata, programming languages, and contents of important files like `package.json`, `requirements.txt`, etc.
- **AI-Powered Analysis**: Leverages GenAI to analyze the repository's structure, dependencies, and primary language.
- **README Generation**: Generates a professional, well-structured `README.md` with sections for Description, Features, Installation, Usage, and more.
- **Live Preview**: Instantly preview the generated Markdown content.
- **Download**: Download the final `README.md` file with a single click.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
- **AI**: [Google Gemini](https://ai.google.dev/) via [Genkit](https://firebase.google.com/docs/genkit)
- **Form Management**: React Hook Form with Server Actions
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Can be deployed on any platform that supports Next.js, including [Firebase App Hosting](https://firebase.google.com/docs/app-hosting).

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm, pnpm, or yarn

### Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables. You can copy the structure from `.env.example`.

```bash
# Get a personal access token from GitHub: https://github.com/settings/tokens
# It needs `public_repo` scope to access public repository data.
GITHUB_TOKEN="your_github_token"

# Get your API key from Google AI Studio: https://aistudio.google.com/app/apikey
GOOGLE_API_KEY="your_google_api_key"
```

### Installation & Running Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/AutoReadmeGen.git
    cd AutoReadmeGen
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## 📄 License

This project is open source.
