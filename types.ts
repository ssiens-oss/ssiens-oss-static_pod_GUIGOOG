
export type Supplier = 'CJ' | 'ZENDROP' | '3PL' | 'PRINTIFY';
export type Platform = 'TIKTOK' | 'SHOPIFY' | 'WOO';

export interface Variant {
  id: string;
  seller_variant_sku: string;
  supplier: Supplier;
  supplier_pid: string;
  supplier_variant_sku: string;
  cost: number;
  price: number;
  inventory: number;
  status: 'ACTIVE' | 'OOS' | 'DISABLED';
}

export interface Product {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  image_url: string;
  variants: Variant[];
  platforms: Platform[];
  monthlySales: number;
  healthScore: number;
}

export interface Order {
  id: string;
  externalOrderId: string;
  platform: Platform;
  status: 'AWAITING_SHIPMENT' | 'FULFILLED' | 'SHIPPED' | 'CANCELLED';
  customerName: string;
  trackingNumber?: string;
  carrier?: string;
  supplierUsed?: Supplier;
  items: {
    sku: string;
    quantity: number;
  }[];
  createdAt: string;
}

export interface SupplierHealth {
  name: Supplier;
  avgShipDays: number;
  failureRate: number;
  oosRate: number;
  healthScore: number;
  lastUpdated: string;
}

export interface Agent {
  id: string;
  name: string;
  type: 'research' | 'browser' | 'prompt' | 'optimization';
  status: 'IDLE' | 'RUNNING' | 'PAUSED' | 'ERROR';
  lastRun: string;
  successRate: number;
  description: string;
}

export interface DesignQueueItem {
  id: string;
  prompt: string;
  status: 'PENDING' | 'GENERATING' | 'MOCKUP' | 'UPLOADING' | 'DONE' | 'FAILED';
  progress: number;
  timestamp: string;
  thumbnail?: string;
}

export interface AdCampaign {
  id: string;
  name: string;
  budget: number;
  spend: number;
  status: 'ACTIVE' | 'PAUSED' | 'ENDED';
  roas: number;
  creatives: number;
}
