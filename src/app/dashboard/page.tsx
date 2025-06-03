'use client'; 
import { useEffect, useState } from 'react'; 
import { onAuthStateChanged, signOut } from 'firebase/auth'; 
import { useRouter } from 'next/navigation'; 
import { auth, db } from "../lib/firebase"; 
import { collection,query,orderBy,onSnapshot,deleteDoc,doc,} from 'firebase/firestore'; 
 
interface JournalEntry { 
  id: string;   
  title: string; 
  content: string; 
  date: string; 
} 
 //State Hooks

export default function DashboardPage() { 
  const router = useRouter(); 
  const [user, setUser] = useState<any>(null); 
  const [entries, setEntries] = useState<JournalEntry[]>([]); 
 
  // Check auth state 
  useEffect(() => { 
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => { 
      if (currentUser) { 
        setUser(currentUser); 
      } else { 
        router.push('/'); 
      } 
    }); 
 
    return () => unsubscribe(); 
  }, [router]); 
 
  // Load entries for this user from Firestore 
  useEffect(() => { 
    if (!user) return; 
 
    const entriesRef = collection(db, 'users', user.uid, 'entries'); 
    const q = query(entriesRef, orderBy('createdAt', 'desc')); 
 
    const unsubscribe = onSnapshot(q, (querySnapshot) => { 
      const items: JournalEntry[] = []; 
      querySnapshot.forEach((doc) => { 
        const data = doc.data(); 
        items.push({ 
          id: doc.id, 
          title: data.title, 
          content: data.content, 
          date: data.date, 
        }); 
      }); 
      setEntries(items); 
    }); 
 
    return () => unsubscribe();  // cleanup when component is removed 
  }, [user]); 
 
  const handleDelete = async (id: string) => { 
    if (!user) return; 
    try { 
      await deleteDoc(doc(db, 'users', user.uid, 'entries', id)); 
    } catch (error) { 
      console.error('Error deleting entry:', error); 
    } 
  }; 
 
  const handleLogout = async () => { 
    await signOut(auth); 
    router.push('/'); 
  }; 
 
  if (!user) return null; // don't show anything until we know user is loggedin 
 
  return ( 
    <div className="min-h-screen bg-gray-50"> 
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Personal Journal</h1>
            <button 
              onClick={handleLogout} 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors" 
            > 
              Sign Out 
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">My Journal</h2>
          <button 
            onClick={() => router.push('/new-entry')} 
            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors" 
          > 
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Entry 
          </button>
        </div>

        {entries.length === 0 ? ( 
          <div className="text-center py-12">
            <div className="max-w-sm mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No journal entries yet</h3>
              <p className="text-gray-500 mb-6">Start writing your thoughts and memories</p>
              <button 
                onClick={() => router.push('/new-entry')} 
                className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors" 
              > 
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create your first entry 
              </button>
            </div>
          </div>
        ) : ( 
          <div className="space-y-4"> 
            {entries.map((entry) => ( 
              <div 
                key={entry.id} 
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-shadow" 
              > 
                <div className="flex justify-between items-start"> 
                  <div className="flex-1"> 
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{entry.title}</h3> 
                    <p className="text-sm text-gray-500 mb-3">{entry.date}</p> 
                    <p className="text-gray-700 leading-relaxed">{entry.content}</p> 
                  </div> 
                  <button 
                    onClick={() => handleDelete(entry.id)} 
                    className="ml-4 text-gray-400 hover:text-red-500 transition-colors p-1" 
                    title="Delete entry"
                  > 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button> 
                </div> 
              </div> 
            ))} 
          </div> 
        )} 
      </div>
    </div> 
  ); 
}