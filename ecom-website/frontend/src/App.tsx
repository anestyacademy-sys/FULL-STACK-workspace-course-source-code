import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Browse from "./pages/Browse"
import Results from "./pages/Results"
import ListingDetail from "./pages/ListingDetail"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import PostListing from "./pages/PostListing"
import Dashboard from "./pages/Dashboard"


function App() {
 
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-canvas font-sans text-ink">
      
        <Header />

        <main className="flex-1">
          <Routes>
              <Route path="/" element={<Browse />} />
              <Route path="/search" element={<Results />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
        
              {/* account */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/post" element={<PostListing />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </main>

        <Footer />

    </div>
  )
}

export default App
