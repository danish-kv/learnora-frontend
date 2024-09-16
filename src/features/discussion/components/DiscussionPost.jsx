import React from "react";
import { ThumbsUp, ThumbsDown, MessageSquare, Edit, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CommentForm from "./CommentForm";
import DiscussionComment from "./DiscussionComment";
import api from "@/services/api";
import { displayToastAlert } from "@/utils/displayToastAlert";
import { formatDate } from "@/utils/format";

const DiscussionPost = ({
  discussion,
  onReply,
  toggleComments,
  expanded,
  onUpvote,
  onDownvote,
  onEdit,
  onDelete,
  getDiscussion,
}) => {
  if (!discussion) {
    return (
      <Card className="mb-8 p-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </Card>
    );
  }

  const {
    id,
    user,
    title,
    description,
    photo,
    upvote_count,
    downvote_count,
    commented_discussion,
    updated_at,
    is_my_discussion,
    is_upvoted,
    is_downvoted,
  } = discussion;



  const handleUpdateCommet = async (id, editedcomment) => {
    console.log("edit comment ==== ", id, comment);
    try {
      const res = await api.patch(`comment/${id}/`, { comment: editedcomment });
      getDiscussion();
      displayToastAlert(200, "comment updated succussfuly");
      console.log(res);
    } catch (error) {
      console.log(error);
      displayToastAlert(400, "comment delete Failed");
    }
  };

  const handleDeleteComment = async (comment_id) => {
    console.log(comment_id);
    try {
      const res = await api.delete(`comment/${comment_id}/`);
      getDiscussion();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user?.profile} alt={user?.username} />
              <AvatarFallback>
                {user?.username?.[0]?.toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{user?.username}</h3>
              <time className="text-sm text-gray-500" dateTime={updated_at}>
                
                {updated_at ? formatDate(new Date(updated_at), 'dd, mmmm, yyyy') : 'N/A'}
              </time>
            </div>
          </div>

          <div className="flex space-x-2">
            {is_my_discussion && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(discussion)}
                      >
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit discussion</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(id)}
                      >
                        <Trash className="h-4 w-4 text-red-600" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete discussion</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
        {photo && (
          <img
            src={photo}
            alt="Post"
            className="w-full h-auto max-h-96 object-cover rounded-lg"
          />
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className={`${
                    is_upvoted ? "bg-indigo-500 hover:bg-indigo-600" : ""
                  }`}
                  variant={is_upvoted ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onUpvote(id)}
                >
                  <ThumbsUp
                    className={`mr-1 h-4 w-4 ${is_upvoted && "text-white"}`}
                  />
                  <span>{upvote_count || 0}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {is_upvoted ? "Remove upvote" : "Upvote"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className={`${
                    is_downvoted ? "bg-indigo-500 hover:bg-indigo-600" : ""
                  } `}
                  variant={is_downvoted ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onDownvote(id)}
                >
                  <ThumbsDown
                    className={`mr-1 h-4 w-4 ${is_downvoted && "text-white"}`}
                  />
                  <span>{downvote_count || 0}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {is_downvoted ? "Remove downvote" : "Downvote"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Button variant="ghost" size="sm" onClick={() => toggleComments(id)}>
          <MessageSquare className="mr-1 h-4 w-4" />
          <span>{commented_discussion?.length || 0} comments</span>
        </Button>
      </CardFooter>

      {expanded && (
        <CardContent className="mt-4 space-y-4">
          <h4 className="font-semibold">Comments</h4>
          {commented_discussion?.length > 0 ? (
            commented_discussion.map((comment) => (
              <DiscussionComment
                key={comment.id}
                comment={comment}
                onDelete={handleDeleteComment}
                onUpdate={handleUpdateCommet}
                onReply={(commentId, replyContent) =>
                  onReply(id, commentId, replyContent)
                }
              />
            ))
          ) : (
            <p className="text-gray-500 italic">
              No comments yet. Be the first to comment!
            </p>
          )}
          <CommentForm discussion={discussion} getDiscussion={getDiscussion} />
        </CardContent>
      )}
    </Card>
  );
};

export default DiscussionPost;
