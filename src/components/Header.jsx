import React from 'react';
import { MessageCircle, Menu } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
    return (
        <header className="bg-white border-b px-4 md:px-6 py-4 flex items-center justify-between flex-shrink-0 z-20 relative">
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleSidebar}
                    className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <Menu size={24} />
                </button>
                <div className="bg-blue-600 text-white p-2 rounded-lg hidden md:block">
                    <MessageCircle size={24} />
                </div>
                <div>
                    <h1 className="text-lg md:text-xl font-bold text-gray-800">PolicyPal AI</h1>
                    <p className="text-xs md:text-sm text-gray-500">Your intelligent insurance assistant</p>
                </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium text-xs md:text-sm">Prototype</span>
            </div>
        </header>
    );
};

export default Header;
