import { type Product, products } from '@/products/data/products'
import { cookies } from 'next/headers'
import { ItemCard } from '@/shopping-cart'
import { WidgetItem } from '@/components'

export const metadata = {
  title: 'Productos en el carrito',
  description: 'Productos en el carrito'
}

interface ProductInCart {
  product: Product
  quantity: number
}

const getProductsInCart = (cart: { [id: string]: number }) => {
  const productsInCart: ProductInCart[] = []
  for (const id of Object.keys(cart)) {
    const product = products.find((prod) => prod.id === id)
    if (product) {
      productsInCart.push({ product, quantity: cart[id] })
    }
  }
  return productsInCart
}

const CartPage = () => {
  const cookieStore = cookies()

  const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}') as {
    [id: string]: number
  }

  const products = getProductsInCart(cart)

  const totalToPay = products.reduce(
    (prev, current) => current.product.price * current.quantity + prev,
    0
  )

  return (
    <div>
      <h1 className="text-3xl text-neutral-100 font-semibold">
        Productos en el carrito
      </h1>
      <br className="mb-2" />
      <div className="flex flex-col sm:flex-row gap-2 w-full te">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {products.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total a pagar">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-neutral-700">
                ${(totalToPay * 1.15).toFixed(2)}
              </h3>
            </div>
            <span className="font-semibold text-center text-neutral-500">
              Impuesto 15%: ${(totalToPay * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  )
}

export default CartPage
