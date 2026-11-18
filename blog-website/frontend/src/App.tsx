import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Articles from './pages/Articles'
import ArticleDetail from './pages/ArticleDetail'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (

     <div className="flex min-h-screen flex-col overflow-x-hidden bg-ink font-sans text-cream">
    
      <Header/>

      <main className="flex-1">

        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/articles" element={ <Articles/> } />
          <Route path="/articles/:slug" element={ <ArticleDetail/> } />
          <Route path="/about" element={ <About/> } />

          {/* account */}
          <Route path="/login" element={ <Login/> } />
          <Route path="/register" element={ <Register/> } />
          <Route path="/dashboard" element={ <Dashboard/> } />
        </Routes>

      </main>

      <Footer/>

    </div>
    
  )
}

export default App
