'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { MousePointerClick } from 'lucide-react';

export default memo(function ButtonMessageNode({ data, selected }: NodeProps) {
  const buttons = (data as any).buttons || [];

  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-lg bg-white border-2 min-w-[200px] max-w-[300px] ${
        selected ? 'border-purple-500' : 'border-purple-200'
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-purple-500" />
      
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-purple-100 rounded">
          <MousePointerClick className="w-4 h-4 text-purple-600" />
        </div>
        <div className="font-semibold text-sm text-gray-900">{data.label}</div>
      </div>
      
      <div className="space-y-1">
        {buttons.map((btn: any, index: number) => (
          <div key={index} className="relative">
            <div className="text-xs bg-purple-50 border border-purple-200 rounded px-2 py-1.5 text-purple-700 font-medium">
              {btn.text || `Button ${index + 1}`}
            </div>
            <Handle
              type="source"
              position={Position.Right}
              id={`button-${index}`}
              style={{ top: `${(index + 1) * 30 + 40}px` }}
              className="w-2 h-2 !bg-purple-500"
            />
          </div>
        ))}
      </div>
      
      {buttons.length === 0 && (
        <div className="text-xs text-gray-400 italic">No buttons configured</div>
      )}
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-purple-500" />
    </div>
  );
});
