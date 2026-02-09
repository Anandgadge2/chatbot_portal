'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Globe } from 'lucide-react';

export default memo(function ApiCallNode({ data, selected }: NodeProps) {
  const method = (data as any).method || 'GET';
  const endpoint = (data as any).endpoint || '';

  const methodColors: Record<string, string> = {
    GET: 'bg-blue-100 text-blue-700 border-blue-300',
    POST: 'bg-green-100 text-green-700 border-green-300',
    PUT: 'bg-orange-100 text-orange-700 border-orange-300',
    DELETE: 'bg-red-100 text-red-700 border-red-300',
  };

  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-lg bg-white border-2 min-w-[200px] max-w-[300px] ${
        selected ? 'border-green-500' : 'border-green-200'
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-green-500" />
      
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-green-100 rounded">
          <Globe className="w-4 h-4 text-green-600" />
        </div>
        <div className="font-semibold text-sm text-gray-900">{data.label}</div>
      </div>
      
      <div className="space-y-1.5">
        <div className={`text-xs font-bold px-2 py-1 rounded border ${methodColors[method]}`}>
          {method}
        </div>
        {endpoint && (
          <div className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1.5 font-mono break-all">
            {endpoint}
          </div>
        )}
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-green-500" />
    </div>
  );
});
