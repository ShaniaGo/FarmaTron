/**
 * Comprueba si el usuario tiene rol de administrador.
 * @param {{ tipo?: string }|null|undefined} user
 * @returns {boolean}
 */
export function isAdmin(user) {
  return user?.tipo === 'admin';
}
