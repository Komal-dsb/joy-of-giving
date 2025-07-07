import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 ">
              <Link href="/" className="flex items-center  space-x-2">
            <div className="rounded-full overflow-hidden  w-32 h-38">
              <AspectRatio ratio={1}>
                <Image
                  src="/jgFooter.png"
                  alt="Joy of Giving Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </AspectRatio>
            </div>
          </Link>
            </div>
            <p className="text-gray-300  text-sm">
              Creating positive change in communities worldwide through
              compassion, dedication, and the power of giving.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Our Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/impact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Our Impact
                </Link>
              </li>
              <li>
                <Link
                  href="/volunteer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Volunteer
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/donate"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Donate
                </Link>
              </li>
              <li>
                <Link
                  href="/volunteer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Become a Volunteer
                </Link>
              </li>
              <li>
                <Link
                  href="/announcements"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Latest News
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red-500" />
                <span className="text-gray-300 text-sm">
                  123 Charity Lane, Hope City, HC 12345
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-500" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-500" />
                <span className="text-gray-300 text-sm">
                  info@joyofgiving.org
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Joy of Giving. All rights reserved. |
            <Link href="/privacy" className="hover:text-white ml-1">
              Privacy Policy
            </Link>{" "}
            |
            <Link href="/terms" className="hover:text-white ml-1">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
