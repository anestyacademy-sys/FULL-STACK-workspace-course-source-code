import { Routes, Route } from "react-router-dom";
import Browse from "./pages/Browse.jsx";
import Results from "./pages/Results.jsx";
import ListingDetail from "./pages/ListingDetail.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import PostListing from "./pages/PostListing.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// Each page holds its own header and footer, so there is no shared layout.
function App() {
  return (
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
  );
}

export default App;
