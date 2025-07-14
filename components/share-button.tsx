"use client";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";
import { useState } from "react";
import { Button } from "@/components/ui/button"; 
import { motion } from "framer-motion";

interface ShareButtonsProps {
  url: string;
  title: string;
}

const iconMotion = {
  whileHover: { scale: 1.15, rotate: 8},
  whileTap: { scale: 0.95, rotate: -8},
};

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full rounded-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex gap-3">
          <motion.div {...iconMotion}>
            <FacebookShareButton url={url} quote={title}>
              <FacebookIcon className="w-8 h-8 sm:w-10 sm:h-10" round />
            </FacebookShareButton>
          </motion.div>
          <motion.div {...iconMotion}>
            <TwitterShareButton url={url} title={title}>
              <TwitterIcon className="w-8 h-8 sm:w-10 sm:h-10" round />
            </TwitterShareButton>
          </motion.div>
          <motion.div {...iconMotion}>
            <WhatsappShareButton url={url} title={title}>
              <WhatsappIcon className="w-8 h-8 sm:w-10 sm:h-10" round />
            </WhatsappShareButton>
          </motion.div>
          <motion.div {...iconMotion}>
            <TelegramShareButton url={url} title={title}>
              <TelegramIcon className="w-8 h-8 sm:w-10 sm:h-10" round />
            </TelegramShareButton>
          </motion.div>
          <motion.div {...iconMotion}>
            <LinkedinShareButton url={url} title={title}>
              <LinkedinIcon className="w-8 h-8 sm:w-10 sm:h-10" round />
            </LinkedinShareButton>
          </motion.div>
          <motion.div {...iconMotion}>
            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                width={40}
                height={40}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="rounded-full w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white p-2"
              >
                <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.52.19.89.42 1.28.81.39.39.62.76.81 1.28.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.19.52-.42.89-.81 1.28-.39.39-.76.62-1.28.81-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41-.52-.19-.89-.42-1.28-.81-.39-.39-.62-.76-.81-1.28-.17-.46-.354-1.26-.41-2.43C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.19-.52.42-.89.81-1.28.39-.39.76-.62 1.28-.81.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.72 0 8.332.014 7.052.072 5.77.13 4.68.346 3.77.63 2.86.914 2.09 1.28 1.28 2.09.47 2.9.104 3.67-.18 4.58c-.284.91-.5 2-.558 3.282C-.014 8.332 0 8.72 0 12c0 3.28.014 3.668.072 4.948.058 1.282.274 2.372.558 3.282.284.91.65 1.68 1.46 2.49.81.81 1.58 1.176 2.49 1.46.91.284 2 .5 3.282.558C8.332 23.986 8.72 24 12 24s3.668-.014 4.948-.072c1.282-.058 2.372-.274 3.282-.558.91-.284 1.68-.65 2.49-1.46.81-.81 1.176-1.58 1.46-2.49.284-.91.5-2 .558-3.282C23.986 15.668 24 15.28 24 12s-.014-3.668-.072-4.948c-.058-1.282-.274-2.372-.558-3.282-.284-.91-.65-1.68-1.46-2.49C21.14.47 20.37.104 19.46-.18c-.91-.284-2-.5-3.282-.558C15.668.014 15.28 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.842-10.406a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
              </svg>
            </a>
          </motion.div>
        </div>
        <div>
          <Button
            onClick={handleCopy}
            className={`w-full mt-2 font-semibold transition-colors ${
              copied
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            type="button"
          >
            {copied ? "Link Copied!" : "Copy Link"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
