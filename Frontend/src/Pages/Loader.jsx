const Loader = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>

      <h2 className="mt-6 text-2xl font-semibold text-gray-800">Loading...</h2>

      <p className="mt-2 text-gray-500">Verifying your session.</p>
    </div>
  );
};

export default Loader;
