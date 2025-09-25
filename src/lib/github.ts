import { z } from 'zod';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.warn(
    'GITHUB_TOKEN environment variable not set. API requests to GitHub will be unauthenticated and subject to lower rate limits.'
  );
}

const headers = {
  Accept: 'application/vnd.github.v3+json',
  Authorization: GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : '',
  'X-GitHub-Api-Version': '2022-11-28',
};

const repoUrlSchema = z.string().url().refine(
  (url) => {
    try {
      const { hostname, pathname } = new URL(url);
      return hostname === 'github.com' && pathname.split('/').filter(Boolean).length >= 2;
    } catch {
      return false;
    }
  },
  { message: 'Please enter a valid GitHub repository URL.' }
);

export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const validation = repoUrlSchema.safeParse(url);
  if (!validation.success) {
    return null;
  }
  
  try {
    const { pathname } = new URL(url);
    const [owner, repo] = pathname.split('/').filter(Boolean);
    return { owner, repo };
  } catch {
    return null;
  }
}

async function fetchGitHubApi(endpoint: string) {
  const response = await fetch(`${GITHUB_API_URL}${endpoint}`, { headers });
  if (!response.ok) {
    if (response.status === 403) {
        throw new Error(`GitHub API request forbidden. This might be due to a missing, invalid, or expired GITHUB_TOKEN, or you may have hit the rate limit. Please check your token in the .env.local file.`);
    }
    if (response.status === 404) {
      return null;
    }
    throw new Error(`GitHub API request failed for ${endpoint}: ${response.statusText}`);
  }
  return response.json();
}

async function fetchFileContent(owner: string, repo: string, path: string): Promise<string | null> {
    const data = await fetchGitHubApi(`/repos/${owner}/${repo}/contents/${path}`);
    if (data && data.content) {
      return Buffer.from(data.content, 'base64').toString('utf-8');
    }
    return null;
}

const IMPORTANT_FILES_TO_CHECK = [
  'package.json',
  'requirements.txt',
  'Pipfile',
  'setup.py',
  'pyproject.toml',
  'go.mod',
  'Cargo.toml',
  'composer.json',
  'Gemfile',
  'pom.xml',
  'build.gradle',
  'Dockerfile',
  'docker-compose.yml',
  '.github/workflows/main.yml',
  '.github/workflows/ci.yml'
];

export async function getRepoData(owner: string, repo: string) {
  const [repoMetadata, languages] = await Promise.all([
    fetchGitHubApi(`/repos/${owner}/${repo}`),
    fetchGitHubApi(`/repos/${owner}/${repo}/languages`),
  ]);

  if (!repoMetadata) {
    throw new Error('Repository not found or could not be accessed.');
  }

  const fileContents = await Promise.all(
    IMPORTANT_FILES_TO_CHECK.map(file => 
      fetchFileContent(owner, repo, file).then(content => ({ file, content }))
    )
  );
  
  const importantFiles = fileContents
    .filter(fc => fc.content !== null)
    .map(fc => `### ${fc.file}\n\n\`\`\`\n${fc.content}\n\`\`\``)
    .join('\n\n');

  return {
    repoMetadata,
    languages,
    importantFiles,
  };
}
