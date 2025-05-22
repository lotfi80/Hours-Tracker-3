import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./navStyles.module.css";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.navLogo}>Hours Tracker</div>

        <div className={styles.navHamburger}>
          <button onClick={toggleMenu} className={styles.hamburgerButton}>
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="currentColor"
                className={styles.icon}
              >
                <line
                  x1="6"
                  y1="6"
                  x2="26"
                  y2="26"
                  stroke="black"
                  strokeWidth="2"
                />
                <line
                  x1="26"
                  y1="6"
                  x2="6"
                  y2="26"
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="currentColor"
                className={styles.icon}
              >
                <circle cx="5" cy="6" r="1" stroke="black" strokeWidth="2" />
                <circle cx="5" cy="16" r="1" stroke="black" strokeWidth="2" />
                <circle cx="5" cy="26" r="1" stroke="black" strokeWidth="2" />
                <line
                  x1="10"
                  y1="6"
                  x2="28"
                  y2="6"
                  stroke="black"
                  strokeWidth="2"
                />
                <line
                  x1="10"
                  y1="16"
                  x2="28"
                  y2="16"
                  stroke="black"
                  strokeWidth="2"
                />
                <line
                  x1="10"
                  y1="26"
                  x2="28"
                  y2="26"
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
            )}
          </button>
        </div>

        <ul
          className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ""}`}
        >
          <li>
            <Link to="/home/:userid" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/addclient" className={styles.navLink}>
              Add Client
            </Link>
          </li>
          <li>
            <Link to="/addtimework" className={styles.navLink}>
              Add Time Work
            </Link>
          </li>
          <li>
            <Link to="/filter-client-work" className={styles.navLink}>
              Filter Client Work
            </Link>
          </li>
          <li>
            <Link to="/" className={styles.navLink}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
