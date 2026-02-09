'use client';

import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { NodeType, NodePaletteItem } from '@/types/flowTypes';
import {
  MessageSquare,
  MousePointerClick,
  List,
  Image,
  FileText,
  MessageCircle,
  Keyboard,
  GitBranch,
  Building2,
  Clock,
  PlayCircle,
  StopCircle,
  Zap,
  ChevronLeft,
  ChevronRight,
  Play,
  Type,
  Globe,
  Users,
  Sparkles,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const nodePalette: NodePaletteItem[] = [
  {
    type: 'start',
    label: 'Start',
    description: 'Flow entry point with trigger',
    icon: <Play className="w-5 h-5" />,
    category: 'control',
    defaultData: {},
  },
  {
    type: 'textMessage',
    label: 'Text Message',
    description: 'Send a plain text message',
    icon: <MessageSquare className="w-5 h-5" />,
    category: 'message',
    defaultData: {},
  },
  {
    type: 'buttonMessage',
    label: 'Button Message',
    description: 'Message with quick reply buttons',
    icon: <MousePointerClick className="w-5 h-5" />,
    category: 'message',
    defaultData: {},
  },
  {
    type: 'listMessage',
    label: 'List Message',
    description: 'WhatsApp list with sections',
    icon: <List className="w-5 h-5" />,
    category: 'message',
    defaultData: {},
  },
  {
    type: 'templateMessage',
    label: 'Template Message',
    description: 'Official WhatsApp template',
    icon: <FileText className="w-5 h-5" />,
    category: 'message',
    defaultData: {},
  },
  {
    type: 'mediaMessage',
    label: 'Media Message',
    description: 'Send image, video, or document',
    icon: <Image className="w-5 h-5" />,
    category: 'message',
    defaultData: {},
  },
  {
    type: 'userInput',
    label: 'User Input',
    description: 'Collect user input',
    icon: <Type className="w-5 h-5" />,
    category: 'logic',
    defaultData: {},
  },
  {
    type: 'condition',
    label: 'Condition',
    description: 'Branch based on conditions',
    icon: <GitBranch className="w-5 h-5" />,
    category: 'logic',
    defaultData: {},
  },
  {
    type: 'apiCall',
    label: 'API Call',
    description: 'Call external API',
    icon: <Globe className="w-5 h-5" />,
    category: 'integration',
    defaultData: {},
  },
  {
    type: 'assignDepartment',
    label: 'Assign Department',
    description: 'Route to department',
    icon: <Users className="w-5 h-5" />,
    category: 'logic',
    defaultData: {},
  },
  {
    type: 'delay',
    label: 'Delay',
    description: 'Wait before next step',
    icon: <Clock className="w-5 h-5" />,
    category: 'control',
    defaultData: {},
  },
  {
    type: 'dynamicResponse',
    label: 'Dynamic Response',
    description: 'Template with variables',
    icon: <Sparkles className="w-5 h-5" />,
    category: 'message',
    defaultData: {},
  },
  {
    type: 'end',
    label: 'End',
    description: 'End the conversation',
    icon: <StopCircle className="w-5 h-5" />,
    category: 'control',
    defaultData: {},
  },
];

function DraggableNode({ item }: { item: NodePaletteItem }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.type,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const categoryColors = {
    message: 'bg-purple-50 border-purple-200 hover:border-purple-400 text-purple-700',
    logic: 'bg-blue-50 border-blue-200 hover:border-blue-400 text-blue-700',
    integration: 'bg-green-50 border-green-200 hover:border-green-400 text-green-700',
    control: 'bg-orange-50 border-orange-200 hover:border-orange-400 text-orange-700',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 border-2 rounded-lg cursor-grab active:cursor-grabbing transition-all ${
        categoryColors[item.category]
      }`}
    >
      <div className="flex items-start gap-2">
        <div className="mt-0.5">{item.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm">{item.label}</div>
          <div className="text-xs opacity-75 mt-0.5 line-clamp-2">{item.description}</div>
        </div>
      </div>
    </div>
  );
}

export default function NodeSidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredNodes = nodePalette.filter((node) => {
    const matchesSearch =
      node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || node.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'All Nodes', count: nodePalette.length },
    { id: 'message', label: 'Messages', count: nodePalette.filter((n) => n.category === 'message').length },
    { id: 'logic', label: 'Logic', count: nodePalette.filter((n) => n.category === 'logic').length },
    { id: 'integration', label: 'Integration', count: nodePalette.filter((n) => n.category === 'integration').length },
    { id: 'control', label: 'Control', count: nodePalette.filter((n) => n.category === 'control').length },
  ];

  return (
    <div 
      className={`bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 ease-in-out relative ${
        isCollapsed ? 'w-12' : 'w-80'
      }`}
    >
      {/* Collapse/Expand Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 z-10 bg-white border border-gray-300 rounded-full p-1 shadow-md hover:bg-gray-50 hover:shadow-lg transition-all"
        title={isCollapsed ? 'Expand palette' : 'Collapse palette'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {!isCollapsed && (
        <>
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Node Palette</h2>
            
            {/* Search */}
            <Input
              type="text"
              placeholder="Search nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-3"
            />

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Node List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredNodes.length === 0 ? (
              <div className="text-center text-gray-500 text-sm py-8">
                No nodes found matching "{searchQuery}"
              </div>
            ) : (
              filteredNodes.map((item) => <DraggableNode key={item.type} item={item} />)
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-xs text-gray-600">
              <p className="font-medium mb-1">💡 Quick Tip</p>
              <p>Drag nodes onto the canvas to build your flow. Connect them by dragging from one node's edge to another.</p>
            </div>
          </div>
        </>
      )}

      {/* Collapsed State - Vertical Text */}
      {isCollapsed && (
        <div className="flex-1 flex items-center justify-center">
          <div className="transform -rotate-90 whitespace-nowrap">
            <span className="text-sm font-semibold text-gray-600">Node Palette</span>
          </div>
        </div>
      )}
    </div>
  );
}
