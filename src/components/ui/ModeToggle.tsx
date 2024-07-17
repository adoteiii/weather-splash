"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useHotkeys } from "react-hotkeys-hook"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem("theme") === "dark"
    setDarkMode(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(true)
    setTheme("dark")
    localStorage.setItem("theme", "dark")
    document.documentElement.classList.add("dark")
  }

  const toggleLightMode = () => {
    setDarkMode(false)
    setTheme("light")
    localStorage.setItem("theme", "light")
    document.documentElement.classList.remove("dark")
  }

  const toggleSystemMode = () => {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isSystemDark)
    setTheme("system")
    localStorage.setItem("theme", "system")
    if (isSystemDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  useHotkeys(["t"], () => {
    if (darkMode) {
      toggleLightMode()
    } else {
      toggleDarkMode()
    }
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 shrink-0">
          <SunIcon className="w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="w-4 h-4 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={toggleLightMode}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleDarkMode}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleSystemMode}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
