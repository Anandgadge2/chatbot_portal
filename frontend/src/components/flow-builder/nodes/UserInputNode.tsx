'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Type } from 'lucide-react';

export default memo(function UserInputNode({ data, selected }: NodeProps) {
  const inputType = (data as any).inputType || 'text';
  const saveToField = (data as any).saveToField || '';
  const required = (data as any).validation?.required || false;

  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-lg bg-white border-2 min-w-[200px] max-w-[300px] ${
        selected ? 'border-blue-500' : 'border-blue-200'
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-blue-500" />
      
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-blue-100 rounded">
          <Type className="w-4 h-4 text-blue-600" />
        </div>
        <div className="font-semibold text-sm text-gray-900">{data.label}</div>
      </div>
      
      <div className="space-y-1">
        <div className="text-xs bg-blue-50 border border-blue-200 rounded px-2 py-1.5">
          <div className="font-medium text-blue-700">Type: {inputType}</div>
          {saveToField && <div className="text-gray-600">Save to: {saveToField}</div>}
        </div>
        {required && (
          <div className="text-xs text-red-600 font-medium">* Required</div>
        )}
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-blue-500" />
    </div>
  );
});
