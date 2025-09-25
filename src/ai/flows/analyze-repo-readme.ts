'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing a GitHub repository
 * to extract relevant information for generating a README.md file.
 *
 * It includes:
 * - `analyzeRepoForReadme` function: Analyzes a GitHub repository and returns
 *   structured data for README generation.
 * - `AnalyzeRepoForReadmeInput`: The input type for the analyzeRepoForReadme function.
 * - `AnalyzeRepoForReadmeOutput`: The return type for the analyzeRepoForReadme function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeRepoForReadmeInputSchema = z.object({
  repoMetadata: z
    .string()
    .describe('The metadata of the repository including name, description, stars, forks, topics, and license.'),
  languages: z
    .string()
    .describe('The programming languages used in the repository and their respective percentages.'),
  importantFiles: z
    .string()
    .describe('Content of important files like package.json, requirements.txt, setup.py, Dockerfile, etc.'),
});
export type AnalyzeRepoForReadmeInput = z.infer<typeof AnalyzeRepoForReadmeInputSchema>;

const AnalyzeRepoForReadmeOutputSchema = z.object({
  primaryLanguage: z.string().describe('The primary programming language used in the repository.'),
  dependencies: z.string().describe('A list of the dependencies used in the project.'),
  projectStructure: z
    .string()
    .describe('A summary of the project structure including top-level folders and important files.'),
  scripts: z.string().describe('Important scripts or commands used in the project.'),
});
export type AnalyzeRepoForReadmeOutput = z.infer<typeof AnalyzeRepoForReadmeOutputSchema>;

export async function analyzeRepoForReadme(
  input: AnalyzeRepoForReadmeInput
): Promise<AnalyzeRepoForReadmeOutput> {
  return analyzeRepoForReadmeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeRepoForReadmePrompt',
  input: {schema: AnalyzeRepoForReadmeInputSchema},
  output: {schema: AnalyzeRepoForReadmeOutputSchema},
  prompt: `You are an AI expert in analyzing software repositories.

You will receive the repository metadata, languages used, and content of important files.
Your task is to analyze this information and provide a structured summary, strictly following these instructions:

1.  Identify the primary programming language used in the repository and set the primaryLanguage output field.
2.  Extract the dependencies used in the project from the important files and set the dependencies output field.
3.  Summarize the project structure including top-level folders and important files and set the projectStructure output field.
4.  Detect important scripts or commands (e.g., python main.py, flask run, pytest) used in the project and set the scripts output field.

Here is the repository metadata:
{{repoMetadata}}

Here are the languages used:
{{languages}}

Here are the contents of important files:
{{importantFiles}}`,
});

const analyzeRepoForReadmeFlow = ai.defineFlow(
  {
    name: 'analyzeRepoForReadmeFlow',
    inputSchema: AnalyzeRepoForReadmeInputSchema,
    outputSchema: AnalyzeRepoForReadmeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
