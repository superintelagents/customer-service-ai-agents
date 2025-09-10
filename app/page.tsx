'use client'

import { useState } from 'react'
import { 
  MessageSquare, 
  Bot, 
  Search, 
  FileText, 
  AlertTriangle, 
  Phone, 
  Database,
  Cloud,
  Zap,
  CheckCircle,
  Clock,
  User,
  Settings,
  Activity
} from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'agent'
  timestamp: Date
  agentType?: string
  actions?: string[]
}

interface AgentActivity {
  agent: string
  action: string
  timestamp: Date
  status: 'running' | 'completed' | 'failed'
  details?: string
}

export default function CustomerServiceDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI Customer Service Network. How can I help you today?',
      sender: 'agent',
      timestamp: new Date(),
      agentType: 'orchestrator'
    }
  ])
  const [input, setInput] = useState('')
  const [agentActivities, setAgentActivities] = useState<AgentActivity[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const specializedAgents = [
    {
      name: 'Knowledge Base Agent',
      icon: Search,
      color: 'text-blue-400',
      capabilities: ['Search documentation', 'Retrieve FAQs', 'Find product info', 'Access policy data'],
      tools: ['Vector search', 'Full-text search', 'Semantic matching', 'Content ranking']
    },
    {
      name: 'Ticket Management Agent',
      icon: FileText,
      color: 'text-green-400',
      capabilities: ['Create tickets', 'Update status', 'Assign priority', 'Track resolution'],
      tools: ['CRM API calls', 'Database storage', 'Notification system', 'Status tracking']
    },
    {
      name: 'Escalation Agent',
      icon: AlertTriangle,
      color: 'text-red-400',
      capabilities: ['Detect urgency', 'Route to humans', 'Schedule callbacks', 'Priority handling'],
      tools: ['Sentiment analysis', 'Workflow automation', 'Calendar integration', 'Alert system']
    },
    {
      name: 'File Processing Agent',
      icon: Database,
      color: 'text-purple-400',
      capabilities: ['Process attachments', 'Store documents', 'Extract data', 'Generate reports'],
      tools: ['File storage', 'OCR processing', 'Data extraction', 'Report generation']
    },
    {
      name: 'Integration Agent',
      icon: Cloud,
      color: 'text-cyan-400',
      capabilities: ['API calls', 'External systems', 'Data sync', 'Third-party tools'],
      tools: ['REST/GraphQL APIs', 'Webhooks', 'Data transformation', 'Error handling']
    }
  ]

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsProcessing(true)

    // Simulate agent network processing
    await simulateAgentProcessing(input)
  }

  const simulateAgentProcessing = async (userInput: string) => {
    // Add orchestrator activity
    addAgentActivity('General Intelligence Agent', 'Analyzing request and routing to specialized agents', 'running')
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    addAgentActivity('General Intelligence Agent', 'Request analysis complete', 'completed')

    // Determine which agents to involve based on input
    const agentsToInvolve = determineAgents(userInput)
    
    // Process with specialized agents
    for (const agent of agentsToInvolve) {
      addAgentActivity(agent.name, agent.action, 'running')
      await new Promise(resolve => setTimeout(resolve, 1500))
      addAgentActivity(agent.name, agent.result, 'completed', agent.details)
    }

    // Generate response
    const response = generateResponse(userInput, agentsToInvolve)
    
    const agentMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response.content,
      sender: 'agent',
      timestamp: new Date(),
      agentType: 'orchestrator',
      actions: response.actions
    }

    setMessages(prev => [...prev, agentMessage])
    setIsProcessing(false)
  }

  const determineAgents = (input: string) => {
    const lower = input.toLowerCase()
    const agents = []

    if (lower.includes('refund') || lower.includes('policy') || lower.includes('how to')) {
      agents.push({
        name: 'Knowledge Base Agent',
        action: 'Searching knowledge base for relevant information',
        result: 'Retrieved 5 relevant articles and policy documents',
        details: 'Found refund policy, FAQ entries, and step-by-step guides'
      })
    }

    if (lower.includes('issue') || lower.includes('problem') || lower.includes('bug')) {
      agents.push({
        name: 'Ticket Management Agent',
        action: 'Creating support ticket with extracted details',
        result: 'Support ticket #CS-2025-001 created successfully',
        details: 'Ticket assigned to Technical Support team with high priority'
      })
    }

    if (lower.includes('urgent') || lower.includes('asap') || lower.includes('emergency')) {
      agents.push({
        name: 'Escalation Agent',
        action: 'Analyzing urgency level and routing appropriately',
        result: 'High priority case routed to senior support specialist',
        details: 'Callback scheduled within 2 hours, SMS notification sent'
      })
    }

    if (lower.includes('file') || lower.includes('document') || lower.includes('screenshot')) {
      agents.push({
        name: 'File Processing Agent',
        action: 'Processing uploaded attachments and extracting information',
        result: 'Document processed and relevant data extracted',
        details: '2 screenshots analyzed, error logs parsed, summary report generated'
      })
    }

    // Always include integration agent for external data
    agents.push({
      name: 'Integration Agent',
      action: 'Fetching customer data and account information',
      result: 'Customer profile and account history retrieved',
      details: 'Last 30 days activity, subscription status, and preferences loaded'
    })

    return agents
  }

  const generateResponse = (input: string, involvedAgents: any[]) => {
    const lower = input.toLowerCase()
    
    if (lower.includes('refund')) {
      return {
        content: `I've found your refund policy and processed your request. Based on our knowledge base search, you're eligible for a full refund within 30 days. I've created ticket #CS-2025-001 to track this request and retrieved your account information showing your purchase was made 15 days ago.

**Actions Taken:**
• Searched refund policies and FAQs
• Created support ticket #CS-2025-001
• Retrieved your account and purchase history
• Initiated refund process (3-5 business days)

Is there anything else you'd like to know about your refund?`,
        actions: ['Refund initiated', 'Ticket created', 'Customer notified']
      }
    }

    if (lower.includes('issue') || lower.includes('problem')) {
      return {
        content: `I understand you're experiencing an issue. I've analyzed your request and taken several actions to help resolve this quickly:

**What I've done:**
• Created support ticket #CS-2025-001 with all relevant details
• Retrieved your account history and recent activity
• Searched our knowledge base for similar issues and solutions
• Routed your case to our technical support team with high priority

**Next Steps:**
• You'll receive an email confirmation shortly
• A senior technical specialist will contact you within 2 hours
• We'll keep you updated on progress through SMS and email

Can you provide any additional details about when this issue first started?`,
        actions: ['Ticket created', 'Technical team notified', 'Follow-up scheduled']
      }
    }

    return {
      content: `I've processed your request using our multi-agent network. Here's what happened:

${involvedAgents.map(agent => `• **${agent.name}**: ${agent.result}`).join('\n')}

Based on this analysis, I'm ready to help you further. What specific action would you like me to take next?`,
      actions: involvedAgents.map(agent => agent.result.split(' ')[0])
    }
  }

  const addAgentActivity = (agent: string, action: string, status: 'running' | 'completed' | 'failed', details?: string) => {
    setAgentActivities(prev => [...prev, {
      agent,
      action,
      timestamp: new Date(),
      status,
      details
    }])
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Bot className="w-8 h-8 text-cyan-400" />
                <div>
                  <h1 className="text-xl font-semibold text-white">Customer Service AI Agent Network</h1>
                  <p className="text-sm text-gray-400">SuperIntelAgents.ai Case Study</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">All agents online</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl border border-gray-700">
              <div className="border-b border-gray-700 p-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  Live Customer Service Chat
                </h2>
                <p className="text-sm text-gray-400 mt-1">Powered by multi-agent AI network</p>
              </div>
              
              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-cyan-600 text-white' 
                        : 'bg-gray-700 text-gray-100'
                    }`}>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      {message.actions && (
                        <div className="mt-2 space-y-1">
                          {message.actions.map((action, idx) => (
                            <div key={idx} className="flex items-center gap-1 text-xs text-green-400">
                              <CheckCircle className="w-3 h-3" />
                              {action}
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="text-xs text-gray-400 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
                        <span>AI agents are processing your request...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input */}
              <div className="border-t border-gray-700 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about refunds, report an issue, or get help..."
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Agent Network Panel */}
          <div className="space-y-6">
            
            {/* Specialized Agents */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-cyan-400" />
                Specialized Agents
              </h3>
              <div className="space-y-4">
                {specializedAgents.map((agent, idx) => {
                  const Icon = agent.icon
                  return (
                    <div key={idx} className="p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-5 h-5 ${agent.color}`} />
                        <h4 className="font-medium text-white text-sm">{agent.name}</h4>
                      </div>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div><strong>Capabilities:</strong></div>
                        {agent.capabilities.slice(0, 2).map((cap, i) => (
                          <div key={i}>• {cap}</div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Real-time Activity */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Agent Activity Log
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {agentActivities.slice(-5).reverse().map((activity, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'running' ? 'bg-yellow-400 animate-pulse' :
                        activity.status === 'completed' ? 'bg-green-400' : 'bg-red-400'
                      }`}></div>
                      <span className="font-medium text-white">{activity.agent}</span>
                      <span className="text-gray-500">
                        {activity.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-gray-300 ml-4">{activity.action}</div>
                    {activity.details && (
                      <div className="text-gray-400 ml-4 mt-1">{activity.details}</div>
                    )}
                  </div>
                ))}
                {agentActivities.length === 0 && (
                  <div className="text-gray-500 text-center py-4">
                    No recent activity
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Agent Capabilities Overview */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Multi-Agent Network Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializedAgents.map((agent, idx) => {
              const Icon = agent.icon
              return (
                <div key={idx} className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className={`w-6 h-6 ${agent.color}`} />
                    <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Capabilities</h4>
                      <div className="space-y-1">
                        {agent.capabilities.map((cap, i) => (
                          <div key={i} className="text-sm text-gray-400 flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            {cap}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Tools & APIs</h4>
                      <div className="space-y-1">
                        {agent.tools.map((tool, i) => (
                          <div key={i} className="text-sm text-gray-400 flex items-center gap-2">
                            <Zap className="w-3 h-3 text-yellow-400" />
                            {tool}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="mt-12 bg-gray-800 rounded-xl border border-gray-700 p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Technical Architecture</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Single Endpoint Architecture</h3>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400">POST /handle-request</div>
                <div className="text-gray-400 mt-2">
                  {`{
  "message": "I need help with a refund",
  "context": {
    "customer_id": "12345",
    "session_id": "abc-123"
  }
}`}
                </div>
              </div>
              
              <h4 className="text-md font-medium text-white mt-6 mb-3">What Happens Behind the Scenes:</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>1. <strong>General Intelligence Agent</strong> analyzes the request</div>
                <div>2. <strong>Routes to appropriate specialized agents</strong></div>
                <div>3. <strong>Agents perform complex operations:</strong></div>
                <div className="ml-4 space-y-1 text-gray-400">
                  <div>• Knowledge Base Agent searches documentation</div>
                  <div>• Ticket Agent creates support tickets</div>
                  <div>• Integration Agent fetches customer data</div>
                  <div>• File Processing Agent handles attachments</div>
                </div>
                <div>4. <strong>Orchestrator coordinates responses</strong></div>
                <div>5. <strong>Single unified response returned</strong></div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Agent Capabilities</h3>
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <h4 className="font-medium text-cyan-400 mb-2">🌐 API Calls</h4>
                  <p className="text-sm text-gray-400">Connect to CRM systems, ticketing platforms, knowledge bases, and external services</p>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4">
                  <h4 className="font-medium text-green-400 mb-2">💾 Data Storage</h4>
                  <p className="text-sm text-gray-400">Store customer interactions, file attachments, conversation history, and context</p>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4">
                  <h4 className="font-medium text-purple-400 mb-2">⚡ Compute Operations</h4>
                  <p className="text-sm text-gray-400">Process documents, analyze sentiment, extract data, and generate reports</p>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4">
                  <h4 className="font-medium text-orange-400 mb-2">🔄 Workflow Automation</h4>
                  <p className="text-sm text-gray-400">Create tickets, send notifications, schedule callbacks, and route escalations</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a 
              href="https://superintelagents.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors"
            >
              <Bot className="w-5 h-5" />
              Build Your Own Agent Network
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}