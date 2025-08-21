import { ASSET_TYPES, ASSET_STATUS, PURCHASE_STATUS, TRANSFER_STATUS, ASSIGNMENT_STATUS } from '../types';

// Mock data for demonstration
const mockBases = [
  {
    id: 'base-1',
    name: 'Fort Liberty',
    location: 'North Carolina, USA',
    commanderId: '2',
    active: true,
  },
  {
    id: 'base-2',
    name: 'Camp Pendleton',
    location: 'California, USA',
    commanderId: '4',
    active: true,
  },
];

const mockAssets = [
  {
    id: 'asset-1',
    name: 'M4A1 Carbine',
    type: ASSET_TYPES.WEAPON,
    serialNumber: 'W001234',
    baseId: 'base-1',
    status: ASSET_STATUS.AVAILABLE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'asset-2',
    name: 'HMMWV',
    type: ASSET_TYPES.VEHICLE,
    serialNumber: 'V567890',
    baseId: 'base-1',
    status: ASSET_STATUS.ASSIGNED,
    assignedTo: 'personnel-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockPurchases = [
  {
    id: 'purchase-1',
    assetType: ASSET_TYPES.WEAPON,
    assetName: 'M4A1 Carbine',
    quantity: 50,
    unitPrice: 900,
    totalAmount: 45000,
    supplier: 'Colt Defense LLC',
    baseId: 'base-1',
    purchasedBy: '3',
    approvedBy: '2',
    status: PURCHASE_STATUS.APPROVED,
    orderDate: '2024-01-15',
    deliveryDate: '2024-02-01',
    notes: 'Standard issue rifles for new recruits',
  },
];

const mockTransfers = [
  {
    id: 'transfer-1',
    assetId: 'asset-1',
    fromBaseId: 'base-1',
    toBaseId: 'base-2',
    quantity: 10,
    requestedBy: '3',
    approvedBy: '2',
    status: TRANSFER_STATUS.COMPLETED,
    requestDate: '2024-01-20',
    approvalDate: '2024-01-21',
    completionDate: '2024-01-25',
    notes: 'Equipment transfer for training exercise',
  },
];

const mockAssignments = [
  {
    id: 'assignment-1',
    assetId: 'asset-2',
    assignedTo: 'Sergeant Williams',
    assignedBy: '3',
    baseId: 'base-1',
    assignmentDate: '2024-01-22',
    status: ASSIGNMENT_STATUS.ACTIVE,
    purpose: 'Patrol operations',
    notes: 'Regular maintenance required weekly',
  },
];

const mockAuditLogs = [
  {
    id: 'audit-1',
    action: 'ASSET_ASSIGNED',
    entityType: 'ASSIGNMENT',
    entityId: 'assignment-1',
    userId: '3',
    userName: 'Major Sarah Johnson',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    details: { assetName: 'HMMWV', assignedTo: 'Sergeant Williams' },
  },
  {
    id: 'audit-2',
    action: 'TRANSFER_COMPLETED',
    entityType: 'TRANSFER',
    entityId: 'transfer-1',
    userId: '2',
    userName: 'Colonel John Smith',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    details: { fromBase: 'Fort Liberty', toBase: 'Camp Pendleton', quantity: 10 },
  },
];

class ApiService {
  // Dashboard
  async getDashboardMetrics() {
    await this.delay(500);
    return {
      openingBalance: 500,
      closingBalance: 487,
      netMovement: -13,
      totalAssigned: 45,
      totalExpended: 8,
      assetsByType: [
        {
          type: ASSET_TYPES.WEAPON,
          count: 250,
          available: 220,
          assigned: 25,
          maintenance: 3,
          expended: 2,
        },
        {
          type: ASSET_TYPES.VEHICLE,
          count: 85,
          available: 70,
          assigned: 12,
          maintenance: 2,
          expended: 1,
        },
        {
          type: ASSET_TYPES.AMMUNITION,
          count: 10000,
          available: 8500,
          assigned: 1200,
          maintenance: 0,
          expended: 300,
        },
        {
          type: ASSET_TYPES.EQUIPMENT,
          count: 152,
          available: 130,
          assigned: 18,
          maintenance: 2,
          expended: 2,
        },
      ],
      recentActivities: mockAuditLogs,
    };
  }

  // Purchases
  async getPurchases() {
    await this.delay(300);
    return mockPurchases;
  }

  async createPurchase(purchase) {
    await this.delay(500);
    const newPurchase = {
      ...purchase,
      id: `purchase-${Date.now()}`,
    };
    mockPurchases.push(newPurchase);
    return newPurchase;
  }

  async approvePurchase(id, approvedBy) {
    await this.delay(300);
    const purchase = mockPurchases.find(p => p.id === id);
    if (!purchase) throw new Error('Purchase not found');
    purchase.approvedBy = approvedBy;
    purchase.status = PURCHASE_STATUS.APPROVED;
    return purchase;
  }

  // Transfers
  async getTransfers() {
    await this.delay(300);
    return mockTransfers;
  }

  async createTransfer(transfer) {
    await this.delay(500);
    const newTransfer = {
      ...transfer,
      id: `transfer-${Date.now()}`,
    };
    mockTransfers.push(newTransfer);
    return newTransfer;
  }

  async approveTransfer(id, approvedBy) {
    await this.delay(300);
    const transfer = mockTransfers.find(t => t.id === id);
    if (!transfer) throw new Error('Transfer not found');
    transfer.approvedBy = approvedBy;
    transfer.status = TRANSFER_STATUS.APPROVED;
    transfer.approvalDate = new Date().toISOString();
    return transfer;
  }

  // Assignments
  async getAssignments() {
    await this.delay(300);
    return mockAssignments;
  }

  async createAssignment(assignment) {
    await this.delay(500);
    const newAssignment = {
      ...assignment,
      id: `assignment-${Date.now()}`,
    };
    mockAssignments.push(newAssignment);
    return newAssignment;
  }

  async returnAsset(id) {
    await this.delay(300);
    const assignment = mockAssignments.find(a => a.id === id);
    if (!assignment) throw new Error('Assignment not found');
    assignment.status = ASSIGNMENT_STATUS.RETURNED;
    assignment.actualReturnDate = new Date().toISOString();
    return assignment;
  }

  // Assets
  async getAssets() {
    await this.delay(300);
    return mockAssets;
  }

  // Bases
  async getBases() {
    await this.delay(300);
    return mockBases;
  }

  // Audit
  async getAuditLogs() {
    await this.delay(300);
    return mockAuditLogs;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const apiService = new ApiService();