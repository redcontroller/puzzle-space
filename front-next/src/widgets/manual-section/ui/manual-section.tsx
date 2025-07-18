'use client'

import type React from 'react'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react'
import { ManualCard } from '@/entities/manual/ui/manual-card'
import { manuals } from '@/shared/mock-data/manuals'
import type { Manual } from '@/shared/types/manual'

export function ManualSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleManualClick = (manual: Manual) => {
    if (isDragging) return
    console.log('Manual clicked:', manual.title, 'Link:', manual.href)
  }

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!scrollContainerRef.current || isScrolling) return

      setIsScrolling(true)
      const container = scrollContainerRef.current
      const cardWidth = 288 + 12 // 카드 너비(w-72) + 간격(space-x-3)
      const scrollLeft = index * cardWidth

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      })

      setCurrentIndex(index)

      setTimeout(() => {
        setIsScrolling(false)
      }, 300)
    },
    [isScrolling]
  )

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : manuals.length - 1
    console.log(
      'Previous: currentIndex =',
      currentIndex,
      'newIndex =',
      newIndex,
      'manuals.length =',
      manuals.length
    )
    scrollToIndex(newIndex)
  }

  const handleNext = () => {
    const newIndex = currentIndex < manuals.length - 1 ? currentIndex + 1 : 0
    scrollToIndex(newIndex)
  }

  // 터치 스와이프 상태 관리
  const [touchStart, setTouchStart] = useState<{
    x: number
    y: number
    time: number
  } | null>(null)
  const [touchMove, setTouchMove] = useState<{ x: number; y: number } | null>(
    null
  )

  const minSwipeDistance = 50
  const maxSwipeTime = 300
  const maxVerticalDistance = 100

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    })
    setTouchMove(null)
    setIsDragging(false)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return

    const touch = e.touches[0]
    const currentMove = {
      x: touch.clientX,
      y: touch.clientY,
    }

    setTouchMove(currentMove)

    const deltaX = Math.abs(currentMove.x - touchStart.x)
    const deltaY = Math.abs(currentMove.y - touchStart.y)

    if (deltaX > deltaY && deltaX > 10) {
      e.preventDefault()
      setIsDragging(true)
    }
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchMove) {
      setIsDragging(false)
      return
    }

    const touchEndTime = Date.now()
    const touchDuration = touchEndTime - touchStart.time

    if (touchDuration > maxSwipeTime) {
      setIsDragging(false)
      return
    }

    const deltaX = touchStart.x - touchMove.x
    const deltaY = Math.abs(touchStart.y - touchMove.y)
    const absDeltaX = Math.abs(deltaX)

    if (deltaY > maxVerticalDistance) {
      setIsDragging(false)
      return
    }

    if (absDeltaX > minSwipeDistance) {
      const isLeftSwipe = deltaX > 0
      const isRightSwipe = deltaX < 0

      if (isLeftSwipe && currentIndex < manuals.length - 1) {
        handleNext()
      } else if (isLeftSwipe && currentIndex === manuals.length - 1) {
        scrollToIndex(0)
      } else if (isRightSwipe && currentIndex > 0) {
        handlePrevious()
      } else if (isRightSwipe && currentIndex === 0) {
        scrollToIndex(manuals.length - 1)
      }
    }

    setTimeout(() => {
      setIsDragging(false)
    }, 100)

    setTouchStart(null)
    setTouchMove(null)
  }

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || isScrolling || isDragging) return

    const container = scrollContainerRef.current
    const cardWidth = 288 + 12
    const scrollLeft = container.scrollLeft
    const newIndex = Math.round(scrollLeft / cardWidth)

    if (
      newIndex !== currentIndex &&
      newIndex >= 0 &&
      newIndex < manuals.length
    ) {
      setCurrentIndex(newIndex)
    }
  }, [currentIndex, isScrolling, isDragging])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      }
    },
    [currentIndex]
  )

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <section style={{ padding: '8px var(--sizes-layout-padding)' }}>
      <Card className="py-4">
        <CardHeader className="pb-4   ">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
              퍼즐 스페이스가 처음이신가요?
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handlePrevious}
                disabled={isScrolling}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handleNext}
                disabled={isScrolling}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription>
            퍼즐 스페이스 이용 방법을 쉽고 빠르게 알아보세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            ref={scrollContainerRef}
            className={`flex space-x-3 overflow-x-auto scrollbar-hide pb-2 ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {manuals.map((manual, index) => (
              <div
                key={manual.id}
                style={{ scrollSnapAlign: 'start' }}
                className={`transition-transform duration-200 ${
                  isDragging ? 'scale-95' : 'scale-100'
                }`}
              >
                <ManualCard
                  manual={manual}
                  onClick={handleManualClick}
                  className={`${
                    index === currentIndex
                      ? 'ring-2 ring-opacity-50 [--tw-ring-color:hsl(217.22deg_91.22%_59.8%_/_50%)]'
                      : ''
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {manuals.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-blue-500 w-6'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                onClick={() => scrollToIndex(index)}
                disabled={isScrolling}
                aria-label={`매뉴얼 ${index + 1}번으로 이동`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
