'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Image } from 'lucide-react';

export default memo(function MediaMessageNode({ data, selected }: NodeProps) {
  const mediaType = (data as any).mediaType || 'image';
  const mediaUrl = (data as any).mediaUrl || '';

  const mediaIcons: Record<string, string> = {
    image: '🖼️',
    video: '🎥',
    audio: '🎵',
    document: '📄',
  };

  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-lg bg-white border-2 min-w-[200px] max-w-[300px] ${
        selected ? 'border-purple-500' : 'border-purple-200'
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-purple-500" />
      
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-purple-100 rounded">
          <Image className="w-4 h-4 text-purple-600" />
        </div>
        <div className="font-semibold text-sm text-gray-900">{data.label}</div>
      </div>
      
      <div className="space-y-1.5">
        <div className="text-xs bg-purple-50 border border-purple-200 rounded px-2 py-1.5">
          <div className="font-medium text-purple-700">
            {mediaIcons[mediaType]} {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
          </div>
        </div>
        {mediaUrl && (
          <div className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 font-mono truncate">
            {mediaUrl}
          </div>
        )}
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-purple-500" />
    </div>
  );
});
