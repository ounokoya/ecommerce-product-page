// Menu mobile — ADR-0005, ADR-0006 ; spec §5 et A2, A3

import { closeOnBackdrop, desktop } from './dialog.js'

export function initMenu() {
  const menu = document.getElementById('menu')
  const trigger = document.getElementById('menu-open')

  trigger.addEventListener('click', () => {
    menu.showModal()
    trigger.setAttribute('aria-expanded', 'true')
  })
  menu.addEventListener('close', () => trigger.setAttribute('aria-expanded', 'false'))

  document.getElementById('menu-close').addEventListener('click', () => menu.close())
  for (const link of menu.querySelectorAll('a')) link.addEventListener('click', () => menu.close())
  closeOnBackdrop(menu)

  // En desktop, les liens sont dans l'en-tête : le menu n'a plus lieu d'être
  desktop.addEventListener('change', (event) => {
    if (event.matches) menu.close()
  })
}
