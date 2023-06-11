export const Skeleton = () => {
  return (
    <div
      role="status"
      className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
    >
      <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
      </div>
      <div className="w-full">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-44 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-56 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-56 mb-2.5"></div>
      </div>
    </div>
  );
};
