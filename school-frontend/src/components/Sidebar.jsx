import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  {
    to: "/dashboard",
    label: "Tableau de bord",
    icon: "🏠",
    roles: ["admin", "teacher", "student", "parent"],
  },
  { to: "/students", label: "Élèves", icon: "👥", roles: ["admin", "teacher"] },
  { to: "/teachers", label: "Professeurs", icon: "👨‍🏫", roles: ["admin"] },
  { to: "/classes", label: "Classes", icon: "🏫", roles: ["admin", "teacher"] },
  { to: "/subjects", label: "Matières", icon: "📚", roles: ["admin"] },
  {
    to: "/grades",
    label: "Notes",
    icon: "📝",
    roles: ["admin", "teacher", "student", "parent"],
  },
  {
    to: "/absences",
    label: "Absences",
    icon: "📋",
    roles: ["admin", "teacher", "student", "parent"],
  },
  {
    to: "/schedules",
    label: "Emploi du temps",
    icon: "📅",
    roles: ["admin", "teacher", "student", "parent"],
  },
  {
    to: "/messages",
    label: "Messages",
    icon: "💬",
    roles: ["admin", "teacher", "student", "parent"],
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const visibleLinks = links.filter((l) => l.roles.includes(user?.role));

  return (
    <aside className="w-72 bg-gradient-to-b from-[#0B126C] via-[#1C2943] to-[#3B556D] h-screen flex flex-col shadow-2xl border-r border-[#3B556D]/50">
      {/* Logo avec effet glassmorphism - FIXED */}
      <div className="flex-shrink-0 p-8 bg-white/5 backdrop-blur-sm border-b border-[#5FC2BA]/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#5FC2BA] to-[#3B556D] rounded-xl flex items-center justify-center text-2xl shadow-lg">
            🏫
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold tracking-tight">
              SchoolApp
            </h1>
            <p className="text-white text-xs uppercase tracking-widest font-medium">
              {user?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation avec design amélioré - SCROLLABLE */}
      <nav className="flex-1 overflow-y-auto p-6 space-y-2 scrollbar-thin scrollbar-thumb-[#3B556D] scrollbar-track-transparent">
        {visibleLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `group relative flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden ${
                isActive
                  ? "bg-gradient-to-r from-[#5FC2BA] to-[#5FC2BA]/80 text-[#0B126C] shadow-lg shadow-[#5FC2BA]/25"
                  : "text-white hover:bg-[#5FC2BA]/10 hover:text-[#0B126C] hover:shadow-md"
              }`
            }
            children={({ isActive }) => (
              <>
                {/* Indicateur actif */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#5FC2BA] to-[#5FC2BA]/60 rounded-r-full"></div>
                )}
                <div
                  className={`text-xl transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                >
                  {link.icon}
                </div>
                <span className="font-medium">{link.label}</span>
              </>
            )}
          />
        ))}
      </nav>

      {/* Section utilisateur avec glassmorphism - FIXED */}
      <div className="flex-shrink-0 p-6 bg-white/5 backdrop-blur-sm border-t border-[#5FC2BA]/20">
        <div className="flex items-center gap-4 mb-4 p-4 bg-[#5FC2BA]/10 rounded-xl border border-[#5FC2BA]/20">
          <div className="w-12 h-12 bg-gradient-to-br from-[#5FC2BA] to-[#3B556D] rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">
              {user?.name}
            </p>
            <p className="text-white text-xs truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-5 py-3 text-sm text-white hover:bg-[#5FC2BA]/10 hover:text-white rounded-xl transition-all duration-300 border border-[#5FC2BA]/20 hover:border-[#5FC2BA]/40"
        >
          <span className="text-lg">🚪</span>
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
