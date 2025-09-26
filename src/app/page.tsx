'use client';

import { useActionState } from 'react';
import { useEffect } from 'react';
import { generateReadmeAction } from '@/app/actions';
import type { ReadmeFormState } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ReadmePreview } from '@/components/readme-preview';
import { Logo } from '@/components/icons';
import { SubmitButton } from '@/components/submit-button';
import { Github } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

const initialState: ReadmeFormState = {
  success: false,
};

export default function Home() {
  const [state, formAction] = useActionState(generateReadmeAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (!state.success && state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center p-4 sm:p-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
        <div className="w-full max-w-3xl text-center flex flex-col items-center space-y-4 rounded-lg p-8">
          <Logo />
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Instantly generate a professional README for any public GitHub repository using AI. Just paste the URL below to get started.
          </p>
        </div>

        <form
          action={formAction}
          className="w-full max-w-2xl bg-card p-6 rounded-lg border shadow-sm space-y-4 transition-shadow hover:shadow-md"
        >
          <div className="space-y-2">
            <Label htmlFor="repoUrl">GitHub Repository URL</Label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="repoUrl"
                name="repoUrl"
                type="url"
                placeholder="https://github.com/owner/repo"
                required
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex justify-end">
             <SubmitButton />
          </div>
        </form>

        {state.success && state.readme && (
          <ReadmePreview content={state.readme} />
        )}
      </div>
    </main>
  );
}
