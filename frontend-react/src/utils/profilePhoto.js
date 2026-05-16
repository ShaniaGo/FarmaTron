import { STORAGE_URL } from './constants';

/**
 * URL pública de la foto de perfil del usuario.
 * @param {{ foto_perfil_url?: string, foto_perfil?: string }|null} user
 * @returns {string|null}
 */
export function getFotoPerfilUrl(user) {
  if (!user) return null;
  if (user.foto_perfil_url) return user.foto_perfil_url;
  if (!user.foto_perfil) return null;
  if (user.foto_perfil.startsWith('http')) return user.foto_perfil;
  return `${STORAGE_URL}/storage/${user.foto_perfil}`;
}
