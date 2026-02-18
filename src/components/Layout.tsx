
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="app-container">
            {/* Mobile Toggle Button */}
            <button
                className="mobile-nav-toggle"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open Menu"
            >
                <Menu size={24} color="var(--text-secondary)" />
            </button>

            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
