import Link from 'next/link'
import { ArrowRight, Zap, Users, Palette } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">CTRL Studio</h1>
        <div className="flex gap-8 items-center">
          <Link href="/services" className="text-gray-300 hover:text-white transition">
            Services
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition">
            About
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-5xl sm:text-6xl font-bold leading-tight">
            Design & Development Studio
          </h2>
          <p className="text-xl text-gray-300 max-w-xl">
            We create beautiful, functional digital experiences that bring your vision to life. From branding to
            full-stack web applications.
          </p>
          <div className="flex gap-4 pt-4">
            <Link
              href="/portal"
              className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition flex items-center gap-2"
            >
              Client Portal
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 border border-gray-500 text-white rounded-lg hover:bg-gray-800 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-8 pt-20 border-t border-gray-800">
          <div>
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <p className="text-gray-400">Projects Completed</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">30+</div>
            <p className="text-gray-400">Happy Clients</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">10+</div>
            <p className="text-gray-400">Years Combined Experience</p>
          </div>
        </div>
      </div>

      {/* Services Preview */}
      <div className="bg-gray-800/50 mt-20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold mb-12">Our Services</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Palette className="text-blue-400" size={32} />
              <h4 className="text-xl font-bold">Branding & Design</h4>
              <p className="text-gray-300">
                Strategic brand identity and visual design that communicates your values and attracts your audience.
              </p>
            </div>
            <div className="space-y-4">
              <Zap className="text-blue-400" size={32} />
              <h4 className="text-xl font-bold">Web Development</h4>
              <p className="text-gray-300">
                Modern, responsive websites and web applications built with the latest technologies and best practices.
              </p>
            </div>
            <div className="space-y-4">
              <Users className="text-blue-400" size={32} />
              <h4 className="text-xl font-bold">Consulting</h4>
              <p className="text-gray-300">
                Strategic guidance on your digital transformation, technology stack, and business objectives.
              </p>
            </div>
          </div>
          <Link
            href="/services"
            className="inline-block mt-12 px-6 py-3 border border-gray-500 text-white rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
          >
            View All Services
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-4xl font-bold">Ready to Start Your Project?</h3>
          <p className="text-xl text-blue-100">
            Get in touch with our team to discuss how we can help bring your vision to reality.
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition"
          >
            Send Your Brief
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 mt-20">
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
