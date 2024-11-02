import styles from "./Navbar.module.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import logoIcon from "../../logo.svg";

function Navbar({ isSidebarOpen, toggleSidebar }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.sticky}>
        <div className={styles.logo}>
          <img src={logoIcon} alt="icon" className={styles.logoIcon} />
          <span>LinguaAI</span>
        </div>
        <ul className={styles.ul}>
          <li>
            <Link className={styles.link} to="/" onClick={toggleSidebar}>
              Home
            </Link>
          </li>
          <li>
            <Link
              className={styles.link}
              to="/conversation"
              onClick={toggleSidebar}
            >
              Conversation
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/about" onClick={toggleSidebar}>
              About
            </Link>
          </li>
        </ul>
        {isSidebarOpen && (
          <button className={styles.closeButton} onClick={toggleSidebar}>
            X
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
