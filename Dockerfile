# Utiliser une image légère comme base
FROM debian:bullseye-slim

# Variables d'environnement
ENV NODE_ENV=production
ENV BUN_INSTALL=/root/.bun

# Installer les dépendances nécessaires et Bun
RUN apt-get update && apt-get install -y curl build-essential unzip && curl -fsSL https://bun.sh/install | bash && rm -rf /var/lib/apt/lists/*

# Ajouter Bun au PATH
ENV PATH="${BUN_INSTALL}/bin:${PATH}"

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers
COPY . .

# Installer les dépendances et builder l'application
RUN bun install && bun run build

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["bun", "start"]