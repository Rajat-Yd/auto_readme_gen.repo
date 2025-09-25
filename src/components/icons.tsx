import { FileCode } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-2xl font-headline font-bold text-primary">
      <FileCode className="h-8 w-8" />
      <h1>AutoReadmeGen</h1>
    </div>
  );
}
