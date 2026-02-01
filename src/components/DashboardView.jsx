import React from 'react';
import { MessageCircle, TrendingUp, Users, Clock, ThumbsUp } from 'lucide-react';

const DashboardView = () => {
    return (
        <div className="p-6 h-full overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <MessageCircle size={24} />
                        <TrendingUp size={20} className="opacity-75" />
                    </div>
                    <p className="text-3xl font-bold">1,247</p>
                    <p className="text-sm opacity-90">Total Queries</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <Users size={24} />
                        <TrendingUp size={20} className="opacity-75" />
                    </div>
                    <p className="text-3xl font-bold">423</p>
                    <p className="text-sm opacity-90">Active Users</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <Clock size={24} />
                        <TrendingUp size={20} className="opacity-75" />
                    </div>
                    <p className="text-3xl font-bold">2.3m</p>
                    <p className="text-sm opacity-90">Avg Response Time</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <ThumbsUp size={24} />
                        <TrendingUp size={20} className="opacity-75" />
                    </div>
                    <p className="text-3xl font-bold">94%</p>
                    <p className="text-sm opacity-90">Satisfaction Rate</p>
                </div>
            </div>

            <div className="bg-white rounded-lg border p-6 mb-6">
                <h3 className="font-semibold mb-4">Top Questions This Week</h3>
                <div className="space-y-3">
                    {[
                        { question: 'How do I file a claim?', count: 89 },
                        { question: 'What is my coverage amount?', count: 67 },
                        { question: 'How do I change my beneficiary?', count: 54 },
                        { question: 'What is my deductible?', count: 43 },
                        { question: 'When is my premium due?', count: 38 }
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">{item.question}</span>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-lg border p-6">
                <h3 className="font-semibold mb-4">Usage Trend</h3>
                <div className="h-48 flex items-end justify-between gap-2">
                    {[65, 78, 85, 72, 95, 88, 92].map((height, idx) => (
                        <div key={idx} className="flex-1 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors" style={{ height: `${height}%` }}></div>
                    ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
