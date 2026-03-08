import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

export default function Dashboard() {
  const { user } = useAuth();

  const cards = [
    { label: "Élèves", icon: "👥", color: "bg-blue-500", link: "/students" },
    {
      label: "Professeurs",
      icon: "👨‍🏫",
      color: "bg-green-500",
      link: "/teachers",
    },
    { label: "Classes", icon: "🏫", color: "bg-purple-500", link: "/classes" },
    { label: "Notes", icon: "📝", color: "bg-yellow-500", link: "/grades" },
    { label: "Absences", icon: "📋", color: "bg-red-500", link: "/absences" },
    {
      label: "Emploi du temps",
      icon: "📅",
      color: "bg-indigo-500",
      link: "/schedules",
    },
  ];

  return (
    <Layout>
      {/* Header avec gradient */}
      <div className="mb-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Bienvenue, {user?.name} 👋</h1>
        <p className="text-blue-100 text-lg">
          Gérez votre établissement scolaire en un coup d'œil
        </p>
      </div>

      {/* Grille de cartes améliorée */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.link}
            className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer
              ${card.color} text-white`}
          >
            {/* Effet de fond dégradé */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>

            {/* Contenu */}
            <div className="relative z-10 flex flex-col items-start">
              <div className="mb-4 text-5xl filter drop-shadow-lg">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold tracking-wide">{card.label}</h3>
              <p className="text-sm opacity-90 mt-2">Accéder</p>
            </div>

            {/* Décoration coin */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-300"></div>
          </a>
        ))}
      </div>
    </Layout>
  );
}
