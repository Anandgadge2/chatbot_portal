'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { StopCircle } from 'lucide-react';

export default memo(function EndNode({ data, selected }: NodeProps) {
  const endMessage = (data as any).endMessage || '';

  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-lg bg-white border-2 min-w-[200px] max-w-[300px] ${
        selected ? 'border-red-500' : 'border-red-200'
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-red-500" />
      
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-red-100 rounded">
          <StopCircle className="w-4 h-4 text-red-600" />
        </div>
        <div className="font-semibold text-sm text-gray-900">{data.label}</div>
      </div>
      
      {endMessage && (
        <div className="text-xs text-gray-600 bg-red-50 border border-red-200 p-2 rounded">
          {endMessage.length > 50 ? endMessage.substring(0, 50) + '...' : endMessage}
        </div>
      )}
    </div>
  );
});
