// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom'; // Import NavLink
// import '@fortawesome/fontawesome-free/css/all.min.css'; 

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div>
//       <div style={styles.iconContainer}>
//         <i 
//           className={`fas fa-${isOpen ? 'times' : 'bars'}`} 
//           onClick={() => setIsOpen(!isOpen)}
//           style={styles.icon}
//         ></i>
//       </div>
//       {isOpen && (
//         <div style={styles.sidebar}>
//           <ul style={styles.navList}>
//             <li style={styles.navItem}>
//               <NavLink 
//                 to="/" 
//                 style={styles.navLink} 
//                 activeStyle={styles.activeNavLink}
//                 end // Ensures the link is only active for the exact path
//               >
//                 <img src="/path/to/home-icon.png" alt="Home" style={styles.navIcon} />
//                 Home
//               </NavLink>
//             </li>
//             <li style={styles.navItem}>
//               <NavLink 
//                 to="/analytics" 
//                 style={styles.navLink} 
//                 activeStyle={styles.activeNavLink}
//               >
//                 <img src="/path/to/analytics-icon.png" alt="Analytics" style={styles.navIcon} />
//                 Analytics
//               </NavLink>
//             </li>
//             <li style={styles.navItem}>
//               <NavLink 
//                 to="/content" 
//                 style={styles.navLink} 
//                 activeStyle={styles.activeNavLink}
//               >
//                 <img src="/path/to/content-icon.png" alt="Content" style={styles.navIcon} />
//                 Content
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   iconContainer: {
//     position: 'fixed',
//     top: '20px',
//     left: '20px',
//     zIndex: 1000,
//   },
//   icon: {
//     fontSize: '30px',
//     color: '#ecf0f1',
//     cursor: 'pointer',
//     transition: 'color 0.3s, transform 0.3s',
//     backgroundColor: '#2c3e50',
//     borderRadius: '50%',
//     padding: '10px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//   },
//   sidebar: {
//     height: '100vh',
//     width: '250px',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     backgroundColor: '#2c3e50',
//     padding: '20px',
//     color: '#ecf0f1',
//     transition: 'transform 0.3s',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//   },
//   navList: {
//     listStyleType: 'none',
//     padding: 0,
//     marginTop: '60px', // Space for the icon
//   },
//   navItem: {
//     marginBottom: '20px',
//     display: 'flex',
//     alignItems: 'center',
//   },
//   navLink: {
//     color: '#ecf0f1',
//     textDecoration: 'none',
//     fontSize: '1rem',
//     transition: 'color 0.3s',
//     display: 'flex',
//     alignItems: 'center',
//   },
//   navIcon: {
//     width: '24px',
//     height: '24px',
//     marginRight: '10px',
//   },
//   activeNavLink: {
//     color: '#3498db', // Change this to whatever color you want for active links
//   },
// };

// export default Sidebar;


// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom'; // Import NavLink
// import '@fortawesome/fontawesome-free/css/all.min.css'; 

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div>
//       <div style={styles.iconContainer}>
//         <i 
//           className={`fas fa-${isOpen ? 'times' : 'bars'}`} 
//           onClick={() => setIsOpen(!isOpen)}
//           style={styles.icon}
//         ></i>
//       </div>
//       {isOpen && (
//         <div style={styles.sidebar}>
//           <ul style={styles.navList}>
//             <li style={styles.navItem}>
//               <NavLink 
//                 to="/" 
//                 style={styles.navLink} 
//                 activeStyle={styles.activeNavLink}
//                 end // Ensures the link is only active for the exact path
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li style={styles.navItem}>
//               <NavLink 
//                 to="/analytics" 
//                 style={styles.navLink} 
//                 activeStyle={styles.activeNavLink}
//               >
//                 Analytics
//               </NavLink>
//             </li>
//             <li style={styles.navItem}>
//               <NavLink 
//                 to="/content" 
//                 style={styles.navLink} 
//                 activeStyle={styles.activeNavLink}
//               >
//                 Content
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   iconContainer: {
//     position: 'fixed',
//     top: '20px',
//     left: '20px',
//     zIndex: 1000,
//   },
//   icon: {
//     fontSize: '30px',
//     color: '#ecf0f1',
//     cursor: 'pointer',
//     transition: 'color 0.3s, transform 0.3s',
//     backgroundColor: '#2c3e50',
//     borderRadius: '50%',
//     padding: '10px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//   },
//   sidebar: {
//     height: '100vh',
//     width: '250px',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     backgroundColor: '#2c3e50',
//     padding: '20px',
//     color: '#ecf0f1',
//     transition: 'transform 0.3s',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//   },
//   navList: {
//     listStyleType: 'none',
//     padding: 0,
//     marginTop: '60px', // Space for the icon
//   },
//   navItem: {
//     marginBottom: '20px',
//     display: 'flex',
//     alignItems: 'center',
//   },
//   navLink: {
//     color: '#ecf0f1',
//     textDecoration: 'none',
//     fontSize: '1rem',
//     transition: 'color 0.3s',
//     display: 'flex',
//     alignItems: 'center',
//   },
//   activeNavLink: {
//     color: '#3498db', // Change this to whatever color you want for active links
//   },
// };

// export default Sidebar;
// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate for logout
// import '@fortawesome/fontawesome-free/css/all.min.css'; 

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleLogout = () => {
//     // Perform your logout logic here (e.g., clearing authentication tokens)
//     console.log('Logging out...');
//     navigate('/login'); // Redirect to login page after logout
//   };

//   return (
//     <div>
//       <div style={styles.iconContainer}>
//         <i 
//           className={`fas fa-${isOpen ? 'times' : 'bars'}`} 
//           onClick={() => setIsOpen(!isOpen)}
//           style={styles.icon}
//         ></i>
//       </div>
//       {isOpen && (
//         <div style={styles.sidebar}>
//           <ul style={styles.navList}>
//             <li style={styles.navItem}>
//               <NavLink 
//                 to="/Home" 
//                 style={styles.navLink} 
//                 activeStyle={styles.activeNavLink}
//                 end // Ensures the link is only active for the exact path
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li style={styles.navItem}>
//               <NavLink 
//                 to="/analytics" 
//                 style={styles.navLink} 
//                 activeStyle={styles.activeNavLink}
//               >
//                 Analytics
//               </NavLink>
//             </li>
//             <li style={styles.navItem}>
//               <NavLink 
//                 to="/content" 
//                 style={styles.navLink} 
//                 activeStyle={styles.activeNavLink}
//               >
//                 Content
//               </NavLink>
//             </li>
//             <li style={styles.navItem}>
//               <button onClick={handleLogout} style={styles.logoutButton}>
//                 Logout
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   iconContainer: {
//     position: 'fixed',
//     top: '20px',
//     left: '20px',
//     zIndex: 1000,
//   },
//   icon: {
//     fontSize: '30px',
//     color: '#ecf0f1',
//     cursor: 'pointer',
//     transition: 'color 0.3s, transform 0.3s',
//     backgroundColor: '#2c3e50',
//     borderRadius: '50%',
//     padding: '10px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//   },
//   sidebar: {
//     height: '100vh',
//     width: '250px',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     backgroundColor: '#2c3e50',
//     padding: '20px',
//     color: '#ecf0f1',
//     transition: 'transform 0.3s',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//   },
//   navList: {
//     listStyleType: 'none',
//     padding: 0,
//     marginTop: '60px', // Space for the icon
//   },
//   navItem: {
//     marginBottom: '20px',
//     display: 'flex',
//     alignItems: 'center',
//   },
//   navLink: {
//     color: '#ecf0f1',
//     textDecoration: 'none',
//     fontSize: '1rem',
//     transition: 'color 0.3s',
//   },
//   activeNavLink: {
//     color: '#3498db', // Color for active links
//   },
//   logoutButton: {
//     color: '#ecf0f1',
//     backgroundColor: 'transparent',
//     border: 'none',
//     fontSize: '1rem',
//     cursor: 'pointer',
//     transition: 'color 0.3s',
//     padding: 0,
//   },
// };

// export default Sidebar;
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate for logout
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Perform your logout logic here (e.g., clearing authentication tokens)
    console.log('Logging out...');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div>
      <div style={styles.iconContainer}>
        <i 
          className={`fas fa-${isOpen ? 'times' : 'bars'}`} 
          onClick={() => setIsOpen(!isOpen)}
          style={styles.icon}
        ></i>
      </div>
      {isOpen && (
        <div style={styles.sidebar}>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <NavLink 
                to="/home" // Changed from "/Home" to "/home" to match your routes
                style={styles.navLink} 
                activeStyle={styles.activeNavLink}
                end // Ensures the link is only active for the exact path
              >
                Home
              </NavLink>
            </li>
            <li style={styles.navItem}>
              <NavLink 
                to="/analytics" 
                style={styles.navLink} 
                activeStyle={styles.activeNavLink}
              >
                Analytics
              </NavLink>
            </li>
            <li style={styles.navItem}>
              <NavLink 
                to="/container" // Added link to Container
                style={styles.navLink} 
                activeStyle={styles.activeNavLink}
              >
                Content
              </NavLink>
            </li>
            <li style={styles.navItem}>
              <button onClick={handleLogout} style={styles.logoutButton}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  iconContainer: {
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: 1000,
  },
  icon: {
    fontSize: '30px',
    color: '#ecf0f1',
    cursor: 'pointer',
    transition: 'color 0.3s, transform 0.3s',
    backgroundColor: '#2c3e50',
    borderRadius: '50%',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  sidebar: {
    height: '100vh',
    width: '250px',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: '#2c3e50',
    padding: '20px',
    color: '#ecf0f1',
    transition: 'transform 0.3s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
    marginTop: '60px', // Space for the icon
  },
  navItem: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s',
  },
  activeNavLink: {
    color: '#3498db', // Color for active links
  },
  logoutButton: {
    color: '#ecf0f1',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'color 0.3s',
    padding: 0,
  },
};

export default Sidebar;
