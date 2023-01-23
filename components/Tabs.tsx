import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import Product from './Product'
import {SkeletonCard} from "./basic";
import {getProducts} from "../service/api";
import {IProduct} from "../types/interface";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [isProductLoading, setIsProductLoading] = useState(false)
  const [categories, setCategories] = useState({
    "All": [],
    "ETH/USDC": [],
    "BTC/USDC": [],
  })

  useEffect(() => {
    if (products.length > 0) {
      const _categories: any = {
        "All": [],
        "ETH/USDC": [],
        "BTC/USDC": [],
      }
      products.forEach((product) => {
        _categories["All"].push(product)
        if (product.name === "ETH/USDC") {
          _categories["ETH/USDC"].push(product)
        } else if (product.name === "BTC/USDC") {
          _categories["BTC/USDC"].push(product)
        }
      })
      setCategories(_categories)
    }
  }, [products])

  useEffect(() => {
    return () => {
      setIsProductLoading(true)
      getProducts().then((products) => {
        setProducts(products)
      }).finally(() => setIsProductLoading(false))
    };
  }, []);


  return (
    <div className="w-full mr-8 px-2 sm:px-0">
      <div className="max-w-md">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
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
        {!isProductLoading && products.map((product, idx) => (
            <Product key={idx} product={product} />
        ))}
      </div>
    </div>
  )
}
