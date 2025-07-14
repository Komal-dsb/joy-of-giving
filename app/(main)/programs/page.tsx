
import { Button } from "@/components/ui/button";
import ClientPrograms from "@/components/clientPrograms";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-red-100 pt-20 pb-28">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-5 tracking-tight">
            Our <span className="text-red-600">Programs</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-2">
            Targeted initiatives designed to create lasting change in communities worldwide.
          </p>
        </div>
      </section>

      {/* Client-side animated section */}
      <ClientPrograms />

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-red-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6 tracking-tight">Ready to Make an Impact?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Choose a program that speaks to your heart and help us create lasting change.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button className="bg-white text-red-700 hover:bg-gray-100 px-8 py-4 text-lg rounded-full font-semibold">
            Donate Now
          </Button>
          <Button
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-red-700 px-8 py-4 text-lg rounded-full font-semibold"
          >
            Volunteer With Us
          </Button>
        </div>
      </section>
    </div>
  );
}
