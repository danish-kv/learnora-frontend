import React from "react";
import { Users, Info } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";

const CommunityInfoTab = ({ community }) => {
  return (
    <TabsContent value="info" className="p-4">
      <h3 className="text-lg font-semibold mb-2">About {community.name}</h3>
      <p className="text-gray-600 mb-4">{community.description}</p>
      <div className="flex items-center text-gray-500 mb-2">
        <Users className="mr-2 h-4 w-4" />
        <span>{community.participants.length} members</span>
      </div>
      <div className="flex items-center text-gray-500">
        <Info className="mr-2 h-4 w-4" />
        <span>
          Created on{" "}
          {community.created_at
            ? new Date(community.created_at).toLocaleDateString()
            : "N/A"}
        </span>
      </div>
    </TabsContent>
  );
};

export default CommunityInfoTab;
