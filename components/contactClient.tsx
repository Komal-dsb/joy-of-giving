"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Message sent");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 to-red-100 pt-20 pb-32">
        <motion.div
          className="container mx-auto px-4"
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              variants={fadeInUp}
            >
              Get in <span className="text-red-600">Touch</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 leading-relaxed"
              variants={fadeInUp}
            >
              Have questions about our programs? Want to get involved? We&apos;d
              love to hear from you. Reach out and let&apos;s start a
              conversation about making a difference together.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <motion.div
          className="container mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        required
                        rows={6}
                        className="w-full"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-full transition-all duration-300 hover:shadow-lg"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Contact Information
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  We&apos;re here to answer your questions and help you get involved
                  in our mission. Don&apos;t hesitate to reach out through any of the
                  channels below.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: "Email Us",
                    content: "Info@designingsolutions.co.in",
                    subContent: "We will respond within 24 hours",
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    content: "+91 85590-03498",
                    subContent: "Mon-Fri, 9am-6pm EST",
                  },
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    content: "  Fifth floor, Bestech Business Tower, B-505-506, Parkview Residence Colony, Sector-66, Sahibzada Ajit Singh Nagar,Punjab 160062",
                    subContent: "Main office and community center",
                  },
                  {
                    icon: Clock,
                    title: "Office Hours",
                    content: "Monday - Friday: 9:00 AM - 6:00 PM",
                    subContent: "Saturday: 10:00 AM - 4:00 PM",
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className="border-l-4 border-l-red-600 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <item.icon className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-700 font-medium">
                            {item.content}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {item.subContent}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Emergency Contact */}
              <Card className="bg-red-50 border-2 border-red-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-red-800 mb-2">
                    Emergency Assistance
                  </h3>
                  <p className="text-red-700 mb-3">
                    For urgent humanitarian assistance or emergency situations:
                  </p>
                  <p className="text-red-800 font-bold text-lg">
                   91 98780-04383 HELP-NOW
                  </p>
                  <p className="text-red-600 text-sm">Available 24/7</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-red-50">
        <motion.div
          className="container mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-16 text-center"
            variants={fadeInUp}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How can I volunteer?",
                answer:
                  "Visit our Volunteer page to learn about current opportunities and fill out our volunteer application form.",
              },
              {
                question: "Are donations tax-deductible?",
                answer:
                  "Yes, we&apos;re a registered 501(c)(3) nonprofit. All donations are tax-deductible to the fullest extent allowed by law.",
              },
              {
                question: "Can I donate items instead of money?",
                answer:
                  "We accept in-kind donations for specific programs. Contact us to learn about current needs and donation guidelines.",
              },
              {
                question: "How do you use donations?",
                answer:
                  "100% of donations go directly to our programs. Administrative costs are covered through separate grants and partnerships.",
              },
            ].map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
