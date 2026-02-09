'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Clock } from 'lucide-react';

export default memo(function DelayNode({ data, selected }: NodeProps) {
  const duration = (data as any).duration || 5;
  const unit = (data as any).unit || 'seconds';

  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-lg bg-white border-2 min-w-[200px] max-w-[250px] ${
        selected ? 'border-orange-500' : 'border-orange-200'
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-orange-500" />
      
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-orange-100 rounded">
          <Clock className="w-4 h-4 text-orange-600" />
        </div>
        <div className="font-semibold text-sm text-gray-900">{data.label}</div>
      </div>
      
      <div className="text-xs bg-orange-50 border border-orange-200 rounded px-2 py-1.5 text-center">
        <div className="font-bold text-orange-700 text-lg">{duration}</div>
        <div className="text-orange-600">{unit}</div>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-orange-500" />
    </div>
  );
});
