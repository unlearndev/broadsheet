import { Link, NavLink, Outlet, Route, Routes } from 'react-router'
import { BrandMark, DashboardIcon, ExternalIcon, IssuesIcon, SubscribersIcon } from './components/icons'
import Dashboard from './pages/Dashboard'
import IssueEditor from './pages/IssueEditor'
import Issues from './pages/Issues'
import Subscribe from './pages/Subscribe'
import Subscribers from './pages/Subscribers'

export default function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/issues/new" element={<IssueEditor />} />
        <Route path="/issues/:id" element={<IssueEditor />} />
        <Route path="/subscribers" element={<Subscribers />} />
      </Route>
      {/* Public: what readers see, so no admin sidebar */}
      <Route path="/subscribe" element={<Subscribe />} />
    </Routes>
  )
}

function AdminLayout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <span className="brand"><BrandMark size={24} />Broadsheet</span>
        <nav aria-label="Main">
          <NavLink to="/" end><DashboardIcon />Dashboard</NavLink>
          <NavLink to="/issues"><IssuesIcon />Issues</NavLink>
          <NavLink to="/subscribers"><SubscribersIcon />Subscribers</NavLink>
        </nav>
        <div className="sidebar-footer">
          <Link to="/subscribe" target="_blank"><ExternalIcon />Subscribe page</Link>
        </div>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
