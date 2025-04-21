export const AccessDenied = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <div className="text-2xl font-bold text-red-500">Access Denied</div>
      <div className="text-sm text-gray-500">
        You do not have permission to access this page.
      </div>
    </div>
  );
};
