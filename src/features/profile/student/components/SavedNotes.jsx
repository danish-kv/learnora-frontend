import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Edit } from 'lucide-react';


const SavedNotes = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Saved Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4].map((note) => (
          <Card key={note}>
            <CardHeader>
              <CardTitle>Note {note}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">This is a sample note content. It can be much longer in practice.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline"><Edit className="w-4 h-4 mr-2" /> Edit</Button>
              <Button variant="destructive"><Book className="w-4 h-4 mr-2" /> Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default SavedNotes