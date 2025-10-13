'use client';

import React, { useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Philosophy } from '@/lib/types';

interface PhilosophyConceptMapProps {
  philosophy: Philosophy;
  className?: string;
}

// Custom node styling based on category
const getNodeStyle = (category: string) => {
  const baseStyle = {
    padding: '16px 20px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 600,
    border: '2px solid',
    minWidth: '180px',
    textAlign: 'center' as const,
  };

  switch (category) {
    case 'core-value':
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(251, 146, 60, 0.1))',
        borderColor: 'rgba(251, 146, 60, 0.6)',
        color: '#fb923c',
        fontWeight: 700,
        fontSize: '15px',
      };
    case 'practice':
      return {
        ...baseStyle,
        background: 'rgba(71, 85, 105, 0.3)',
        borderColor: 'rgba(148, 163, 184, 0.5)',
        color: '#cbd5e1',
      };
    case 'outcome':
      return {
        ...baseStyle,
        background: 'rgba(34, 197, 94, 0.15)',
        borderColor: 'rgba(34, 197, 94, 0.4)',
        color: '#86efac',
      };
    case 'constraint':
      return {
        ...baseStyle,
        background: 'rgba(239, 68, 68, 0.15)',
        borderColor: 'rgba(239, 68, 68, 0.4)',
        color: '#fca5a5',
      };
    default:
      return baseStyle;
  }
};

// Auto-layout positions using layered approach
const calculateNodePositions = (
  nodes: Philosophy['conceptMap']['nodes'],
  edges: Philosophy['conceptMap']['edges']
) => {
  const positionedNodes: Node[] = [];
  const centerX = 400;
  const centerY = 300;
  const layerSpacing = 220;
  const nodeSpacing = 180;

  // Categorize nodes by type for layered layout
  const coreNodes = nodes.filter((n) => n.category === 'core-value');
  const practiceNodes = nodes.filter((n) => n.category === 'practice');
  const outcomeNodes = nodes.filter((n) => n.category === 'outcome');
  const constraintNodes = nodes.filter((n) => n.category === 'constraint');

  // Position core values at top center
  coreNodes.forEach((node, i) => {
    const offset = (i - (coreNodes.length - 1) / 2) * nodeSpacing;
    positionedNodes.push({
      id: node.id,
      type: 'default',
      data: {
        label: (
          <div className="flex flex-col gap-2">
            <div className="font-bold">{node.label}</div>
            <div className="text-xs opacity-80" style={{ whiteSpace: 'normal', maxWidth: '160px' }}>
              {node.description}
            </div>
          </div>
        ),
      },
      position: { x: centerX + offset, y: centerY - layerSpacing * 1.5 },
      style: getNodeStyle(node.category),
    });
  });

  // Position practices in middle layer
  practiceNodes.forEach((node, i) => {
    const offset = (i - (practiceNodes.length - 1) / 2) * nodeSpacing;
    positionedNodes.push({
      id: node.id,
      type: 'default',
      data: {
        label: (
          <div className="flex flex-col gap-2">
            <div className="font-semibold">{node.label}</div>
            <div className="text-xs opacity-80" style={{ whiteSpace: 'normal', maxWidth: '160px' }}>
              {node.description}
            </div>
          </div>
        ),
      },
      position: { x: centerX + offset, y: centerY },
      style: getNodeStyle(node.category),
    });
  });

  // Position outcomes in bottom layer (left side)
  outcomeNodes.forEach((node, i) => {
    const offset = (i - (outcomeNodes.length - 1) / 2) * nodeSpacing - 100;
    positionedNodes.push({
      id: node.id,
      type: 'default',
      data: {
        label: (
          <div className="flex flex-col gap-2">
            <div className="font-semibold">{node.label}</div>
            <div className="text-xs opacity-80" style={{ whiteSpace: 'normal', maxWidth: '160px' }}>
              {node.description}
            </div>
          </div>
        ),
      },
      position: { x: centerX + offset, y: centerY + layerSpacing * 1.5 },
      style: getNodeStyle(node.category),
    });
  });

  // Position constraints in bottom layer (right side)
  constraintNodes.forEach((node, i) => {
    const offset = (i - (constraintNodes.length - 1) / 2) * nodeSpacing + 100;
    positionedNodes.push({
      id: node.id,
      type: 'default',
      data: {
        label: (
          <div className="flex flex-col gap-2">
            <div className="font-semibold">{node.label}</div>
            <div className="text-xs opacity-80" style={{ whiteSpace: 'normal', maxWidth: '160px' }}>
              {node.description}
            </div>
          </div>
        ),
      },
      position: { x: centerX + offset, y: centerY + layerSpacing * 1.5 },
      style: getNodeStyle(node.category),
    });
  });

  return positionedNodes;
};

const getEdgeStyle = (relationship: string) => {
  switch (relationship) {
    case 'enables':
      return {
        stroke: 'rgba(251, 146, 60, 0.5)',
        strokeWidth: 2,
        animated: true,
      };
    case 'derives-from':
      return {
        stroke: 'rgba(34, 197, 94, 0.5)',
        strokeWidth: 2,
        animated: false,
      };
    case 'conflicts-with':
      return {
        stroke: 'rgba(239, 68, 68, 0.5)',
        strokeWidth: 2,
        strokeDasharray: '5,5',
        animated: false,
      };
    default:
      return {
        stroke: 'rgba(148, 163, 184, 0.3)',
        strokeWidth: 2,
      };
  }
};

export default function PhilosophyConceptMap({
  philosophy,
  className = '',
}: PhilosophyConceptMapProps) {
  // Convert philosophy data to React Flow nodes and edges
  const initialNodes = useMemo(
    () => calculateNodePositions(philosophy.conceptMap.nodes, philosophy.conceptMap.edges),
    [philosophy]
  );

  const initialEdges: Edge[] = useMemo(
    () =>
      philosophy.conceptMap.edges.map((edge, index) => ({
        id: `e${index}`,
        source: edge.from,
        target: edge.to,
        type: ConnectionLineType.SmoothStep,
        label: edge.relationship === 'enables' ? '→' : edge.relationship === 'derives-from' ? '⇒' : '⚠',
        labelStyle: {
          fill: '#94a3b8',
          fontSize: 12,
          fontWeight: 600,
        },
        labelBgStyle: {
          fill: '#0f172a',
          fillOpacity: 0.8,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color:
            edge.relationship === 'enables'
              ? 'rgba(251, 146, 60, 0.5)'
              : edge.relationship === 'derives-from'
              ? 'rgba(34, 197, 94, 0.5)'
              : 'rgba(239, 68, 68, 0.5)',
        },
        ...getEdgeStyle(edge.relationship),
      })),
    [philosophy]
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className={`relative h-[600px] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950 ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.5}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#475569" gap={16} size={1} />
        <Controls
          className="rounded-lg border border-white/10 bg-slate-900/80 backdrop-blur-xl"
          style={{
            button: {
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#94a3b8',
            },
          }}
        />
        <MiniMap
          nodeColor={(node) => {
            const category = philosophy.conceptMap.nodes.find((n) => n.id === node.id)?.category;
            switch (category) {
              case 'core-value':
                return '#fb923c';
              case 'practice':
                return '#64748b';
              case 'outcome':
                return '#22c55e';
              case 'constraint':
                return '#ef4444';
              default:
                return '#94a3b8';
            }
          }}
          maskColor="rgba(15, 23, 42, 0.8)"
          className="rounded-lg border border-white/10 bg-slate-900/80 backdrop-blur-xl"
        />
      </ReactFlow>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-slate-900/90 p-4 backdrop-blur-xl">
        <div className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-3">
          Node Categories
        </div>
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border-2 border-orange-400 bg-orange-400/20" />
            <span className="text-slate-300">Core Value</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border-2 border-slate-400 bg-slate-400/20" />
            <span className="text-slate-300">Practice</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border-2 border-green-400 bg-green-400/20" />
            <span className="text-slate-300">Outcome</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border-2 border-red-400 bg-red-400/20" />
            <span className="text-slate-300">Constraint</span>
          </div>
        </div>
      </div>
    </div>
  );
}
