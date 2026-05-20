import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AboutPage() {
  const team = [
    {
      name: 'Creative Director',
      role: 'Design & Strategy',
      bio: 'Led design initiatives for 20+ successful projects with a focus on user-centered solutions.',
    },
    {
      name: 'Lead Developer',
      role: 'Full-Stack Development',
      bio: 'Expert in modern web technologies with expertise in scalable architecture and performance.',
    },
    {
      name: 'Project Manager',
      role: 'Client Relations',
      bio: 'Ensures projects are delivered on time and exceed expectations through effective communication.',
    },
    {
      name: 'UX Specialist',
      role: 'User Experience',
      bio: 'Passionate about creating intuitive interfaces that delight users and drive business results.',
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
        <h1 className="text-5xl font-bold">About CTRL Studio</h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          We're a team of designers and developers passionate about creating digital experiences that matter.
        </p>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">Our Story</h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
            CTRL Studio was founded with a simple mission: to create beautiful, functional digital experiences that
            solve real problems for our clients. With over a decade of combined experience in design and development, we
            bring creativity, strategy, and technical expertise to every project.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
            We believe that great digital products come from understanding our clients' vision, their audience, and the
            unique challenges they face. That's why we invest time upfront in discovery and strategy to ensure every
            project is built on a solid foundation.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-800/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-blue-400">Excellence</h3>
              <p className="text-gray-300">
                We pursue excellence in everything we do, from the smallest detail to the overall strategy.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-blue-400">Collaboration</h3>
              <p className="text-gray-300">
                We work closely with our clients to ensure their vision is realized and their goals are met.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-blue-400">Innovation</h3>
              <p className="text-gray-300">
                We stay on the cutting edge of technology and design trends to provide innovative solutions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        <div>
          <h2 className="text-4xl font-bold mb-8">Meet Our Team</h2>
          <p className="text-lg text-gray-300 max-w-2xl mb-12">
            We're a diverse team of talented individuals united by a passion for great work and client success.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 space-y-4">
              <div>
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <p className="text-blue-400">{member.role}</p>
              </div>
              <p className="text-gray-300">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <p className="text-blue-100">Years in Business</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <p className="text-blue-100">Projects Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">30+</div>
              <p className="text-blue-100">Happy Clients</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-blue-100">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <h2 className="text-4xl font-bold">Let's Create Something Great</h2>
        <p className="text-xl text-gray-300">
          Ready to work with a team that truly cares about your success?
        </p>
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
