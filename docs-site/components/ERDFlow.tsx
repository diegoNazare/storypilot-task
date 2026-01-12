"use client";

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
    id: 'tenants',
    type: 'default',
    position: { x: 250, y: 0 },
    data: { 
      label: (
        <div style={{ padding: '8px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #1A1A1A', paddingBottom: '4px' }}>tenants</div>
          <div style={{ fontSize: '10px', textAlign: 'left' }}>
            <div>id (PK)</div>
            <div>name</div>
            <div>api_key_hash</div>
            <div>status</div>
            <div>tier</div>
          </div>
        </div>
      )
    },
    style: { 
      background: '#FAFAFA', 
      border: '2px solid #1A1A1A',
      borderRadius: '6px',
      padding: '0',
      fontSize: '12px',
      width: 180,
    },
  },
  {
    id: 'videos',
    type: 'default',
    position: { x: 50, y: 200 },
    data: { 
      label: (
        <div style={{ padding: '8px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #1A1A1A', paddingBottom: '4px' }}>videos</div>
          <div style={{ fontSize: '10px', textAlign: 'left' }}>
            <div>id (PK)</div>
            <div>tenant_id (FK)</div>
            <div>title</div>
            <div>category</div>
            <div>editorial_boost</div>
            <div>created_at</div>
          </div>
        </div>
      )
    },
    style: { 
      background: '#FAFAFA', 
      border: '2px solid #1A1A1A',
      borderRadius: '6px',
      padding: '0',
      fontSize: '12px',
      width: 180,
    },
  },
  {
    id: 'tenant_configs',
    type: 'default',
    position: { x: 450, y: 200 },
    data: { 
      label: (
        <div style={{ padding: '8px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #1A1A1A', paddingBottom: '4px' }}>tenant_configs</div>
          <div style={{ fontSize: '10px', textAlign: 'left' }}>
            <div>tenant_id (PK, FK)</div>
            <div>personalization_enabled</div>
            <div>weights (JSONB)</div>
            <div>content_filters</div>
          </div>
        </div>
      )
    },
    style: { 
      background: '#FAFAFA', 
      border: '2px solid #1A1A1A',
      borderRadius: '6px',
      padding: '0',
      fontSize: '12px',
      width: 200,
    },
  },
  {
    id: 'user_signals',
    type: 'default',
    position: { x: 50, y: 420 },
    data: { 
      label: (
        <div style={{ padding: '8px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #1A1A1A', paddingBottom: '4px' }}>user_signals</div>
          <div style={{ fontSize: '10px', textAlign: 'left' }}>
            <div>id (PK)</div>
            <div>user_id_hash</div>
            <div>video_id (FK)</div>
            <div>tenant_id</div>
            <div>event_type</div>
            <div>timestamp</div>
          </div>
        </div>
      )
    },
    style: { 
      background: '#FAFAFA', 
      border: '2px solid #1A1A1A',
      borderRadius: '6px',
      padding: '0',
      fontSize: '12px',
      width: 180,
    },
  },
];

const initialEdges: Edge[] = [
  { 
    id: 'e1', 
    source: 'tenants', 
    target: 'videos', 
    label: '1:N',
    style: { stroke: '#1A1A1A', strokeWidth: 2 },
    labelStyle: { fontSize: '10px', fontWeight: 'bold' },
  },
  { 
    id: 'e2', 
    source: 'tenants', 
    target: 'tenant_configs', 
    label: '1:1',
    style: { stroke: '#1A1A1A', strokeWidth: 2 },
    labelStyle: { fontSize: '10px', fontWeight: 'bold' },
  },
  { 
    id: 'e3', 
    source: 'videos', 
    target: 'user_signals', 
    label: '1:N',
    style: { stroke: '#1A1A1A', strokeWidth: 2 },
    labelStyle: { fontSize: '10px', fontWeight: 'bold' },
  },
];

export default function ERDFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-[600px] border-2 border-mist rounded bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
      >
        <Background color="#E5E5E5" gap={16} />
        <Controls />
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
