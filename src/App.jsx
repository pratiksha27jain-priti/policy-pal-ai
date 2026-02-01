import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatView from './components/ChatView';
import DocumentsView from './components/DocumentsView';
import DashboardView from './components/DashboardView';
import { simulatedResponses } from './data/simulatedResponses';

function App() {
  // Initialize state from localStorage or default
  const [activeView, setActiveView] = useState(() => localStorage.getItem('policy-pal-view') || 'chat');

  const [uploadedFiles, setUploadedFiles] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('policy-pal-files') || '[]');
    } catch {
      return [];
    }
  });

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('policy-pal-messages');
      return saved ? JSON.parse(saved) : [
        { role: 'assistant', content: 'Hello! I\'m PolicyPal AI. Upload your policy documents and ask me anything about your coverage, benefits, or claims process.', citations: [] }
      ];
    } catch {
      return [
        { role: 'assistant', content: 'Hello! I\'m PolicyPal AI. Upload your policy documents and ask me anything about your coverage, benefits, or claims process.', citations: [] }
      ];
    }
  });

  const [inputMessage, setInputMessage] = useState('');

  // Loading & Error States
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);
  const [chatValidationError, setChatValidationError] = useState(null);
  const [uploadingStatus, setUploadingStatus] = useState({ isUploading: false, error: null });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('policy-pal-view', activeView);
  }, [activeView]);

  useEffect(() => {
    localStorage.setItem('policy-pal-files', JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  useEffect(() => {
    localStorage.setItem('policy-pal-messages', JSON.stringify(messages));
  }, [messages]);

  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingStatus({ isUploading: true, error: null });

    // Simulate upload delay
    setTimeout(() => {
      const newFiles = [];
      let error = null;

      for (const file of files) {
        // Validation: PDF only
        if (file.type !== 'application/pdf') {
          error = `File "${file.name}" is not a PDF. Please upload only PDF documents.`;
          break;
        }
        // Validation: Max 5MB
        if (file.size > 5 * 1024 * 1024) {
          error = `File "${file.name}" is too large (max 5MB).`;
          break;
        }
        // Validation: Duplicate check
        if (uploadedFiles.some(f => f.name === file.name)) {
          error = `File "${file.name}" is already uploaded.`;
          break;
        }

        newFiles.push({
          name: file.name,
          size: (file.size / 1024).toFixed(2) + ' KB',
          id: Date.now() + Math.random()
        });
      }

      if (error) {
        setUploadingStatus({ isUploading: false, error });
        // Clear error after 5 seconds
        setTimeout(() => setUploadingStatus(prev => ({ ...prev, error: null })), 5000);
        return;
      }

      setUploadedFiles(prev => [...prev, ...newFiles]);
      setUploadingStatus({ isUploading: false, error: null });

      // Add confirmation message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I've received your document "${newFiles[0].name}". I'm ready to answer questions about your policy!`,
        citations: []
      }]);
    }, 1500);
  };

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter(f => f.id !== id));
  };

  const handleSendMessage = () => {
    // Validation
    if (!inputMessage.trim()) {
      return;
    }
    if (inputMessage.length > 500) {
      setChatValidationError('Message cannot exceed 500 characters.');
      return;
    }
    setChatValidationError(null);
    setChatError(null);

    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsChatLoading(true);

    // Find matching response
    let response = simulatedResponses.default;
    const lowerInput = inputMessage.toLowerCase();

    for (const [key, value] of Object.entries(simulatedResponses)) {
      if (lowerInput.includes(key)) {
        response = value;
        break;
      }
    }

    // Simulate network delay and occasional error
    setTimeout(() => {
      // Simulate random error (5% chance)
      if (Math.random() < 0.05) {
        setIsChatLoading(false);
        setChatError('Sorry, I encountered a temporary issue connecting to the Policy Engine. Please try again.');
        return;
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.answer,
        citations: response.citations
      }]);
      setIsChatLoading(false);
    }, 1200);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Header toggleSidebar={toggleMobileSidebar} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          activeView={activeView}
          setActiveView={(view) => { setActiveView(view); setIsMobileSidebarOpen(false); }}
          uploadedFiles={uploadedFiles}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
        <main className="flex-1 overflow-hidden bg-white w-full">
          {activeView === 'chat' && (
            <ChatView
              messages={messages}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
              isLoading={isChatLoading}
              error={chatError}
              validationError={chatValidationError}
            />
          )}
          {activeView === 'documents' && (
            <DocumentsView
              uploadedFiles={uploadedFiles}
              handleFileUpload={handleFileUpload}
              removeFile={removeFile}
              uploadingStatus={uploadingStatus}
            />
          )}
          {activeView === 'dashboard' && <DashboardView />}
        </main>
      </div>
    </div>
  );
}

export default App;
