import {useEffect, useMemo, useState} from 'react'
import { Tab } from '@headlessui/react'
import Product from './Product'
import {SkeletonCard} from "./basic";
import {getProducts} from "../service";
import {IProduct} from "../types/interface";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [isProductLoading, setIsProductLoading] = useState(false)
  const [category, setCategory] = useState('All')

  const categories = useMemo(() => {
    return ['All'].concat(products.map((product) => product.underlying).filter((v, i, a) => a.indexOf(v) === i))
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (category === 'All') return true
      return product.underlying === category
    })
  }, [products, category])

  useEffect(() => {
    (async () => {
      try {
        setIsProductLoading(true)
        const _products = await getProducts()
        setProducts(_products)
      } catch (e) {
        console.error(e)
      } finally {
        setIsProductLoading(false)
      }
    })()
  }, []);


  return (
    <div className="w-full mr-8 px-2 sm:px-0">
      <div className="max-w-md">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {categories.map((category, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                    'focus:outline-none',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
                onClick={() => setCategory(category)}
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>
      <div className={'grid grid-cols-2 gap-8 mt-5'}>
        {
          isProductLoading &&
            <div className={'col-span-2'}>
              <SkeletonCard />
            </div>
        }
        {!isProductLoading && filteredProducts.map((product, idx) => (
            <Product key={idx} product={product} />
        ))}
      </div>
    </div>
  )
}
