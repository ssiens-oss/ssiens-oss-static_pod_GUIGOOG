
import { Product, Order, SupplierHealth, AdCampaign, Agent, DesignQueueItem } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'LED Galaxy Star Projector',
    description: 'Transform your room into a galaxy with high-intensity laser projectors.',
    basePrice: 24.99,
    image_url: 'https://picsum.photos/400/400?random=1',
    variants: [
      { id: 'v1', seller_variant_sku: 'GALAXY-BLK', supplier: 'CJ', supplier_pid: 'CJ123', supplier_variant_sku: 'CJ123-B', cost: 12.0, price: 29.99, inventory: 450, status: 'ACTIVE' },
      { id: 'v2', seller_variant_sku: 'GALAXY-WHT', supplier: 'CJ', supplier_pid: 'CJ123', supplier_variant_sku: 'CJ123-W', cost: 12.0, price: 29.99, inventory: 120, status: 'ACTIVE' }
    ],
    platforms: ['TIKTOK', 'SHOPIFY'],
    monthlySales: 1240,
    healthScore: 92
  },
  {
    id: 'p2',
    title: 'Nexus Comfort Hoodie',
    description: 'Premium heavyweight cotton hoodie with AI-generated abstract designs.',
    basePrice: 45.00,
    image_url: 'https://picsum.photos/400/400?random=2',
    variants: [
      { id: 'v3', seller_variant_sku: 'HOODIE-WAVE', supplier: 'PRINTIFY', supplier_pid: 'PR-882', supplier_variant_sku: 'PR-882-XL', cost: 18.5, price: 49.99, inventory: 89, status: 'ACTIVE' }
    ],
    platforms: ['TIKTOK', 'SHOPIFY', 'WOO'],
    monthlySales: 540,
    healthScore: 85
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'o1',
    externalOrderId: 'TT-100293',
    platform: 'TIKTOK',
    status: 'FULFILLED',
    customerName: 'John Doe',
    trackingNumber: '1Z999AA10123456784',
    carrier: 'UPS',
    supplierUsed: 'CJ',
    items: [{ sku: 'GALAXY-BLK', quantity: 1 }],
    createdAt: '2023-11-20T10:00:00Z'
  },
  {
    id: 'o2',
    externalOrderId: 'SP-99281',
    platform: 'SHOPIFY',
    status: 'AWAITING_SHIPMENT',
    customerName: 'Jane Smith',
    supplierUsed: 'ZENDROP',
    items: [{ sku: 'HOODIE-WAVE', quantity: 2 }],
    createdAt: '2023-11-20T11:30:00Z'
  }
];

export const MOCK_HEALTH: SupplierHealth[] = [
  { name: 'CJ', avgShipDays: 5.4, failureRate: 0.02, oosRate: 0.05, healthScore: 8.8, lastUpdated: '2023-11-20' },
  { name: 'ZENDROP', avgShipDays: 3.2, failureRate: 0.01, oosRate: 0.02, healthScore: 9.6, lastUpdated: '2023-11-20' },
  { name: 'PRINTIFY', avgShipDays: 4.1, failureRate: 0.01, oosRate: 0.01, healthScore: 9.4, lastUpdated: '2023-11-20' }
];

export const MOCK_AGENTS: Agent[] = [
  { id: 'a1', name: 'Etsy Trend Scraper', type: 'research', status: 'RUNNING', lastRun: '2 hours ago', successRate: 0.98, description: 'Monitors Etsy for viral POD design keywords.' },
  { id: 'a2', name: 'ComfyUI Prompt Gen', type: 'prompt', status: 'IDLE', lastRun: '5 mins ago', successRate: 0.95, description: 'Turns trends into high-quality Stable Diffusion prompts.' },
  { id: 'a3', name: 'TikTok Ad Optimizer', type: 'optimization', status: 'PAUSED', lastRun: '1 day ago', successRate: 0.88, description: 'Adjusts ad spend based on real-time ROAS data.' }
];

export const MOCK_QUEUE: DesignQueueItem[] = [
  { id: 'q1', prompt: 'Cyberpunk wave aesthetic, neon indigo, 8k resolution', status: 'GENERATING', progress: 45, timestamp: '10:45 AM' },
  { id: 'q2', prompt: 'Abstract watercolor forest, pastel colors, hoodie design', status: 'MOCKUP', progress: 80, timestamp: '10:40 AM', thumbnail: 'https://picsum.photos/100/100?random=10' },
  { id: 'q3', prompt: 'Minimalist geometric sun, retro style, tee design', status: 'DONE', progress: 100, timestamp: '10:30 AM', thumbnail: 'https://picsum.photos/100/100?random=11' }
];

export const MOCK_CAMPAIGNS: AdCampaign[] = [
  { id: 'c1', name: 'Galaxy Projector - TikTok Spark', budget: 500, spend: 320, status: 'ACTIVE', roas: 3.4, creatives: 5 },
  { id: 'c2', name: 'Facial Steamer - FB Retargeting', budget: 200, spend: 180, status: 'ACTIVE', roas: 2.1, creatives: 3 }
];
