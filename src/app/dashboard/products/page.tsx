import { ProductCard } from '@/products/components/ProductCard'
import { products } from '@/products/data/products'

const ProductsPage = () => {
  return (
    <div className="grid w-full p-5 grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}

export default ProductsPage
