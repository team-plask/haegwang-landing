'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Add a 1-second delay before showing the header
    const timer = setTimeout(() => {
      setVisible(true)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) { // You can adjust this value
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Call handleScroll once to set initial state based on current scroll position
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background shadow-sm backdrop-blur-sm' : 'bg-background shadow-none backdrop-blur-none'} ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-6">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">법무법인(유한)해광</span>
            <Image src="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/source//logo.png" alt="법무법인(유한)해광" width={150} height={40} className="h-10 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link href="/about" className="text-md/6 font-semibold text-brand">
            법인 소개
          </Link>
          <Link href="/lawyers" className="text-md/6 font-semibold text-brand">
            변호사 소개
          </Link>
          <Link href="/areas" className="text-md/6 font-semibold text-brand">
            업무분야
          </Link>
          <Link href="/success" className="text-md/6 font-semibold text-brand">
            성공사례
          </Link>
          <Link href="/media" className="text-md/6 font-semibold text-brand">
            법률소식
          </Link>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">법무법인(유한)해광</span>
              <Image src="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/source//logo.png" alt="법무법인(유한)해광" width={150} height={40} className="h-10 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-lg/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  법인 소개
                </Link>
                <Link
                  href="/lawyers"
                  className="-mx-3 block rounded-lg px-3 py-2 text-lg/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  변호사 소개
                </Link>
                <Link
                  href="/areas"
                  className="-mx-3 block rounded-lg px-3 py-2 text-lg/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  업무분야
                </Link>
                <Link
                  href="/success"
                  className="-mx-3 block rounded-lg px-3 py-2 text-lg/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  성공사례
                </Link>
                <Link
                  href="/media"
                  className="-mx-3 block rounded-lg px-3 py-2 text-lg/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  법률소식
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
