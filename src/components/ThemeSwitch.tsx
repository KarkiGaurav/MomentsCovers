'use client'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {
          theme === 'light' ? (
            <SunIcon className="w-5 h-5" />
          ) : (
            <MoonIcon className="w-5 h-5" />
          )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
          <DropdownMenuRadioItem onClick={() => {setTheme('light')}} value="top">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem onClick={() => {setTheme('dark')}} value="bottom">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem onClick={() => {setTheme('system')}} value="right">System</DropdownMenuRadioItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

}

export default ThemeSwitch
