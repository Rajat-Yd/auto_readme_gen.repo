'use server';

/**
 * @fileOverview Generates a comprehensive README.md file for a GitHub repository using GenAI.
 *
 * - generateReadmeContent - A function that generates the README content.
 * - GenerateReadmeContentInput - The input type for the generateReadmeContent function.
 * - GenerateReadmeContentOutput - The return type for the generateReadmeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReadmeContentInputSchema = z.object({
  repoMetadata: z
    .string()
    .describe('The metadata of the GitHub repository.'),
  repoAnalysis: z
    .string()
    .describe('The analysis of the GitHub repository.'),
});
export type GenerateReadmeContentInput = z.infer<typeof GenerateReadmeContentInputSchema>;

const GenerateReadmeContentOutputSchema = z.object({
  readmeContent: z
    .string()
    .describe('The generated README.md content for the repository.'),
});
export type GenerateReadmeContentOutput = z.infer<typeof GenerateReadmeContentOutputSchema>;

export async function generateReadmeContent(
  input: GenerateReadmeContentInput
): Promise<GenerateReadmeContentOutput> {
  return generateReadmeContentFlow(input);
}

const generateReadmeContentPrompt = ai.definePrompt({
  name: 'generateReadmeContentPrompt',
  input: {schema: GenerateReadmeContentInputSchema},
  output: {schema: GenerateReadmeContentOutputSchema},
  prompt: `You are an expert AI assistant that creates high-quality, professional, and visually appealing README.md files for software projects.

Please generate a complete README.md file based on the provided repository metadata and analysis.

Follow this structure and these guidelines strictly:

**Structure:**
1.  **Project Title & Tagline**: A catchy title and a brief, one-sentence tagline.
2.  **Badges**: Include relevant badges (e.g., license, stars).
3.  ✨ **Description**: An engaging overview of the project.
4.  🚀 **Features**: A bulleted list of key features, using emojis for each point.
5.  🛠️ **Tech Stack**: List the main technologies, languages, and frameworks.
6.  ⚙️ **Installation**: Clear, step-by-step installation instructions inside a code block.
7.  ▶️ **Usage**: How to run the project, with commands in a code block.
8.  🤝 **Contributing**: A brief statement inviting contributions.
9.  📄 **License**: Mention the project's license.

**Guidelines:**
- Use emojis generously to make sections visually distinct and engaging.
- Format code blocks correctly for shell commands and file contents.
- Ensure the tone is professional, clear, and encouraging.
- The output must be a single block of Markdown content.

**Repository Metadata:**
{{{repoMetadata}}}

**Repository Analysis:**
{{{repoAnalysis}}}

Now, generate the complete, professional README.md file.`,
});

const generateReadmeContentFlow = ai.defineFlow(
  {
    name: 'generateReadmeContentFlow',
    inputSchema: GenerateReadmeContentInputSchema,
    outputSchema: GenerateReadmeContentOutputSchema,
  },
  async input => {
    const {output} = await generateReadmeContentPrompt(input);
    return output!;
  }
);
