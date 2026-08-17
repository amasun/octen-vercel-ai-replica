import React, { useState } from 'react';
import { Terminal, Copy, Check, Sparkles, ArrowRight, Code2, Cpu, ExternalLink } from 'lucide-react';

interface CodeSample {
  id: string;
  label: string;
  lang: string;
  code: string;
}

const CODE_SAMPLES: CodeSample[] = [
  {
    id: 'cli',
    label: 'Claude Code CLI',
    lang: 'bash',
    code: `npx skills add Octen-Team/octen-skills -a claude-code`
  },
  {
    id: 'python',
    label: 'Python SDK',
    lang: 'python',
    code: `from octen import OctenClient

client = OctenClient(api_key="octen_sk_live_...")

response = client.search(
    query="What are AI agents actually being used for in production?",
    search_depth="broad",
    max_results=20
)

print(response.structured_answer)
print(f"Latency: {response.latency_ms}ms")`
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    lang: 'typescript',
    code: `import { Octen } from '@octen/sdk';

const octen = new Octen({ apiKey: process.env.OCTEN_API_KEY });

const result = await octen.search({
  query: "Safest ways to invest in 2026",
  mode: "deep_research"
});

console.log(result.data);`
  },
  {
    id: 'curl',
    label: 'cURL API',
    lang: 'bash',
    code: `curl -X POST https://api.octen.ai/v1/search \\
  -H "Authorization: Bearer octen_sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"query": "Latest LLM benchmarks", "latency": "ultra_low"}'`
  },
  {
    id: 'mcp',
    label: 'MCP Server',
    lang: 'json',
    code: `{
  "mcpServers": {
    "octen-search": {
      "command": "npx",
      "args": ["-y", "@octen/mcp-server"],
      "env": {
        "OCTEN_API_KEY": "octen_sk_live_..."
      }
    }
  }
}`
  }
];

export const QuickstartSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CodeSample>(CODE_SAMPLES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="quickstart" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 56px' }}>
          <div className="pill-badge" style={{ marginBottom: '16px' }}>
            <Terminal size={14} color="#60ff70" />
            <span>Developer Onboarding</span>
          </div>
          <h2>
            Get Started <span className="text-gradient">In Minutes</span>
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--text-muted)', marginTop: '12px' }}>
            Search infrastructure for agents. Ready in 3 simple steps.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}
        >
          <div className="card-glass">
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#60ff70', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
              STEP 01
            </div>
            <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '8px' }}>Get your API Key</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Create a free developer account and start building instantly with zero friction.
            </p>
            <a href="https://octen.ai/platform/api-keys" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              <span>Get API key</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="card-glass">
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#60ff70', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
              STEP 02
            </div>
            <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '8px' }}>Make First Request</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Fast, structured responses via REST API or high-performance Python / TS SDKs.
            </p>
            <a href="https://docs.octen.ai/api-reference/search" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              <span>API & SDK Docs</span>
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="card-glass">
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#60ff70', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
              STEP 03
            </div>
            <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '8px' }}>Connect to Agent</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Provide your LLM agent with live, grounded real-time web intelligence via MCP or Skills.
            </p>
            <a href="https://docs.octen.ai/overview/quickstart" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              <span>Integration Guide</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Code Snippet Container */}
        <div className="card-glass" style={{ maxWidth: '1000px', margin: '0 auto', padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code2 size={18} color="#60ff70" />
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>Built with Skills, MCP & CLI</span>
            </div>

            {/* Language Selector Buttons */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {CODE_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => setActiveTab(sample)}
                  style={{
                    backgroundColor: activeTab.id === sample.id ? 'rgba(96, 255, 112, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    border: activeTab.id === sample.id ? '1px solid #60ff70' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: activeTab.id === sample.id ? '#60ff70' : 'var(--text-muted)',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12.5px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Code Window */}
          <div className="code-window">
            <div className="code-header">
              <div className="code-dots">
                <div className="code-dot red" />
                <div className="code-dot yellow" />
                <div className="code-dot green" />
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{activeTab.label} snippet</span>
              <button
                onClick={handleCopy}
                style={{
                  background: 'none',
                  border: 'none',
                  color: copied ? '#60ff70' : 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px'
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <pre style={{ padding: '20px', margin: 0, overflowX: 'auto', color: '#e2e8f0', lineHeight: '1.6' }}>
              <code>{activeTab.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
