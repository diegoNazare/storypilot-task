"use client";

import { useCallback } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: 'sdk',
    type: 'default',
    position: { x: 250, y: 0 },
    data: { label: '📱 Mobile SDK\n(Host App)' },
    style: { 
      background: '#FAFAFA', 
      border: '2px solid #1A1A1A',
      borderRadius: '6px',
      padding: '10px',
      fontSize: '12px',
      fontWeight: 'bold',
    },
  },
  {
    id: 'api-gateway',
    type: 'default',
    position: { x: 200, y: 120 },
    data: { label: '🚪 API Gateway\nRate Limiting\nFeature Flags' },
    style: { 
      background: '#FAFAFA', 
      border: '2px solid #1A1A1A',
      borderRadius: '6px',
      padding: '10px',
      fontSize: '12px',
      fontWeight: 'bold',
    },
  },
  {
    id: 'personalized',
    type: 'default',
    position: { x: 50, y: 250 },
    data: { label: '✨ Personalized\nFeed Service' },
    style: { 
      background: '#E5E5E5', 
      border: '2px solid #1A1A1A',
      borderRadius: '6px',
      padding: '10px',
      fontSize: '12px',
      fontWeight: 'bold',
    },
  },
  {
    id: 'non-personalized',
    type: 'default',
    position: { x: 350, y: 250 },
    data: { label: '📋 Non-Personalized\nFeed Service' },
    style: { 
      background: '#FAFAFA', 
      border: '2px solid #1A1A1A',
      borderRadius: '6px',
      padding: '10px',
      fontSize: '12px',
    },
  },
  {
    id: 'cache',
    type: 'default',
    position: { x: 50, y: 380 },
    data: { label: '⚡ Cache Layer\n(Redis)' },
    style: { 
      background: '#FAFAFA', 
      border: '2px solid #1A1A1A',
      borderRadius: '6px',
      padding: '10px',
      fontSize: '12px',
      fontWeight: 'bold',
    },
  },
  {
    id: 'ranking',
    type: 'default',
    position: { x: 50, y: 500 },
    data: { label: '🎯 Ranking Engine\nScoring Algorithm' },
    style: { 
      background: '#E5E5E5', 
      border: '2px solid #1A1A1A',
      borderRadius: '6px',
      padding: '10px',
      fontSize: '12px',
      fontWeight: 'bold',
    },
  },
  {
    id: 'db-videos',
    type: 'default',
    position: { x: -100, y: 650 },
    data: { label: '🎬 Videos DB\nContent Metadata' },
    style: { 
      background: '#FAFAFA', 
      border: '2px solid #1A1A1A',
      borderRadius: '6px',
      padding: '10px',
      fontSize: '11px',
    },
  },
  {
    id: 'db-signals',
    type: 'default',
    position: { x: 100, y: 650 },
    data: { label: '📊 User Signals DB\nWatch History' },
    style: { 
      background: '#FAFAFA', 
      border: '2px solid #1A1A1A',
      borderRadius: '6px',
      padding: '10px',
      fontSize: '11px',
    },
  },
  {
    id: 'db-config',
    type: 'default',
    position: { x: 300, y: 650 },
    data: { label: '⚙️ Tenant Config DB\nWeights & Flags' },
    style: { 
      background: '#FAFAFA', 
      border: '2px solid #1A1A1A',
      borderRadius: '6px',
      padding: '10px',
      fontSize: '11px',
    },
  },
  {
    id: 'event-pipeline',
    type: 'default',
    position: { x: 450, y: 480 },
    data: { label: '📡 Event Pipeline\n(Kafka/SQS)\nAsync Processing' },
    style: { 
      background: '#E5E5E5', 
      border: '2px solid #1A1A1A',
      borderRadius: '6px',
      padding: '10px',
      fontSize: '11px',
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1', source: 'sdk', target: 'api-gateway', label: 'GET /v1/feed', animated: true },
  { id: 'e2', source: 'api-gateway', target: 'personalized', label: 'enabled' },
  { id: 'e3', source: 'api-gateway', target: 'non-personalized', label: 'disabled', style: { strokeDasharray: '5,5' } },
  { id: 'e4', source: 'personalized', target: 'cache', label: 'lookup' },
  { id: 'e5', source: 'cache', target: 'ranking', label: 'cache miss' },
  { id: 'e6', source: 'ranking', target: 'db-videos' },
  { id: 'e7', source: 'ranking', target: 'db-signals' },
  { id: 'e8', source: 'ranking', target: 'db-config' },
  { id: 'e9', source: 'sdk', target: 'event-pipeline', label: 'user events', animated: true, style: { stroke: '#8A8A8A' } },
  { id: 'e10', source: 'event-pipeline', target: 'db-signals', label: 'async write', animated: true, style: { stroke: '#8A8A8A' } },
  { id: 'e11', source: 'non-personalized', target: 'db-videos', label: 'editorial order' },
];

export default function ArchitectureFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-[700px] border-2 border-mist rounded bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
      >
        <Background color="#E5E5E5" gap={16} />
        <Controls 
          style={{ 
            button: { 
              background: '#FAFAFA', 
              border: '1px solid #1A1A1A',
              color: '#1A1A1A'
            } 
          }}
        />
        <MiniMap 
          nodeColor={() => '#FAFAFA'}
          nodeStrokeColor={() => '#1A1A1A'}
          nodeBorderRadius={6}
          maskColor="rgba(250, 250, 250, 0.6)"
        />
      </ReactFlow>
    </div>
  );
}
