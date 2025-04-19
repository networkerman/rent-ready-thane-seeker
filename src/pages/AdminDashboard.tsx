
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AdminDashboard = () => {
  const { data: listings, refetch } = useQuery({
    queryKey: ['listings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_listings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const updateListingStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('property_listings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Listing ${status} successfully`);
      refetch();
    } catch (error) {
      toast.error('Failed to update listing status');
      console.error('Error updating listing:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Property Listings Dashboard</h1>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Owner</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Rent (₹)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings?.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>{listing.owner_name}</TableCell>
                <TableCell>{listing.contact_number}</TableCell>
                <TableCell>{listing.property_address}</TableCell>
                <TableCell>₹{listing.expected_rent}</TableCell>
                <TableCell>
                  <span className={`capitalize ${
                    listing.status === 'approved' ? 'text-green-600' :
                    listing.status === 'rejected' ? 'text-red-600' :
                    'text-yellow-600'
                  }`}>
                    {listing.status}
                  </span>
                </TableCell>
                <TableCell className="space-x-2">
                  {listing.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => updateListingStatus(listing.id, 'approved')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateListingStatus(listing.id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDashboard;
