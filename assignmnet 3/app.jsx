import React from "react";
import "./App.css";

function App() {
  // User data
  const user = {
    name: "Kaashvi Gupta",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  const activities = [
    "Posted a new article on React Hooks",
    "Liked a comment",
    "Updated profile picture",
    "Joined 'Web Developers' group",
  ];

  // Profile Card Component
  const ProfileCard = ({ user }) => (
    <div className="profile-card">
      <img src={user.avatar} alt="Profile" className="profile-pic" />
      <h2 className="user-name">{user.name}</h2>
    </div>
  );

  // Activity List Component
  const ActivityList = ({ activities }) => (
    <div className="activity-list">
      <h3>Recent Activities</h3>
      <ul>
        {activities.map((activity, index) => (
          <li key={index} className="activity-item">{activity}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="app-container">
      <ProfileCard user={user} />
      <ActivityList activities={activities} />
    </div>
  );
}

export default App;
