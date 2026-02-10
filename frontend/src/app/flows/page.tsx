'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, Edit, Copy, Trash2, MoreVertical } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

interface Flow {
  _id: string;
  name: string;
  description?: string;
  createdBy: {
    _id: string;
    name: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function FlowsPage() {
  const router = useRouter();
  const [flows, setFlows] = useState<Flow[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'your-flows' | 'templates'>('your-flows');

  useEffect(() => {
    fetchFlows();
  }, []);

  const fetchFlows = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await fetch('/api/flows');
      // const data = await response.json();
      
      // Mock data for now
      const mockFlows: Flow[] = [
        {
          _id: '1',
          name: 'Untitled',
          createdBy: { _id: 'user1', name: 'mukund' },
          isActive: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          _id: '2',
          name: 'Untitled',
          createdBy: { _id: 'user1', name: 'mukund' },
          isActive: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      
      setFlows(mockFlows);
    } catch (error) {
      console.error('Failed to fetch flows:', error);
      toast.error('Failed to load flows');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFlow = () => {
    router.push('/flows/builder/new');
  };

  const handleEditFlow = (flowId: string) => {
    router.push(`/flows/builder/${flowId}`);
  };

  const handleDuplicateFlow = async (flowId: string) => {
    try {
      // TODO: API call to duplicate
      toast.success('Flow duplicated successfully');
      fetchFlows();
    } catch (error) {
      toast.error('Failed to duplicate flow');
    }
  };

  const handleDeleteFlow = async (flowId: string) => {
    if (!confirm('Are you sure you want to delete this flow?')) return;
    
    try {
      // TODO: API call to delete
      toast.success('Flow deleted successfully');
      setFlows(flows.filter(f => f._id !== flowId));
    } catch (error) {
      toast.error('Failed to delete flow');
    }
  };

  const handleToggleStatus = async (flowId: string, currentStatus: boolean) => {
    try {
      // TODO: API call to toggle status
      setFlows(flows.map(f => 
        f._id === flowId ? { ...f, isActive: !currentStatus } : f
      ));
      toast.success(`Flow ${!currentStatus ? 'activated' : 'deactivated'}`);
    } catch (error) {
      toast.error('Failed to update flow status');
    }
  };

  const filteredFlows = flows.filter(flow =>
    flow.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex h-screen bg-gray-50">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Flows</h2>
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-teal-600 bg-teal-50 rounded-lg">
              <span className="text-lg">🔄</span>
              Flow Builder
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              <span className="text-lg">⚙️</span>
              Global Attributes
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              <span className="text-lg">📋</span>
              Manage Catalogues
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              <span className="text-lg">🛍️</span>
              Products
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              <span className="text-lg">🔗</span>
              Connect Catalogue
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Flow Builder</h1>
            </div>

            {/* Quick Guide */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Quick Guide</h3>
              <p className="text-xs text-gray-600 mb-3">
                You can connect with facebook to fetch catalogue and manage it from our platform.
              </p>
              <div className="flex gap-4 text-xs">
                <a href="#" className="flex items-center gap-1 text-blue-600 hover:underline">
                  <span>📘</span> How to create a catalogue in Commerce Manager?
                </a>
                <a href="#" className="flex items-center gap-1 text-blue-600 hover:underline">
                  <span>🛍️</span> How to manage your Meta catalogue with Shopify?
                </a>
              </div>
            </div>

            {/* Quota and Create Button */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                  <span className="text-xs text-gray-600">Total Quota</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{flows.length}</span>
                    <span className="text-sm text-gray-600">Flows</span>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 transition-colors">
                  Purchase more flows
                </button>
              </div>
              <button
                onClick={handleCreateFlow}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Flow
              </button>
            </div>

            {/* Search and Tabs */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by flow name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('your-flows')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'your-flows'
                      ? 'border-teal-600 text-teal-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🔄</span> Your Flows
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('templates')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'templates'
                      ? 'border-teal-600 text-teal-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>📄</span> Templates
                    <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">NEW</span>
                  </span>
                </button>
              </div>

              {/* Table */}
              {loading ? (
                <div className="p-8 text-center text-gray-500">Loading flows...</div>
              ) : filteredFlows.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  {searchQuery ? 'No flows found matching your search' : 'No flows yet. Create your first flow!'}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Flow Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Created By
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredFlows.map((flow) => (
                        <tr key={flow._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleEditFlow(flow._id)}
                              className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {flow.name}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {flow.createdBy.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={flow.isActive}
                                onChange={() => handleToggleStatus(flow._id, flow.isActive)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                            </label>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDuplicateFlow(flow._id)}
                                className="p-1.5 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors"
                                title="Duplicate"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleEditFlow(flow._id)}
                                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteFlow(flow._id)}
                                className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {filteredFlows.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    1-2 of 2
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                      <span>‹</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                      <span>›</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
