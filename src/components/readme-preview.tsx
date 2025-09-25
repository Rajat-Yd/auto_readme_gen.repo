'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from './ui/label';

interface ReadmePreviewProps {
  content: string;
}

export function ReadmePreview({ content }: ReadmePreviewProps) {
  const { toast } = useToast();
  const [show, setShow] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  useEffect(() => {
    if (content) {
      setShow(true);
      setEditedContent(content);
    }
  }, [content]);

  const handleDownload = () => {
    const blob = new Blob([editedContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editedContent).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: "You can now paste the README content.",
      });
    }).catch(err => {
      console.error("Failed to copy text: ", err);
      toast({
        variant: "destructive",
        title: "Copy failed",
        description: "Could not copy content to clipboard.",
      });
    });
  };

  if (!show) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl animate-in fade-in-0 duration-500">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-headline">Generated README</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
            <Button variant="outline" size="icon" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
            <div className='space-y-2'>
                <Label htmlFor='readme-editor'>Edit README</Label>
                <Textarea
                    id="readme-editor"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="h-96 bg-secondary text-secondary-foreground font-code text-sm whitespace-pre-wrap"
                />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
