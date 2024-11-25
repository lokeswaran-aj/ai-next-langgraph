import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-4 justify-center h-screen">
      <Button asChild>
        <Link href="/stream-tool-call">Stream Tool Call</Link>
      </Button>
      <Button asChild>
        <Link href="/stream-text">Stream Text</Link>
      </Button>
      <Button asChild>
        <Link href="/generate-text">Generate Text</Link>
      </Button>
    </div>
  )
}
