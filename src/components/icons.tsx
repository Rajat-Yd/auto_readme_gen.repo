import { FileCode } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-4 text-4xl font-headline font-bold text-primary sm:text-5xl">
      <FileCode className="h-10 w-10 sm:h-12 sm:w-12" />
      <h1>AutoReadmeGen</h1>
    </div>
  );
}
