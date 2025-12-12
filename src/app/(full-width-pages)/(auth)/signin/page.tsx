export const metadata = {
  title: "Sign In",
  description: "Sign in to your account"
};

// Simple test component - no imports
function TestForm() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col flex-1 lg:w-1/2 w-full justify-center items-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Sign In Test</h1>
          <p>If this works, the issue is in imported components</p>
          <div className="mt-4 p-4 bg-white rounded shadow">
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input type="email" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Password</label>
              <input type="password" className="w-full p-2 border rounded" />
            </div>
            <button className="w-full bg-blue-500 text-white p-2 rounded">
              Sign In
            </button>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-1/2 justify-center items-center bg-gray-800">
        <div className="text-white p-8">
          <h2 className="text-2xl">Logo Area</h2>
        </div>
      </div>
    </div>
  );
}

export default TestForm;