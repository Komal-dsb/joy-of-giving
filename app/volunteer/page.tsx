"use client";

import { motion } from "framer-motion";
import { Users, Heart, Clock, MapPin, UserPlus } from "lucide-react";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const Volunteer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    availability: "",
    interests: [] as string[],
    experience: "",
    message: "",
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast(
      "Application Submitted! Thank you for your interest in volunteering. We'll contact you soon with next steps."
    );
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      availability: "",
      interests: [],
      experience: "",
      message: "",
    });
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, interest]
        : prev.interests.filter((i) => i !== interest),
    }));
  };

  const volunteerOpportunities = [
    {
      title: "Program Assistant",
      description:
        "Help coordinate and support our education and healthcare programs",
      commitment: "4-6 hours/week",
      location: "Field locations",
      icon: Users,
    },
    {
      title: "Community Outreach",
      description: "Engage with local communities and help spread awareness",
      commitment: "2-4 hours/week",
      location: "Various communities",
      icon: Heart,
    },
    {
      title: "Event Coordinator",
      description:
        "Plan and organize fundraising events and community gatherings",
      commitment: "6-8 hours/week",
      location: "Office & venues",
      icon: Clock,
    },
    {
      title: "Administrative Support",
      description: "Assist with office tasks, data entry, and communication",
      commitment: "3-5 hours/week",
      location: "Main office",
      icon: MapPin,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 to-blue-100 pt-20 pb-32">
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
              Join Our <span className="text-red-600">Team</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 leading-relaxed mb-8"
              variants={fadeInUp}
            >
              Become part of a passionate community dedicated to creating
              positive change. Your time, skills, and enthusiasm can help
              transform lives and build stronger communities.
            </motion.p>
            <motion.div
              className="flex items-center justify-center space-x-2 text-lg text-gray-700"
              variants={fadeInUp}
            >
              <Users className="w-6 h-6 text-red-600" />
              <span>Join 500+ active volunteers making a difference</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Why Volunteer */}
      <section className="py-20 bg-white">
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
            Why Volunteer With Us?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Make Real Impact",
                description:
                  "See the direct results of your efforts in communities we serve",
                icon: "🌟",
              },
              {
                title: "Gain Experience",
                description:
                  "Develop new skills and gain valuable experience in nonprofit work",
                icon: "📚",
              },
              {
                title: "Build Community",
                description:
                  "Connect with like-minded individuals who share your passion for helping others",
                icon: "🤝",
              },
            ].map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-6">{benefit.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-20 bg-indigo-50">
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
            Volunteer Opportunities
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {volunteerOpportunities.map((opportunity, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-indigo-100 p-3 rounded-full">
                        <opportunity.icon className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {opportunity.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {opportunity.description}
                        </p>
                        <div className="space-y-2 text-sm text-gray-500">
                          <p>
                            <strong>Time Commitment:</strong>{" "}
                            {opportunity.commitment}
                          </p>
                          <p>
                            <strong>Location:</strong> {opportunity.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Volunteer Application Form */}
      <section className="py-20 bg-white">
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
            Apply to Volunteer
          </motion.h2>

          <div className="max-w-3xl mx-auto">
            <motion.div variants={fadeInUp}>
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            First Name
                          </label>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                              }))
                            }
                            placeholder="John"
                            required
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Last Name
                          </label>
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                lastName: e.target.value,
                              }))
                            }
                            placeholder="Doe"
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
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            placeholder="john@example.com"
                            required
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                            placeholder="+1 (555) 123-4567"
                            required
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Availability */}
                    <div>
                      <label
                        htmlFor="availability"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Availability
                      </label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            availability: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekends">
                            Weekends only
                          </SelectItem>
                          <SelectItem value="weekdays">
                            Weekdays only
                          </SelectItem>
                          <SelectItem value="evenings">Evenings</SelectItem>
                          <SelectItem value="flexible">
                            Flexible schedule
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Areas of Interest */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Areas of Interest (Check all that apply)
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          "Education",
                          "Healthcare",
                          "Community Outreach",
                          "Event Planning",
                          "Administrative",
                          "Fundraising",
                        ].map((interest) => (
                          <div
                            key={interest}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={interest}
                              checked={formData.interests.includes(interest)}
                              onCheckedChange={(checked) =>
                                handleInterestChange(
                                  interest,
                                  checked as boolean
                                )
                              }
                            />
                            <label
                              htmlFor={interest}
                              className="text-sm text-gray-700"
                            >
                              {interest}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Experience */}
                    <div>
                      <label
                        htmlFor="experience"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Relevant Experience (Optional)
                      </label>
                      <textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            experience: e.target.value,
                          }))
                        }
                        placeholder="Tell us about any relevant volunteer experience or skills..."
                        rows={4}
                        className="w-full"
                      />
                    </div>

                    {/* Additional Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Why do you want to volunteer with us?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            message: e.target.value,
                          }))
                        }
                        placeholder="Share your motivation and what you hope to achieve..."
                        required
                        rows={4}
                        className="w-full"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-full transition-all duration-300 hover:shadow-lg"
                    >
                      <UserPlus className="w-5 h-5 mr-2" />
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Volunteer;
