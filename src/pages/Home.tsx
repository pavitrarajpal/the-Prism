
import React from 'react';
import { Plus } from 'lucide-react';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome back, Creator!</h1>
                <p className="text-muted">What are you visualizing today?</p>
            </header>

            <div className="action-area">
                <button className="create-moodboard-btn">
                    <Plus size={24} />
                    Create New Moodboard
                </button>
            </div>

            <section className="dashboard-grid">
                <div className="empty-state-card">
                    <div className="empty-icon-placeholder"></div>
                    <h3>No Moodboards Yet</h3>
                    <p className="text-muted">Start by creating your first collection.</p>
                </div>

                {/* Placeholder for future moodboard cards */}
                {[1, 2].map((i) => (
                    <div key={i} className="placeholder-card" />
                ))}
            </section>
        </div>
    );
};

export default Home;
