// Quantité et panier — ADR-0005, ADR-0007 ; spec §5 (Q5, Q6) et A3 à A5

const PRICE = 125

const money = (amount) => `$${amount.toFixed(2)}`
const items = (n) => `${n} ${n === 1 ? 'item' : 'items'}`

export function initCart() {
  const quantity = document.getElementById('quantity')
  const button = document.getElementById('cart-button')
  const card = document.getElementById('cart')
  const count = document.getElementById('cart-count')
  const announce = document.getElementById('announce')

  let selected = 0 // valeur du sélecteur
  let inCart = 0 // articles dans le panier

  function renderQuantity() {
    quantity.textContent = selected
  }

  // Pastille, nom du bouton et carte passent par la même fonction : ils ne peuvent pas diverger
  function renderCart() {
    count.hidden = inCart === 0
    count.textContent = inCart
    button.setAttribute('aria-label', inCart ? `Cart, ${items(inCart)}` : 'Cart')
    document.getElementById('cart-empty').hidden = inCart > 0
    document.getElementById('cart-filled').hidden = inCart === 0
    document.getElementById('cart-quantity').textContent = inCart
    document.getElementById('cart-total').textContent = money(PRICE * inCart)
  }

  function setOpen(open) {
    card.hidden = !open
    button.setAttribute('aria-expanded', String(open))
  }

  for (const step of document.querySelectorAll('[data-quantity]')) {
    step.addEventListener('click', () => {
      selected = Math.max(0, selected + Number(step.dataset.quantity))
      renderQuantity()
    })
  }

  // Q5 : les quantités s'additionnent, le sélecteur revient à 0
  document.getElementById('add-to-cart').addEventListener('click', () => {
    if (selected === 0) return
    inCart += selected
    announce.textContent = `${items(selected)} added. Cart: ${items(inCart)}.`
    selected = 0
    renderQuantity()
    renderCart()
  })

  button.addEventListener('click', () => setOpen(card.hidden))

  document.getElementById('cart-delete').addEventListener('click', () => {
    inCart = 0
    renderCart()
    announce.textContent = 'Item removed. Your cart is empty.'
    button.focus() // le bouton de suppression vient de disparaître
  })

  document.getElementById('checkout').addEventListener('click', () => {
    setOpen(false)
    button.focus()
  })

  // Q6 : Échap et clic hors de la carte la ferment
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !card.hidden) {
      setOpen(false)
      button.focus()
    }
  })
  document.addEventListener('click', (event) => {
    if (!card.hidden && !card.contains(event.target) && !button.contains(event.target)) setOpen(false)
  })

  renderQuantity()
  renderCart()
}
