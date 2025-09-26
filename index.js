npm install react lucide-react;
import React, { useState } from 'react';
import { Send, Copy, CheckCircle, Sparkles, Mail, MessageSquare, Palette } from 'lucide-react';

const EmailWriterApp = () => {
  const [rawThoughts, setRawThoughts] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [replyToEmail, setReplyToEmail] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showReplySection, setShowReplySection] = useState(false);

  const tones = [
    { id: 'professional', label: 'Professional', description: 'Formal and business-like', color: 'from-blue-500 to-blue-600' },
    { id: 'warm', label: 'Warm', description: 'Friendly and personable', color: 'from-green-500 to-green-600' },
    { id: 'concise', label: 'Concise', description: 'Brief and to the point', color: 'from-slate-500 to-slate-600' },
    { id: 'casual', label: 'Casual', description: 'Relaxed and informal', color: 'from-teal-500 to-teal-600' },
    { id: 'persuasive', label: 'Persuasive', description: 'Compelling and convincing', color: 'from-indigo-500 to-indigo-600' },
    { id: 'apologetic', label: 'Apologetic', description: 'Understanding and regretful', color: 'from-blue-400 to-blue-500' }
  ];

  const generateEmail = async () => {
    if (!rawThoughts.trim() || !selectedTone) return;

    setIsGenerating(true);
    
    // Simulate API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response - in a real app, this would call the Claude API
    const mockEmail = `Subject: ${generateSubject()}

Dear [Recipient],

${generateEmailBody()}

Best regards,
[Your Name]`;

    setGeneratedEmail(mockEmail);
    setIsGenerating(false);
  };

  const generateSubject = () => {
    const subjects = [
      'Follow-up on our conversation',
      'Quick question regarding the project',
      'Update on current status',
      'Meeting request',
      'Thank you for your time'
    ];
    return subjects[Math.floor(Math.random() * subjects.length)];
  };

  const generateEmailBody = () => {
    const selectedToneData = tones.find(t => t.id === selectedTone);
    const toneAdjective = selectedToneData?.label.toLowerCase() || 'professional';
    
    return `I hope this message finds you well. ${rawThoughts}

${replyToEmail ? 'Thank you for your previous email. ' : ''}I wanted to reach out with a ${toneAdjective} approach to ensure we're aligned on next steps.

Please let me know if you have any questions or if there's anything else I can help clarify.`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Brianielsug Email AI Writer
              </h1>
            </div>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto">
              Transform your thoughts into polished, professional emails with Brianielsug AI assistance.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold text-slate-800">What do you want to say?</h2>
              </div>
              <textarea
                value={rawThoughts}
                onChange={(e) => setRawThoughts(e.target.value)}
                placeholder="Jot down your main thoughts... e.g., 'Need to follow up on the project timeline and ask about budget approval'"
                className="w-full h-32 p-4 border border-slate-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-200 bg-white/50"
              />
            </div>

            {/* Reply To Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Replying to an email?</h3>
                <button
                  onClick={() => setShowReplySection(!showReplySection)}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {showReplySection ? 'Hide' : 'Show'}
                </button>
              </div>
              {showReplySection && (
                <textarea
                  value={replyToEmail}
                  onChange={(e) => setReplyToEmail(e.target.value)}
                  placeholder="Paste the original email here (optional)..."
                  className="w-full h-24 p-4 border border-slate-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 bg-white/50"
                />
              )}
            </div>

            {/* Tone Selection */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-slate-800">Choose your tone</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {tones.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setSelectedTone(tone.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left group ${
                      selectedTone === tone.id
                        ? 'border-green-500 bg-green-50/50 shadow-md'
                        : 'border-slate-200 bg-white/30 hover:border-slate-300 hover:bg-white/50'
                    }`}
                  >
                    <div className={`w-8 h-2 rounded-full bg-gradient-to-r ${tone.color} mb-2`}></div>
                    <div className="font-medium text-slate-800">{tone.label}</div>
                    <div className="text-sm text-slate-500">{tone.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateEmail}
              disabled={!rawThoughts.trim() || !selectedTone || isGenerating}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Crafting your email...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Generate Email
                </>
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg overflow-hidden">
              <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50 to-blue-50/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-800">Your polished email</h2>
                  {generatedEmail && (
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 text-sm bg-white/80 border border-slate-300 rounded-lg hover:bg-white transition-all duration-200"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-600" />
                          Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
              <div className="p-6">
                {generatedEmail ? (
                  <div className="space-y-4">
                    <pre className="whitespace-pre-wrap text-slate-700 leading-relaxed font-mono text-sm bg-slate-50/50 p-4 rounded-lg border border-slate-200/50">
                      {generatedEmail}
                    </pre>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                    <Mail className="w-12 h-12 mb-4 opacity-50" />
                    <p className="text-center">
                      Your beautifully crafted email will appear here once generated
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200/50">
              <h3 className="font-semibold text-slate-800 mb-3">💡 Pro Tips</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Be specific about your main objective</li>
                <li>• Include context about relationships or previous interactions</li>
                <li>• Mention any deadlines or urgency</li>
                <li>• The AI will handle grammar, structure, and tone</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-white/80 backdrop-blur-sm border-t border-slate-200/50">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="text-center text-sm text-slate-600">
            © 2025 Brianielsug. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmailWriterApp;
