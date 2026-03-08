import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B126C] via-[#1C2943] to-[#3B556D] flex items-center justify-center p-4">
      {/* Container principal avec effet glassmorphism */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8">
        {/* Header avec logo et titre */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#5FC2BA] to-[#3B556D] rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg">
            🏫
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">SchoolApp</h1>
          <p className="text-[#3B556D] text-sm">
            Connectez-vous à votre espace scolaire
          </p>
        </div>

        {/* Message d'erreur stylisé */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl mb-6 text-sm backdrop-blur-sm">
            <span className="text-red-400">⚠️</span> {error}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white text-sm font-semibold mb-3">
              Adresse email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 text-white px-4 py-4 pl-12 rounded-xl border border-white/20 focus:border-[#5FC2BA] focus:outline-none focus:ring-2 focus:ring-[#5FC2BA]/30 transition-all placeholder-[#3B556D] backdrop-blur-sm"
                placeholder="admin@school.fr"
                required
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3B556D] text-lg">
                📧
              </span>
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-semibold mb-3">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 text-white px-4 py-4 pl-12 rounded-xl border border-white/20 focus:border-[#5FC2BA] focus:outline-none focus:ring-2 focus:ring-[#5FC2BA]/30 transition-all placeholder-[#3B556D] backdrop-blur-sm"
                placeholder="••••••••"
                required
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3B556D] text-lg">
                🔒
              </span>
            </div>
          </div>

          {/* Bouton de connexion avec gradient */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#5FC2BA] to-[#5FC2BA]/80 hover:from-[#5FC2BA]/90 hover:to-[#5FC2BA] text-[#0B126C] font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-[#0B126C]/30 border-t-[#0B126C] rounded-full animate-spin"></div>
                Connexion en cours...
              </span>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        {/* Footer discret */}
        <div className="text-center mt-8 pt-6 border-t border-white/10">
          <p className="text-[#3B556D] text-xs">
            Application de gestion scolaire
          </p>
        </div>
      </div>
    </div>
  );
}
