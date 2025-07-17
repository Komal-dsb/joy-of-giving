"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Menu, X, Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { useRouter } from "next/navigation"


const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Impact", href: "/impact" },
  { name: "Announcements", href: "/announcements" },
  { name: "Gallery", href: "/gallery" },
  { name: "Volunteer", href: "/volunteer" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const pathname = usePathname()
  const router = useRouter()


  // Helper to check active route
  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href)

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated")
      setIsAuthenticated(authStatus === "true")
    }
    checkAuth()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "isAuthenticated") checkAuth()
    }

    window.addEventListener("storage", handleStorageChange)
    const interval = setInterval(checkAuth, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    setIsAuthenticated(false)
    setIsOpen(false)
      router.push("/")
    
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6  lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="rounded-full overflow-hidden w-16 md:w-20 p-2">
              <AspectRatio ratio={1}>
                <Image
                  src="/joy-givingLogo.png"
                  alt="Joy of Giving Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </AspectRatio>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center md:gap-4 gap-2  xl:gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:txt-base relative",
                  isActive(item.href) ? "txt-base" : "text-gray-900"
                )}
              >
                {item.name}
                {isActive(item.href) && (
                  <div  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-base"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center  gap-2 ">
            {isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  asChild
                  className=" text-foreground bg-base hover:text-foreground hover:bg-base whitespace-nowrap"
                >
                  <Link href="/dashboard">
                    <Shield className="w-4 h-4" />
                    Admin Panel
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-forground bg-base hover:bg-base hover:text-foreground"
                >
                  <User className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="hover:text-foreground bg-base hover:bg-base" asChild>
                  <Link href="/volunteer">Volunteer</Link>
                </Button>
                <Button asChild className="bg-base hover:bg-base text-foreground">
                  <Link href="/donate">Donate Now</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-10 h-10 txt-base" /> : <Menu className="w-10 h-10 txt-base" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
    
        {isOpen && (
          <div
          
            className="md:hidden bg-white border-t border-gray-200 px-4"
          >
            <div className="flex flex-col py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-2 text-sm rounded-md transition-colors",
                    isActive(item.href)
                      ? "bg-base text-base"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <div className=" pt-4 border-t border-gray-100 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full bg-red-50 border-red-200 txt-base hover:bg-red-100"
                      asChild
                    >
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        <Shield className="w-4 h-4 mr-2" />
                        Admin Panel
                      </Link>
                    </Button>
                    <Button
                      onClick={handleLogout}
                      className="w-full text-white bg-base hover:bg-base"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/volunteer" onClick={() => setIsOpen(false)}>
                        Volunteer
                      </Link>
                    </Button>
                    <Button
                      className="w-full bg-base hover:bg-base text-white"
                      asChild
                    >
                      <Link href="/donate" onClick={() => setIsOpen(false)}>
                        Donate Now
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
   
    </nav>
  )
}
