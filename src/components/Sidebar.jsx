import React from 'react';
import { MessageCircle, Upload, BarChart3, FileText, X } from 'lucide-react';

const Sidebar = ({ activeView, setActiveView, uploadedFiles, isOpen, onClose }) => {
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <nav className={`
        absolute md:relative z-30 h-full bg-white border-r p-4 flex flex-col w-64 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
                <div className="md:hidden flex justify-end mb-4">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-2">
                    <button
                        onClick={() => setActiveView('chat')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeView === 'chat' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <MessageCircle size={20} />
                        <span className="font-medium">Chat Assistant</span>
                    </button>

                    <button
                        onClick={() => setActiveView('documents')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeView === 'documents' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <Upload size={20} />
                        <span className="font-medium">Documents</span>
                    </button>

                    <button
                        onClick={() => setActiveView('dashboard')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeView === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <BarChart3 size={20} />
                        <span className="font-medium">Dashboard</span>
                    </button>
                </div>

                {uploadedFiles.length > 0 && activeView === 'chat' && (
                    <div className="mt-8 pt-6 border-t">
                        <p className="text-xs font-semibold text-gray-500 mb-2">ACTIVE DOCUMENTS</p>
                        <div className="space-y-1 overflow-y-auto">
                            {uploadedFiles.map(file => (
                                <div key={file.id} className="text-xs text-gray-600 flex items-center gap-2 p-2 bg-gray-50 rounded group relative">
                                    <FileText size={14} className="flex-shrink-0" />
                                    <span className="truncate flex-1">{file.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Sidebar;
