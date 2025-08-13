
"use client";
import { useState, useEffect } from 'react';
import { getInquiries, deleteInquiry, Inquiry } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries();
    }
  }, [isAuthenticated]);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const fetchedInquiries = await getInquiries();
      setInquiries(fetchedInquiries);
    } catch (error) {
      console.error("Failed to fetch inquiries", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch inquiries.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Qwertyuiop123$') {
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Logged in successfully.",
        className: "bg-green-800 text-white border-green-800"
      })
    } else {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: "Incorrect password.",
      });
      setPassword('');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteInquiry(id);
      setInquiries(inquiries.filter(inq => inq.id !== id));
      toast({
        title: "Inquiry Deleted",
        description: "The inquiry has been successfully removed.",
      });
    } catch (error) {
      console.error("Failed to delete inquiry", error);
       toast({
        variant: "destructive",
        title: "Error",
        description: "Could not delete the inquiry.",
      });
    }
  };


  const formatService = (service: string) => {
      switch(service) {
          case 'ai-image': return 'AI Image Service';
          case 'web-scraping': return 'Web Scraping';
          case 'custom': return 'Custom Solution';
          default: return 'N/A';
      }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Logo />
            </div>
            <CardTitle className="font-headline text-2xl">Admin Panel</CardTitle>
            <CardDescription>Please enter the password to access inquiries.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="text-center"
              />
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
            <p className="text-muted-foreground">View all customer inquiries below.</p>
          </div>
          <Button onClick={fetchInquiries} disabled={isLoading}>
            {isLoading ? 'Refreshing...' : 'Refresh Inquiries'}
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.length > 0 ? (
                    inquiries.map((inquiry) => (
                      <TableRow key={inquiry.id}>
                        <TableCell className="whitespace-nowrap text-muted-foreground">
                            {new Date(inquiry.submittedAt).toLocaleDateString()}
                            <br/>
                            {new Date(inquiry.submittedAt).toLocaleTimeString()}
                        </TableCell>
                        <TableCell className="font-medium">{inquiry.name}</TableCell>
                        <TableCell>{inquiry.company}</TableCell>
                        <TableCell>{inquiry.whatsapp}</TableCell>
                        <TableCell>{inquiry.email || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge variant={inquiry.service === 'custom' ? 'default' : 'secondary'}>
                            {formatService(inquiry.service)}
                           </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                            {inquiry.service === 'custom' ? inquiry.customService : inquiry.message || 'No message'}
                        </TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                               <Button variant="ghost" size="icon" className="text-destructive/80 hover:text-destructive hover:bg-destructive/10">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the inquiry.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(inquiry.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center h-24">
                        No inquiries yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
