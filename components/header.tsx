'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePageLoading } from '@/hooks/use-page-loading'
import {
  Dialog,
  DialogPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Logo } from '@/components/logo'

export default function HeroHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [prefetchedRoutes, setPrefetchedRoutes] = useState(false)
  const [clickedItem, setClickedItem] = useState<string | null>(null)
  const router = useRouter()
  const { startLoading } = usePageLoading()

  // 모든 라우트 경로
  const routes = ['/about', '/lawyers', '/areas', '/success', '/media', '/contact']

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

  // 햄버거 메뉴 열기와 동시에 모든 페이지 prefetch
  const openMobileMenu = async () => {
    setMobileMenuOpen(true)
    
    // 한 번만 prefetch 실행
    if (!prefetchedRoutes) {
      try {
        // 모든 라우트를 병렬로 prefetch
        await Promise.all(routes.map(route => router.prefetch(route)))
        setPrefetchedRoutes(true)
      } catch (error) {
        console.warn('Failed to prefetch routes:', error)
      }
    }
  }

  const handleMenuClick = (href: string, itemName: string) => {
    // 클릭된 항목에 시각적 피드백
    setClickedItem(itemName)
    
    // 즉시 맨 위로 스크롤 (빠른 피드백)
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // 로딩 상태 시작
    startLoading()
    
    // 약간의 지연 후 메뉴 닫기 (사용자가 선택한 항목을 확인할 수 있도록)
    setTimeout(() => {
      setMobileMenuOpen(false)
      setClickedItem(null)
    }, 200)
  }

  const handleDesktopMenuClick = () => {
    // 데스크톱 메뉴 클릭 시 스크롤 리셋과 로딩 상태
    window.scrollTo({ top: 0, behavior: 'instant' });
    startLoading()
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setClickedItem(null)
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background shadow-sm backdrop-blur-sm' : 'bg-background shadow-none backdrop-blur-none'} ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav aria-label="Global" className="mx-auto flex max-w-[1400px] items-center justify-between py-4 px-4">
        <div className="flex lg:flex-1">
          <Link href="/" prefetch={true} onClick={handleDesktopMenuClick} className="-m-1.5 p-1.5">
            <span className="sr-only">법무법인(유한)해광</span>
            <Logo width={200} height={45} className="w-40 md:w-60" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={openMobileMenu}
            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ${isScrolled ? 'text-gray-700' : 'text-gray-700'}`}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link href="/about" prefetch={true} onClick={handleDesktopMenuClick} className="text-md/6 font-semibold text-brand">
            법인 소개
          </Link>
          <Link href="/lawyers" prefetch={true} onClick={handleDesktopMenuClick} className="text-md/6 font-semibold text-brand">
            변호사 소개
          </Link>
          <Link href="/areas" prefetch={true} onClick={handleDesktopMenuClick} className="text-md/6 font-semibold text-brand">
            업무분야
          </Link>
          <Link href="/success" prefetch={true} onClick={handleDesktopMenuClick} className="text-md/6 font-semibold text-brand">
            업무사례
          </Link>
          <Link href="/media" prefetch={true} onClick={handleDesktopMenuClick} className="text-md/6 font-semibold text-brand">
            언론보도
          </Link>
          <Link href="/contact" prefetch={true} onClick={handleDesktopMenuClick} className="text-md/6 font-semibold text-brand">
            오시는 길
          </Link>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" prefetch={true} onClick={handleDesktopMenuClick} className="-m-1.5 p-1.5">
              <span className="sr-only">법무법인(유한)해광</span>
              <Logo width={140} height={30} className="w-32" />
            </Link>
            <button
              type="button"
              onClick={closeMobileMenu}
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
                  prefetch={true}
                  onClick={() => handleMenuClick('/about', '법인 소개')}
                  className={`-mx-3 block rounded-lg px-3 py-2 text-lg/7 font-semibold transition-colors duration-200 ${
                    clickedItem === '법인 소개' 
                      ? 'text-white bg-brand' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  법인 소개
                </Link>
                <Link
                  href="/lawyers"
                  prefetch={true}
                  onClick={() => handleMenuClick('/lawyers', '변호사 소개')}
                  className={`-mx-3 block rounded-lg px-3 py-2 text-lg/7 font-semibold transition-colors duration-200 ${
                    clickedItem === '변호사 소개' 
                      ? 'text-white bg-brand' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  변호사 소개
                </Link>
                <Link
                  href="/areas"
                  prefetch={true}
                  onClick={() => handleMenuClick('/areas', '업무분야')}
                  className={`-mx-3 block rounded-lg px-3 py-2 text-lg/7 font-semibold transition-colors duration-200 ${
                    clickedItem === '업무분야' 
                      ? 'text-white bg-brand' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  업무분야
                </Link>
                <Link
                  href="/success"
                  prefetch={true}
                  onClick={() => handleMenuClick('/success', '업무사례')}
                  className={`-mx-3 block rounded-lg px-3 py-2 text-lg/7 font-semibold transition-colors duration-200 ${
                    clickedItem === '업무사례' 
                      ? 'text-white bg-brand' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  업무사례
                </Link>
                <Link
                  href="/media"
                  prefetch={true}
                  onClick={() => handleMenuClick('/media', '언론보도')}
                  className={`-mx-3 block rounded-lg px-3 py-2 text-lg/7 font-semibold transition-colors duration-200 ${
                    clickedItem === '언론보도' 
                      ? 'text-white bg-brand' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  언론보도
                </Link>
                <Link
                  href="/contact"
                  prefetch={true}
                  onClick={() => handleMenuClick('/contact', '오시는 길')}
                  className={`-mx-3 block rounded-lg px-3 py-2 text-lg/7 font-semibold transition-colors duration-200 ${
                    clickedItem === '오시는 길' 
                      ? 'text-white bg-brand' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  오시는 길
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
