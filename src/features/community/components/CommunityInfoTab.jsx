import React from "react";
import { Users, Info } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { formatDate } from "@/utils/format";

const CommunityInfoTab = ({ community }) => {
  return (
    <TabsContent value="info" className="p-2 sm:p-4">
      <h3 className="text-base sm:text-lg font-semibold mb-2">
        About {community.name}
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 mb-4">
        {community.description}
      </p>
      <div className="flex items-center text-gray-500 mb-2">
        <Users className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
        <span className="text-xs sm:text-sm">
          {community.participants.length} members
        </span>
      </div>
      <div className="flex items-center text-gray-500">
        <Info className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
        <span className="text-xs sm:text-sm">
          Created on{" "}
          {community?.created_at
            ? formatDate(new Date(community.created_at), "dd, mmmm, yyyy")
            : "N/A"}
        </span>
      </div>
    </TabsContent>
  );
};

export default CommunityInfoTab;
