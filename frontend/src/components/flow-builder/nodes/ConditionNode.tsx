'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { GitBranch } from 'lucide-react';

export default memo(function ConditionNode({ data, selected }: NodeProps) {
  const field = (data as any).field || '';
  const operator = (data as any).operator || 'equals';
  const value = (data as any).value || '';

  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-lg bg-white border-2 min-w-[200px] max-w-[300px] ${
        selected ? 'border-orange-500' : 'border-orange-200'
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-orange-500" />
      
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-orange-100 rounded">
          <GitBranch className="w-4 h-4 text-orange-600" />
        </div>
        <div className="font-semibold text-sm text-gray-900">{data.label}</div>
      </div>
      
      <div className="text-xs bg-orange-50 border border-orange-200 rounded px-2 py-1.5 space-y-1">
        <div className="font-mono text-orange-700">
          {field || '(field)'} {operator} {value || '(value)'}
        </div>
      </div>
      
      <div className="flex justify-between mt-3">
        <div className="relative">
          <div className="text-xs text-green-600 font-medium">True</div>
          <Handle
            type="source"
            position={Position.Bottom}
            id="true"
            style={{ left: '25%' }}
            className="w-3 h-3 !bg-green-500"
          />
        </div>
        <div className="relative">
          <div className="text-xs text-red-600 font-medium">False</div>
          <Handle
            type="source"
            position={Position.Bottom}
            id="false"
            style={{ left: '75%' }}
            className="w-3 h-3 !bg-red-500"
          />
        </div>
      </div>
    </div>
  );
});
