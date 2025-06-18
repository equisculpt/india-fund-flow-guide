
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, User, MessageSquare, Calendar, Eye } from 'lucide-react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  admin_notes?: string;
  created_at: string;
}

const ContactSubmissionsTab = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Error",
        description: "Failed to load contact submissions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setSubmissions(prev => 
        prev.map(sub => sub.id === id ? { ...sub, status } : sub)
      );

      toast({
        title: "Success",
        description: "Status updated successfully"
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const saveAdminNotes = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ admin_notes: adminNotes })
        .eq('id', id);

      if (error) throw error;

      setSubmissions(prev => 
        prev.map(sub => sub.id === id ? { ...sub, admin_notes: adminNotes } : sub)
      );

      toast({
        title: "Success",
        description: "Notes saved successfully"
      });
    } catch (error) {
      console.error('Error saving notes:', error);
      toast({
        title: "Error",
        description: "Failed to save notes",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading contact submissions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contact Form Submissions</h2>
        <Badge variant="outline">
          {submissions.length} Total Submissions
        </Badge>
      </div>

      <div className="grid gap-4">
        {submissions.map((submission) => (
          <Card key={submission.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {submission.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{submission.subject}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(submission.status)}>
                    {submission.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedSubmission(submission);
                      setAdminNotes(submission.admin_notes || '');
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{submission.email}</span>
                </div>
                {submission.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{submission.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{new Date(submission.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 text-gray-400 mt-1" />
                  <p className="text-sm text-gray-700 line-clamp-2">{submission.message}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant={submission.status === 'new' ? 'default' : 'outline'}
                  onClick={() => updateStatus(submission.id, 'new')}
                >
                  New
                </Button>
                <Button
                  size="sm"
                  variant={submission.status === 'in_progress' ? 'default' : 'outline'}
                  onClick={() => updateStatus(submission.id, 'in_progress')}
                >
                  In Progress
                </Button>
                <Button
                  size="sm"
                  variant={submission.status === 'resolved' ? 'default' : 'outline'}
                  onClick={() => updateStatus(submission.id, 'resolved')}
                >
                  Resolved
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {submissions.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No contact submissions yet</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Detailed View Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold">{selectedSubmission.name}</h3>
                <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
                  Close
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Subject:</label>
                  <p className="mt-1">{selectedSubmission.subject}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Message:</label>
                  <p className="mt-1 whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Contact Details:</label>
                  <p className="mt-1">{selectedSubmission.email}</p>
                  {selectedSubmission.phone && <p>{selectedSubmission.phone}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Admin Notes:</label>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={4}
                    className="mt-1"
                    placeholder="Add internal notes..."
                  />
                  <Button
                    onClick={() => saveAdminNotes(selectedSubmission.id)}
                    className="mt-2"
                    size="sm"
                  >
                    Save Notes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSubmissionsTab;
