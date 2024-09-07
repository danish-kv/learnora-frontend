import React from "react";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import CommentForm from "./CommentForm";
import DiscussionComment from "./DiscussionComment";
import DiscussionLoadingFallback from "@/components/skeleton/DiscussionLoadingFallBack";

const DiscussionPost = ({ discussion, onReply, toggleComments, expanded, onUpvote, onDownvote }) => {
  if (!discussion) {
    return <h1>discussion comming</h1>;
  }

  const { user, title, description, photo, upvote_count, downvote_count, commented_discussion } = discussion;

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={user?.profile} alt={user?.username} />
            <AvatarFallback>{user?.username?.[0]?.toUpperCase() || '?'}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{user?.username}</h3>
            <time className="text-sm text-gray-500" dateTime={discussion.created_at}>
              {new Date(discussion.created_at).toLocaleDateString()}
            </time>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-700">{description}</p>
        {photo && (
          <img src={photo} alt="Post" className="w-full h-64 object-cover rounded-lg" />
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" onClick={() => onUpvote(discussion.id)}>
            <ThumbsUp className="mr-1 h-4 w-4" />
            <span>{upvote_count || 0}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDownvote(discussion.id)}>
            <ThumbsDown className="mr-1 h-4 w-4" />
            <span>{downvote_count || 0}</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={() => toggleComments(discussion.id)}>
          <MessageSquare className="mr-1 h-4 w-4" />
          <span>{commented_discussion?.length || 0} comments</span>
        </Button>
      </CardFooter>

      {expanded && (
        <CardContent className="mt-4 space-y-4">
          <h4 className="font-semibold">Comments</h4>
          {commented_discussion?.map((comment) => (
            <DiscussionComment
              key={comment.id}
              comment={comment}
              onReply={(commentId, replyContent) => onReply(discussion.id, commentId, replyContent)}
            />
          ))}
          <CommentForm discussion={discussion} />
        </CardContent>
      )}
    </Card>
  );
};

export default DiscussionPost;