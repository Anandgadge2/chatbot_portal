import React, { useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Plus, Copy, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface BaseNodeWrapperProps {
  data: any;
  selected: boolean;
  icon: React.ReactNode;
  color: string;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onCopy?: () => void;
  children?: React.ReactNode;
  preview?: string;
}

export function BaseNodeWrapper({
  data,
  selected,
  icon,
  color,
  onDelete,
  onDuplicate,
  onCopy,
  children,
  preview,
}: BaseNodeWrapperProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const borderColor = selected ? `border-${color}-500` : `border-${color}-300`;
  const bgColor = `bg-${color}-50`;
  const iconBgColor = `bg-${color}-100`;
  const iconColor = `text-${color}-600`;

  return (
    <div
      className={`relative bg-white rounded-lg shadow-md border-2 ${borderColor} min-w-[280px] max-w-[350px] transition-all hover:shadow-lg`}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        className={`w-3 h-3 !bg-${color}-500`}
      />

      {/* Header */}
      <div className={`px-3 py-2 ${bgColor} rounded-t-lg border-b border-${color}-200 flex items-center justify-between`}>
        <div className="flex items-center gap-2 flex-1">
          <div className={`p-1.5 ${iconBgColor} rounded ${iconColor}`}>
            {icon}
          </div>
          <div className="font-semibold text-sm text-gray-900">{data.label}</div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {onDuplicate && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
              }}
              className="p-1 hover:bg-white rounded transition-colors"
              title="Duplicate node"
            >
              <Plus className="w-3.5 h-3.5 text-gray-600" />
            </button>
          )}
          {onCopy && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCopy();
              }}
              className="p-1 hover:bg-white rounded transition-colors"
              title="Copy node"
            >
              <Copy className="w-3.5 h-3.5 text-gray-600" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-1 hover:bg-red-100 rounded transition-colors"
              title="Delete node"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-600" />
            </button>
          )}
          {children && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="p-1 hover:bg-white rounded transition-colors"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Preview/Content */}
      {preview && !isExpanded && (
        <div className="px-3 py-2">
          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-200 font-mono line-clamp-2">
            {preview}
          </div>
        </div>
      )}

      {/* Expanded Configuration */}
      {isExpanded && children && (
        <div className="px-3 py-2 space-y-2 max-h-96 overflow-y-auto">
          {children}
        </div>
      )}

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className={`w-3 h-3 !bg-${color}-500`}
      />
    </div>
  );
}

// Helper component for form fields in expanded view
export function NodeField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}
