// Import Link from 'react-router-dom'
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            <h1 className="text-3xl font-bold text-green-700 ml-2">EcoTrack</h1>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">Login to Your Account</h2>

          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Your password"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-200"
              >
                Log In
              </button>
            </div>
          </form>

          <div className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            {/* Replace the next/link with react-router's Link */}
            <Link to="/" className="text-green-600 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
