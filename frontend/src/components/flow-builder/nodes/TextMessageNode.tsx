'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { MessageSquare } from 'lucide-react';

export default memo(function TextMessageNode({ data, selected }: NodeProps) {
  const messageText = (data as any).messageText || '';
  const preview = messageText.length > 50 ? messageText.substring(0, 50) + '...' : messageText;

  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-lg bg-white border-2 min-w-[200px] max-w-[300px] ${
        selected ? 'border-purple-500' : 'border-purple-200'
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-purple-500" />
      
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-purple-100 rounded">
          <MessageSquare className="w-4 h-4 text-purple-600" />
        </div>
        <div className="font-semibold text-sm text-gray-900">{data.label}</div>
      </div>
      
      {messageText && (
        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-200 font-mono">
          {preview}
        </div>
      )}
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-purple-500" />
    </div>
  );
});
