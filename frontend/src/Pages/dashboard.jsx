import React from 'react';
import { useAuth } from './auth';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Briefcase, FileText, Settings, Image, CheckSquare } from 'lucide-react';


const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getRoleTitle = (role) => {
        return role.replace(/_/g, ' ').toUpperCase();
    };

    const renderRoleContent = () => {
        switch (user?.role) {
            case 'admin':
                return <AdminDashboard />;
            case 'project_manager':
                return <ProjectManagerDashboard />;
            case 'site_engineer':
                return <SiteEngineerDashboard />;
            case 'design_engineer':
                return <DesignEngineerDashboard />;
            case 'store_supervisor':
                return <StoreSupervisorDashboard />;
            case 'quality_control_manager':
                return <QCDashboard />;
            case 'employee':
                return <EmployeeDashboard />;
            default:
                return <div>Unknown Role</div>;
        }
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h3>TPMHR</h3>
                    <span className="role-badge">{user ? getRoleTitle(user.role) : 'Guest'}</span>
                </div>
                <nav className="sidebar-nav">
                    <button className="nav-item active"><User size={20} /> Profile</button>
                    {user?.role === 'admin' && <button className="nav-item"><Settings size={20} /> Settings</button>}
                    <button className="nav-item" onClick={handleLogout}><LogOut size={20} /> Logout</button>
                </nav>
            </aside>
            <main className="main-content">
                <header className="top-bar">
                    <h1>Welcome, {user?.email}</h1>
                </header>
                <div className="content-area">
                    {renderRoleContent()}
                </div>
            </main>
        </div>
    );
};

const AdminDashboard = () => (
    <div className="role-dashboard">
        <h2>Admin Control Panel</h2>
        <div className="stats-grid">
            <div className="stat-card"><h3>Users</h3><p>Manage system users</p></div>
            <div className="stat-card"><h3>Reports</h3><p>View system reports</p></div>
            <div className="stat-card"><h3>Settings</h3><p>System configurations</p></div>
        </div>
    </div>
);

const ProjectManagerDashboard = () => (
    <div className="role-dashboard">
        <h2>Project Management</h2>
        <div className="stats-grid">
            <div className="stat-card"><Briefcase /><h3>Projects</h3><p>Active Projects</p></div>
            <div className="stat-card"><FileText /><h3>Budgets</h3><p>Track Expenses</p></div>
        </div>
    </div>
);

const SiteEngineerDashboard = () => (
    <div className="role-dashboard">
        <h2>Site Operations</h2>
        <p>Manage site-level activities and tasks.</p>
    </div>
);

const DesignEngineerDashboard = () => (
    <div className="role-dashboard">
        <h2>Design Hub</h2>
        <p>Upload and manage project design files.</p>
    </div>
);

const StoreSupervisorDashboard = () => (
    <div className="role-dashboard">
        <h2>Inventory Management</h2>
        <p>Handle inventory and item status.</p>
    </div>
);

const QCDashboard = () => (
    <div className="role-dashboard">
        <h2>Quality Control</h2>
        <p>Review completed projects and raise QA reports.</p>
    </div>
);

const EmployeeDashboard = () => (
    <div className="role-dashboard">
        <h2>My Workspace</h2>
        <p>View assigned tasks and mark attendance.</p>
    </div>
);

export default Dashboard;
