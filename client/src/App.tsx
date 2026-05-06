import { NavLink, Route, Routes } from 'react-router'
import Dashboard from './pages/Dashboard'
import IssueEditor from './pages/IssueEditor'
import Issues from './pages/Issues'
import Subscribe from './pages/Subscribe'
import Subscribers from './pages/Subscribers'

export default function App() {
  return (
    <div className="layout">
      <header className="topbar">
        <span className="brand">Broadsheet</span>
        <nav>
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/issues">Issues</NavLink>
          <NavLink to="/subscribers">Subscribers</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/issues/new" element={<IssueEditor />} />
          <Route path="/issues/:id" element={<IssueEditor />} />
          <Route path="/subscribers" element={<Subscribers />} />
          <Route path="/subscribe" element={<Subscribe />} />
        </Routes>
      </main>
    </div>
  )
}
