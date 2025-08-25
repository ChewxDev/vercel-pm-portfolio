import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  timeline: string;
  budget: string;
  message: string;
  createdAt: string;
}

export default function AdminPage() {
  const { data: submissions = [], isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/contact-submissions'],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center">
          <div className="text-lg">Loading submissions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Contact Form Submissions
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View all inquiries from your portfolio website
        </p>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Total submissions: {submissions.length}
      </div>

      {submissions.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No contact submissions yet. When people use your contact form, they'll appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {submissions
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((submission) => (
              <Card key={submission.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-blue-600 dark:text-blue-400">
                        {submission.name}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {submission.email}
                        {submission.company && ` • ${submission.company}`}
                      </CardDescription>
                    </div>
                    <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(submission.createdAt), 'MMM d, yyyy HH:mm')}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {submission.projectType}
                    </Badge>
                    <Badge variant="outline">
                      Timeline: {submission.timeline}
                    </Badge>
                    <Badge variant="outline">
                      Budget: {submission.budget}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Message:</h4>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {submission.message}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <a 
                      href={`mailto:${submission.email}?subject=Re: Your ${submission.projectType} Inquiry`}
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                      data-testid={`link-reply-${submission.id}`}
                    >
                      Reply to {submission.name}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}