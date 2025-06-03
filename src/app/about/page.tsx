import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
   
      <header className="flex justify-between items-center px-6 py-4">
         <Link href="/">
  <h1 className="text-xl font-semibold text-gray-900 cursor-pointer transition-transform duration-200 hover:scale-95">
    Personal Journal
  </h1>
</Link>

        <Link href="/login">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors cursor-pointer">
            Sign In
          </button>
        </Link>
      </header>

   
      <main className="max-w-4xl mx-auto px-6 py-16">
  
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About Personal Journal
          </h2>
          <p className="text-lg text-gray-600">
            A private space for your thoughts, memories, and reflections.
          </p>
        </div>

  
        <div className="grid md:grid-cols-3 gap-8 mb-12">
       
          <div className="text-center bg-white p-8 rounded-lg shadow-sm">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Write</h3>
            <p className="text-gray-600">
              Capture your thoughts, ideas, and memories in a clean interface
            </p>
          </div>

      
          <div className="text-center bg-white p-8 rounded-lg shadow-sm">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Reflect</h3>
           <p className="text-gray-600">
  Review past entries to see how you&apos;ve grown and changed over time
</p>

          </div>

     
          <div className="text-center bg-white p-8 rounded-lg shadow-sm">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Private</h3>
            <p className="text-gray-600">
              Your entries are private and secure, accessible only to you
            </p>
          </div>
        </div>

      
        <div className="text-center">
         <Link href="/login">
            <button className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors text-lg cursor-pointer">
              Start Journaling
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}