import { getCookie, hasCookie, setCookie } from 'cookies-next'

export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie('cart')) {
    const cookieCart = JSON.parse((getCookie('cart') as string) ?? '{}')
    return cookieCart
  }
  return {}
}

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart()
  if (cookieCart[id]) {
    cookieCart[id]++
  } else {
    cookieCart[id] = 1
  }

  setCookie('cart', JSON.stringify(cookieCart))
}

export const remveProductFromCart = (id: string) => {
  const cookieCart = getCookieCart()
  if (cookieCart[id]) {
    delete cookieCart[id]
  }

  setCookie('cart', JSON.stringify(cookieCart))
}

export const removeSingleItemFromCart = (id: string) => {
  const cookieCart = getCookieCart()
  if (!cookieCart[id]) return

  const itemCart = cookieCart[id] - 1

  if (itemCart <= 0) {
    delete cookieCart[id]
  } else {
    cookieCart[id] = itemCart
  }

  setCookie('cart', JSON.stringify(cookieCart))
}
