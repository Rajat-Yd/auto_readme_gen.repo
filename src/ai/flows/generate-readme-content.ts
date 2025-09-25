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
  prompt: `You are an AI assistant that generates professional README.md files.

Follow this exact structure in Markdown:

1.  Project Title
2.  Description
3.  Features
4.  Installation
5.  Usage
6.  Tech Stack
7.  Contributing
8.  License

Keep it concise, professional, and formatted for GitHub.

Repository metadata:
{{{repoMetadata}}}

Repository analysis:
{{{repoAnalysis}}}

Generate a complete README.md file.`,
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
