import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">AI Chat</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button variant="outline">
              <Link
                className="flex items-center"
                href="https://github.com/lokeswaran-aj/ai-next-langgraph"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
                <span className="ml-2">Github</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
