import React from 'react';
import { FileText, Send, AlertCircle, Loader2 } from 'lucide-react';

const ChatView = ({ messages, inputMessage, setInputMessage, handleSendMessage, isLoading, error, validationError }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'} rounded-lg p-4`}>
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                            {msg.citations && msg.citations.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-gray-300 space-y-1">
                                    <p className="text-xs font-semibold text-gray-600">Sources:</p>
                                    {msg.citations.map((citation, i) => (
                                        <div key={i} className="text-xs text-gray-600 flex items-center gap-1">
                                            <FileText size={12} />
                                            <span>{citation}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-2 text-gray-500">
                            <Loader2 size={16} className="animate-spin" />
                            <span className="text-sm">Thinking...</span>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="flex justify-center">
                        <div className="bg-red-50 text-red-600 rounded-lg p-3 flex items-center gap-2 text-sm border border-red-200">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    </div>
                )}
            </div>

            <div className="border-t bg-white p-4">
                <div className="flex flex-col gap-2">
                    {validationError && (
                        <p className="text-red-500 text-xs ml-1">{validationError}</p>
                    )}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                            placeholder="Ask a question about your policy..."
                            disabled={isLoading}
                            className={`flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${validationError ? 'border-red-300 focus:ring-red-200' : ''} ${isLoading ? 'bg-gray-50' : ''}`}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isLoading || !inputMessage.trim()}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatView;
