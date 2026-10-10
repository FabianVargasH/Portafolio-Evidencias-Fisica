import { HashRouter, Routes, Route } from 'react-router-dom'
import TopNav from '../components/layout/TopNav'
import Home from '../pages/home'
import TopicPage from '../pages/TopicPage'

export default function App() {
  return (
    <HashRouter>
      <TopNav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<TopicPage />} />
        </Routes>
      </main>
    </HashRouter>
  )
}