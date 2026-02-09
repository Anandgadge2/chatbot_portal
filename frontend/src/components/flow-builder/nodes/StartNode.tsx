'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Play } from 'lucide-react';

export default memo(function StartNode({ data, selected }: NodeProps) {
  const trigger = (data as any).trigger || 'hi';
  const triggerType = (data as any).triggerType || 'keyword';

  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border-2 min-w-[200px] max-w-[300px] ${
        selected ? 'border-green-500' : 'border-green-300'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-green-500 rounded">
          <Play className="w-4 h-4 text-white" />
        </div>
        <div className="font-semibold text-sm text-gray-900">{data.label}</div>
      </div>
      
      <div className="text-xs bg-white border border-green-200 rounded px-2 py-1.5">
        <div className="font-medium text-green-700">Trigger: {trigger}</div>
        <div className="text-gray-600">Type: {triggerType}</div>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-green-500" />
    </div>
  );
});
