import React from 'react';

const ProfileSkeletonSection = ({ children }) => (
  <div className="mb-8 animate-pulse">
    <div className="h-8 w-48 bg-gray-200 rounded mb-4" />
    {children}
  </div>
);

const SkeletonLine = ({ width = "full" }) => (
  <div className={`h-4 bg-gray-200 rounded w-${width} mb-2`} />
);

const ProfileSkeleton = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white p-8 relative">
        {/* Header Section */}
        <div className="flex items-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gray-300" />
          </div>
          <div className="ml-8 animate-pulse">
            <div className="h-8 w-64 bg-gray-200 rounded mb-2" />
            <div className="h-6 w-48 bg-gray-200 rounded" />
          </div>
        </div>

        {/* About Me Section */}
        <ProfileSkeletonSection>
          <div className="space-y-2">
            <SkeletonLine />
            <SkeletonLine width="3/4" />
            <SkeletonLine width="2/3" />
          </div>
        </ProfileSkeletonSection>

        {/* Contact Information Section */}
        <ProfileSkeletonSection>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </ProfileSkeletonSection>

        {/* Experience Section */}
        <ProfileSkeletonSection>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex justify-between items-center border-b py-2">
              <div className="space-y-2">
                <div className="h-4 w-48 bg-gray-200 rounded" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
              <div className="h-8 w-16 bg-gray-200 rounded" />
            </div>
          ))}
        </ProfileSkeletonSection>

        {/* Skills Section */}
        <ProfileSkeletonSection>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center border-b py-2">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-8 w-16 bg-gray-200 rounded" />
            </div>
          ))}
        </ProfileSkeletonSection>

        {/* Education Section */}
        <ProfileSkeletonSection>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex justify-between items-center border-b py-2">
              <div className="space-y-2">
                <div className="h-4 w-56 bg-gray-200 rounded" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
              <div className="h-8 w-16 bg-gray-200 rounded" />
            </div>
          ))}
        </ProfileSkeletonSection>
      </div>
    </div>
  );
};

export default ProfileSkeleton;