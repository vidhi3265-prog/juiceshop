import {
  FaHome,
  FaUsers,
  FaReceipt,
  FaGift,
  FaHistory,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar({ setPage }) {
  return (
    <div className="sidebar">
      <div className="logo">
        🍹 Juice Club
      </div>

      <ul>
        <li onClick={() => setPage("dashboard")}>
          <FaHome /> Dashboard
        </li>

        <li onClick={() => setPage("customers")}>
          <FaUsers /> Customers
        </li>


        <li onClick={() => setPage("history")}>
          <FaHistory /> History
        </li>

        <li onClick={() => setPage("rewards")}>
          <FaGift /> Rewards
        </li>


<li onClick={() => setPage("reports")}>
  📈 Reports
</li>


<li onClick={() => setPage("settings")}>
  ⚙️ Settings
</li>

        <li
          onClick={() => {
            localStorage.removeItem(
              "ownerLoggedIn"
            );
            window.location.reload();
          }}
        >
          <FaSignOutAlt /> Logout
        </li>
      </ul>
    </div>
  );
}