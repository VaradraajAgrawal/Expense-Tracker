const Loader = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-sm flex-col items-center rounded-2xl bg-white p-8 shadow-sm sm:p-10">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 sm:h-16 sm:w-16" />

        <h2 className="mt-6 text-xl font-semibold text-gray-800 sm:text-2xl">
          Loading your dashboard
        </h2>

        <p className="mt-2 max-w-xs text-center text-sm leading-6 text-gray-500">
          We're getting your budget, transactions, and account details ready.
        </p>
      </div>
    </div>
  );
};

export default Loader;
