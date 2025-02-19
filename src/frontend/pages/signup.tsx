// Import React Router's Link component
import { Link } from 'react-router-dom';

export default function SignUp() {
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

          <p className="text-gray-600 text-center mb-8">
            Welcome to EcoTrack! We help you track and reduce your carbon footprint for a greener future.
          </p>

          <div className="space-y-4">
            <button className="w-full py-2 px-4 border border-green-500 text-green-500 rounded hover:bg-green-50 transition duration-200">
              Sign up with Email
            </button>
            <button className="w-full py-2 px-4 border border-green-500 text-green-500 rounded hover:bg-green-50 transition duration-200">
              Sign up with Google
            </button>
            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 hover:underline">
                Log in
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-8">
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-200">
            Get Started
            <svg className="inline-block ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
