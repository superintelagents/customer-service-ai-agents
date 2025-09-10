import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Customer Service AI Agent Network | SuperIntelAgents.ai Case Study',
  description: 'Demonstration of powerful customer service AI agent network with specialized agents for knowledge base, ticket management, and escalation handling.',
  keywords: ['AI agents', 'customer service', 'multi-agent system', 'superintelagents'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        {children}
      </body>
    </html>
  )
}