import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // better-sqlite3 embarque un binaire natif : on l'exclut du bundling
  // pour que Next.js le charge directement via require() côté serveur.
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
