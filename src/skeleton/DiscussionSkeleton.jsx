import React from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

const SkeletonPulse = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const DiscussionSkeleton = ({ count = 3 }) => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Header Skeleton */}
      <div className="flex justify-center items-center mb-6">
        <SkeletonPulse className="h-8 w-64 mb-6" />
      </div>

      {/* Discussion Posts Skeleton */}
      {[...Array(count)].map((_, index) => (
        <Card key={index} className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Avatar Skeleton */}
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                
                <div className="space-y-2">
                  {/* Username Skeleton */}
                  <SkeletonPulse className="h-5 w-32" />
                  {/* Date Skeleton */}
                  <SkeletonPulse className="h-4 w-24" />
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex space-x-2">
                <SkeletonPulse className="w-8 h-8 rounded" />
                <SkeletonPulse className="w-8 h-8 rounded" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Title Skeleton */}
            <SkeletonPulse className="h-6 w-3/4" />
            
            {/* Description Skeleton - Multiple lines */}
            <div className="space-y-2">
              <SkeletonPulse className="h-4 w-full" />
              <SkeletonPulse className="h-4 w-5/6" />
              <SkeletonPulse className="h-4 w-4/6" />
            </div>

            {/* Random Image Skeleton - Show sometimes */}
            {Math.random() > 0.5 && (
              <SkeletonPulse className="w-full h-64 mt-4" />
            )}
          </CardContent>

          <CardFooter className="flex justify-between items-center">
            {/* Interaction Buttons Skeleton */}
            <div className="flex space-x-4">
              <div className="flex items-center space-x-1">
                <SkeletonPulse className="w-8 h-8 rounded" />
                <SkeletonPulse className="w-6 h-4 rounded" />
              </div>
              <div className="flex items-center space-x-1">
                <SkeletonPulse className="w-8 h-8 rounded" />
                <SkeletonPulse className="w-6 h-4 rounded" />
              </div>
            </div>

            {/* Comments Button Skeleton */}
            <div className="flex items-center space-x-1">
              <SkeletonPulse className="w-8 h-8 rounded" />
              <SkeletonPulse className="w-16 h-4 rounded" />
            </div>
          </CardFooter>

          {/* Optional Expanded Comments Skeleton - Show sometimes */}
          {Math.random() > 0.7 && (
            <CardContent className="mt-4 space-y-4">
              <SkeletonPulse className="h-5 w-24 mb-4" />
              
              {/* Comment Skeletons */}
              {[...Array(2)].map((_, commentIndex) => (
                <div key={commentIndex} className="pl-4 border-l-2 border-gray-200 space-y-2">
                  <div className="flex items-center space-x-2">
                    <SkeletonPulse className="w-8 h-8 rounded-full" />
                    <SkeletonPulse className="h-4 w-24" />
                  </div>
                  <SkeletonPulse className="h-4 w-5/6" />
                  <SkeletonPulse className="h-4 w-4/6" />
                </div>
              ))}

              {/* Comment Form Skeleton */}
              <div className="mt-4">
                <SkeletonPulse className="h-24 w-full rounded-lg" />
                <div className="flex justify-end mt-2">
                  <SkeletonPulse className="h-8 w-24 rounded" />
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

export default DiscussionSkeleton;