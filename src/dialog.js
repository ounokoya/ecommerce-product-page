// Fenêtres modales (ADR-0006) : le <dialog> natif gère Échap, le fond inactif et le retour du focus ;
// il reste la fermeture au clic sur le fond (::backdrop), dont la cible est le <dialog> lui-même.

export function closeOnBackdrop(dialog) {
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return
    const box = dialog.getBoundingClientRect()
    const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom
    if (outside) dialog.close()
  })
}

export const desktop = matchMedia('(min-width: 64rem)')
