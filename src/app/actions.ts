'use server';

import type { ReadmeFormState } from '@/lib/types';
import { parseGitHubUrl, getRepoData } from '@/lib/github';
import { analyzeRepoForReadme } from '@/ai/flows/analyze-repo-readme';
import { generateReadmeContent } from '@/ai/flows/generate-readme-content';
import { z } from 'zod';

const formSchema = z.object({
  repoUrl: z.string().url({ message: 'Please enter a valid URL.' }),
});

export async function generateReadmeAction(
  prevState: ReadmeFormState,
  formData: FormData
): Promise<ReadmeFormState> {
  const validatedFields = formSchema.safeParse({
    repoUrl: formData.get('repoUrl'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors.repoUrl?.join(', '),
    };
  }

  const repoUrl = validatedFields.data.repoUrl;

  const parsedUrl = parseGitHubUrl(repoUrl);
  if (!parsedUrl) {
    return {
      success: false,
      error: 'Invalid GitHub repository URL format.',
    };
  }
  const { owner, repo } = parsedUrl;

  try {
    const { repoMetadata, languages, importantFiles } = await getRepoData(owner, repo);
    
    const repoMetadataString = JSON.stringify({
        name: repoMetadata.name,
        description: repoMetadata.description,
        stars: repoMetadata.stargazers_count,
        forks: repoMetadata.forks_count,
        topics: repoMetadata.topics,
        license: repoMetadata.license?.name,
    }, null, 2);

    const languagesString = JSON.stringify(languages, null, 2);

    const repoAnalysis = await analyzeRepoForReadme({
      repoMetadata: repoMetadataString,
      languages: languagesString,
      importantFiles: importantFiles,
    });
    
    const repoAnalysisString = JSON.stringify(repoAnalysis, null, 2);
    
    const { readmeContent } = await generateReadmeContent({
      repoMetadata: repoMetadataString,
      repoAnalysis: repoAnalysisString,
    });
    
    return {
        success: true,
        readme: readmeContent,
    };

  } catch (e: any) {
    console.error(e);
    return {
      success: false,
      error: e.message || 'An unexpected error occurred. Please try again.',
    };
  }
}
