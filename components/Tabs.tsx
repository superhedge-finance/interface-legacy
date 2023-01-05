import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import Product from './Product'
import useContract from '../hooks/useContract'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs() {
  const { products } = useContract()
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

  return (
    <div className="w-full max-w-md mr-8 px-2 sm:px-0">
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
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((products, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <div>
                {products.map((product) => (
                  <Product key={idx} product={product} />
                ))}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
