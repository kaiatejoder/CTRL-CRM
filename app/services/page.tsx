import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      title: 'Branding & Identity',
      description:
        'Create a cohesive brand identity that resonates with your target audience and sets you apart from competitors.',
      includes: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Color Palette'],
    },
    {
      title: 'Web Design',
      description: 'Beautiful, user-centered designs that prioritize both aesthetics and functionality.',
      includes: ['UI/UX Design', 'Responsive Design', 'Prototyping', 'Design Systems'],
    },
    {
      title: 'Web Development',
      description: 'Modern web applications built with cutting-edge technologies and best practices.',
      includes: ['Frontend Development', 'Backend Development', 'Full-Stack Solutions', 'API Integration'],
    },
    {
      title: 'E-Commerce Solutions',
      description: 'Complete e-commerce platforms designed to maximize conversions and customer satisfaction.',
      includes: ['Store Setup', 'Payment Integration', 'Inventory Management', 'Analytics'],
    },
    {
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      includes: ['iOS Development', 'Android Development', 'React Native', 'App Optimization'],
    },
    {
      title: 'Consulting & Strategy',
      description: 'Expert guidance on technology, architecture, and digital transformation.',
      includes: ['Tech Stack Selection', 'Architecture Planning', 'Performance Optimization', 'Security Audits'],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition w-fit">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </nav>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        <h1 className="text-5xl font-bold">Our Services</h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          We offer a comprehensive range of services to help your business succeed in the digital landscape.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 space-y-6 hover:border-blue-500 transition"
            >
              <h3 className="text-2xl font-bold">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
              <div className="space-y-3 pt-4 border-t border-gray-700">
                <p className="text-sm font-semibold text-gray-400 uppercase">Includes:</p>
                <ul className="space-y-2">
                  {service.includes.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-200">
                      <CheckCircle size={16} className="text-blue-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-gray-800/50 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12">Our Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '01', title: 'Discovery', desc: 'Understand your goals and requirements' },
              { number: '02', title: 'Strategy', desc: 'Develop a tailored approach and timeline' },
              { number: '03', title: 'Execution', desc: 'Build and deliver with excellence' },
              { number: '04', title: 'Support', desc: 'Provide ongoing maintenance and updates' },
            ].map((step, index) => (
              <div key={index} className="space-y-4">
                <div className="text-5xl font-bold text-blue-500 opacity-50">{step.number}</div>
                <h4 className="text-xl font-bold">{step.title}</h4>
                <p className="text-gray-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
        <Link
          href="/login"
          className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          Start Your Project
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p className="text-gray-400">© 2024 CTRL Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
