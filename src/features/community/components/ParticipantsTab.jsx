import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";

const ParticipantsTab = ({ participants }) => {
  return (
    <TabsContent value="participants">
      <ScrollArea className="h-[calc(100vh-280px)] p-4">
        {participants.map((participant, index) => (
          <div key={index} className="flex items-center mb-2">
            <Avatar className="w-8 h-8 mr-2">
              <AvatarImage src={participant?.profile} />
              <AvatarFallback>
                {participant?.username[0]}
              </AvatarFallback>
            </Avatar>
            <span>{participant?.username}</span>
          </div>
        ))}
      </ScrollArea>
    </TabsContent>
  );
};

export default ParticipantsTab;
