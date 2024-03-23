'use client'

import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  currentTab?: number
  tapOptions?: number[]
}

export const TabBar = ({
  tapOptions = [1, 2, 3, 4],
  currentTab = 1
}: Props) => {
  const router = useRouter()
  const [selected, setSelected] = useState(currentTab)

  const onTabSelected = (tab: number) => {
    setSelected(tab)
    setCookie('selectedTab', tab.toString())
    router.refresh()
  }

  return (
    <div className="flex justify-center items-center gap-x-5 rounded-xl bg-gray-200 p-2">
      {tapOptions.map((tab) => (
        <div key={tab}>
          <input
            checked={selected === tab}
            onChange={() => {}}
            type="radio"
            id="1"
            className="peer hidden"
          />
          <label
            onClick={() => onTabSelected(tab)}
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white transition-all"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  )
}
