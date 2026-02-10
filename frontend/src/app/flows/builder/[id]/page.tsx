'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FlowCanvas from '@/components/flow-builder/FlowCanvas';
import { Toaster, toast } from 'react-hot-toast';
import { ArrowLeft, Save } from 'lucide-react';
import { FlowNode, FlowEdge } from '@/types/flowTypes';

export default function FlowBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const flowId = params.id as string;
  const isNewFlow = flowId === 'new';
  
  const [flowName, setFlowName] = useState('Untitled Flow');
  const [saving, setSaving] = useState(false);
  const [initialNodes, setInitialNodes] = useState<FlowNode[]>([]);
  const [initialEdges, setInitialEdges] = useState<FlowEdge[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isNewFlow) {
      loadFlow(flowId);
    } else {
      setLoaded(true);
    }
  }, [flowId, isNewFlow]);

  const loadFlow = async (id: string) => {
    try {
      // TODO: Load flow from API
      // const response = await fetch(`/api/flows/${id}`);
      // const data = await response.json();
      // setFlowName(data.name);
      // setInitialNodes(data.nodes);
      // setInitialEdges(data.edges);
      
      // Mock data for now
      setFlowName('Untitled');
      setInitialNodes([]);
      setInitialEdges([]);
      setLoaded(true);
    } catch (error) {
      console.error('Failed to load flow:', error);
      toast.error('Failed to load flow');
      setLoaded(true);
    }
  };

  const handleSave = (nodes: FlowNode[], edges: FlowEdge[]) => {
    setSaving(true);
    
    const flowData = {
      name: flowName,
      nodes,
      edges,
    };

    // Simulate API call
    setTimeout(async () => {
      try {
        if (isNewFlow) {
          // Create new flow
          // const response = await fetch('/api/flows', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(flowData),
          // });
          // const newFlow = await response.json();
          // router.push(`/flows/builder/${newFlow._id}`);
          toast.success('Flow created successfully');
        } else {
          // Update existing flow
          // await fetch(`/api/flows/${flowId}`, {
          //   method: 'PUT',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(flowData),
          // });
          toast.success('Flow saved successfully');
        }
      } catch (error) {
        console.error('Failed to save flow:', error);
        toast.error('Failed to save flow');
      } finally {
        setSaving(false);
      }
    }, 500);
  };

  const handleSaveClick = () => {
    // Trigger save event that FlowCanvas listens to
    window.dispatchEvent(new CustomEvent('flow:save'));
  };

  // Listen for flow data from canvas
  useEffect(() => {
    const handleFlowData = (event: any) => {
      const { nodes, edges } = event.detail;
      handleSave(nodes, edges);
    };

    window.addEventListener('flow:data', handleFlowData);
    return () => window.removeEventListener('flow:data', handleFlowData);
  }, [flowName, flowId, isNewFlow]);

  const handleBack = () => {
    if (confirm('Are you sure you want to leave? Any unsaved changes will be lost.')) {
      router.push('/flows');
    }
  };

  if (!loaded) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading flow...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="h-screen w-full flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Flows
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <input
              type="text"
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              className="text-lg font-semibold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2"
              placeholder="Flow name..."
            />
          </div>
          <button
            onClick={handleSaveClick}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Flow'}
          </button>
        </div>

        {/* Canvas */}
        <div className="flex-1">
          <FlowCanvas 
            initialNodes={initialNodes}
            initialEdges={initialEdges}
          />
        </div>
      </div>
    </>
  );
}
