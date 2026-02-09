'use client';

import FlowCanvas from '@/components/flow-builder/FlowCanvas';
import { Toaster } from 'react-hot-toast';

export default function FlowBuilderPage() {
  return (
    <>
      <Toaster position="top-right" />
      <div className="h-screen w-full">
        <FlowCanvas />
      </div>
    </>
  );
}
