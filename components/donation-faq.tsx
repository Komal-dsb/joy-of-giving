"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "Is my donation tax-deductible?",
    answer:
      "Yes! Joy of Giving is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the full extent allowed by law. You will receive a donation receipt for your records. Our Tax ID is 12-3456789.",
  },
  {
    question: "How do I know my donation is being used effectively?",
    answer:
      "We believe in complete transparency. 85% of every donation goes directly to our programs, and we provide detailed impact reports to all donors. You can also view our annual reports and financial statements on our website.",
  },
  {
    question: "Can I specify how my donation is used?",
    answer:
      "You can designate your donation for specific programs like Education, Clean Water, Emergency Relief, or Healthcare. You can also choose to make an unrestricted donation, which allows us to direct funds where they're needed most urgently.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers, mobile payments (Venmo, PayPal, Zelle), and QR code payments. All payment methods are secure and processed through encrypted systems to protect your financial information.",
  },
  {
    question: "Can I set up recurring donations?",
    answer:
      "Yes! Monthly recurring donations are a great way to provide sustained support for our programs. You can set up recurring donations through most of our payment methods, and you can modify or cancel them at any time.",
  },
  {
    question: "Do you accept international donations?",
    answer:
      "Yes, we welcome donations from supporters worldwide. We can accept international bank transfers and many international payment methods. Please contact us if you need assistance with international donations.",
  },
  {
    question: "How will I receive updates about the impact of my donation?",
    answer:
      "We send regular impact updates via email, including stories from the communities we serve, program updates, and annual impact reports. You can also follow our progress on social media and our website.",
  },
  {
    question: "Is there a minimum donation amount?",
    answer:
      "There is no minimum donation amount. Every contribution, regardless of size, makes a meaningful difference. Even small donations can have a significant impact when combined with others.",
  },
]

export function DonationFAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about donating? We&aposre here to help. Find answers to common questions below.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-lg p-6 transition-colors duration-200"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </div>

                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.1 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Still have questions?</h3>
            <p className="text-blue-700 mb-4">
              Our team is here to help! Contact us directly for personalized assistance.
            </p>
            <div className="space-y-2 text-sm text-blue-600">
              <p>📧 Email: donate@joyofgiving.org</p>
              <p>📞 Phone: +1 (555) 123-4567</p>
              <p>💬 Live Chat: Available on our website</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
