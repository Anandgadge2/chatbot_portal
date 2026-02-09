'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { List } from 'lucide-react';

export default memo(function ListMessageNode({ data, selected }: NodeProps) {
  const sections = (data as any).sections || [];
  const isDynamic = (data as any).isDynamic || false;

  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-lg bg-white border-2 min-w-[200px] max-w-[300px] ${
        selected ? 'border-purple-500' : 'border-purple-200'
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-purple-500" />
      
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-purple-100 rounded">
          <List className="w-4 h-4 text-purple-600" />
        </div>
        <div className="font-semibold text-sm text-gray-900">{data.label}</div>
      </div>
      
      {isDynamic ? (
        <div className="text-xs bg-blue-50 border border-blue-200 rounded px-2 py-1.5 text-blue-700">
          🔄 Dynamic List (Departments)
        </div>
      ) : (
        <div className="space-y-1">
          {sections.slice(0, 2).map((section: any, index: number) => (
            <div key={index} className="text-xs bg-purple-50 border border-purple-200 rounded px-2 py-1">
              <div className="font-medium text-purple-700">{section.title}</div>
              <div className="text-gray-600">{section.rows?.length || 0} rows</div>
            </div>
          ))}
          {sections.length > 2 && (
            <div className="text-xs text-gray-400 italic">+{sections.length - 2} more sections</div>
          )}
        </div>
      )}
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-purple-500" />
    </div>
  );
});
