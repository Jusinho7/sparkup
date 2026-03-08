# 🏫 SchoolApp

Application de gestion d'école complète avec **Laravel 11 API** + **React + Tailwind CSS**.

## En cours de développement ##

---

## Stack technique

| Côté | Technologies |
|------|-------------|
| Backend | Laravel 11, PHP 8.4, MySQL, Laravel Sanctum |
| Frontend | React 18, Vite, Tailwind CSS 3, Axios, React Router |

---

## Fonctionnalités

- 👥 **Élèves** — profils, classes, historique notes & absences
- 👨‍🏫 **Professeurs** — profils, spécialités, emploi du temps
- 🏫 **Classes** — gestion des classes et affectations
- 📚 **Matières** — matières avec coefficients
- 📝 **Notes** — saisie et consultation des bulletins
- 📋 **Absences** — suivi justifié/non justifié
- 📅 **Emploi du temps** — vue hebdomadaire par classe
- 💬 **Messagerie** — conversations entre utilisateurs
- 🔐 **Auth** — 4 rôles : Admin, Professeur, Élève, Parent

---

## Structure du projet

```
schoolapp/
├── school-backend/       # Laravel API
│   ├── app/
│   │   ├── Models/       # User, Student, Teacher, SchoolClass...
│   │   └── Http/Controllers/Api/   # Un controller par ressource
│   ├── database/migrations/
│   └── routes/api.php
│
└── school-frontend/      # React + Vite
    └── src/
        ├── api/          # axios.js — configuration Axios
        ├── context/      # AuthContext.jsx
        ├── components/   # Sidebar, Layout, PrivateRoute
        └── pages/        # Login, Dashboard, Students...
```

---

## Installation

### Prérequis
- PHP 8.1+
- Composer
- Node.js 18+
- MySQL

---

### Backend Laravel

```bash
# 1. Aller dans le dossier backend
cd school-backend

# 2. Installer les dépendances
composer install

# 3. Copier le fichier d'environnement
cp .env.example .env

# 4. Configurer la base de données dans .env
DB_DATABASE=school_app
DB_USERNAME=root
DB_PASSWORD=ton_mot_de_passe

# 5. Créer la base de données
mysql -u root -p -e "CREATE DATABASE school_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 6. Générer la clé de l'application
php artisan key:generate

# 7. Lancer les migrations
php artisan migrate

# 8. Lancer le serveur
php artisan serve
```

L'API est disponible sur **http://localhost:8000/api**

---

### Frontend React

```bash
# 1. Aller dans le dossier frontend
cd school-frontend

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

L'application est disponible sur **http://localhost:5173**

---

## Créer le premier compte admin

```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@school.fr","password":"admin123","role":"admin"}'
```

---

## Routes API

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/register` | Créer un compte |
| POST | `/api/login` | Se connecter |
| POST | `/api/logout` | Se déconnecter |
| GET | `/api/me` | Utilisateur connecté |
| GET/POST | `/api/students` | Liste / créer élèves |
| GET/POST | `/api/teachers` | Liste / créer profs |
| GET/POST | `/api/classes` | Liste / créer classes |
| GET/POST | `/api/subjects` | Liste / créer matières |
| GET/POST | `/api/grades` | Liste / créer notes |
| GET/POST | `/api/absences` | Liste / créer absences |
| GET/POST | `/api/schedules` | Liste / créer créneaux |
| GET/POST | `/api/messages` | Liste / envoyer messages |
| GET | `/api/messages/conversation/{id}` | Conversation avec un user |

Toutes les routes sauf `/register` et `/login` nécessitent le header :
```
Authorization: Bearer {token}
```

---

## Rôles et accès

| Page | Admin | Professeur | Élève | Parent |
|------|-------|-----------|-------|--------|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| Élèves | ✅ | ✅ | ❌ | ❌ |
| Professeurs | ✅ | ❌ | ❌ | ❌ |
| Classes | ✅ | ✅ | ❌ | ❌ |
| Matières | ✅ | ❌ | ❌ | ❌ |
| Notes | ✅ | ✅ | ✅ | ✅ |
| Absences | ✅ | ✅ | ✅ | ✅ |
| Emploi du temps | ✅ | ✅ | ✅ | ✅ |
| Messages | ✅ | ✅ | ✅ | ✅ |

---

## Ce que le projet enseigne

- **Laravel** : Models, Controllers, Migrations, Eloquent ORM, Relations
- **Sanctum** : Authentification par tokens API
- **React** : Composants, hooks, Context API, React Router
- **Axios** : Appels API, intercepteurs, gestion des tokens
- **Tailwind** : Utility-first CSS, responsive design
- **Architecture REST** : Séparation frontend/backend, JSON API

---

## Idées d'extensions

- [ ] Seeder pour données de démo
- [ ] Export PDF des bulletins
- [ ] Notifications en temps réel (Laravel Echo + Pusher)
- [ ] Application mobile (React Native)
- [ ] Tests unitaires (PHPUnit + Vitest)
- [ ] Déploiement (Docker + Railway/Vercel)
