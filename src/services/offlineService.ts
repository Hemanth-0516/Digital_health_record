interface PendingChange {
  id: string;
  type: 'create' | 'update' | 'delete';
  entity: string;
  data: any;
  timestamp: Date;
  retryCount: number;
}

class OfflineService {
  private dbName = 'MigrantHealthDB';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object stores
        if (!db.objectStoreNames.contains('migrants')) {
          const migrantStore = db.createObjectStore('migrants', { keyPath: 'id' });
          migrantStore.createIndex('qr_code', 'qr_code', { unique: true });
          migrantStore.createIndex('phone', 'phone_numbers', { multiEntry: true });
        }
        
        if (!db.objectStoreNames.contains('health_records')) {
          const recordStore = db.createObjectStore('health_records', { keyPath: 'id' });
          recordStore.createIndex('migrant_id', 'migrant_id');
          recordStore.createIndex('encounter_date', 'encounter_date');
        }
        
        if (!db.objectStoreNames.contains('pending_changes')) {
          db.createObjectStore('pending_changes', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('consent_records')) {
          const consentStore = db.createObjectStore('consent_records', { keyPath: 'id' });
          consentStore.createIndex('migrant_id', 'migrant_id');
        }
      };
    });
  }

  async storeMigrant(migrant: any): Promise<void> {
    if (!this.db) await this.init();
    
    const transaction = this.db!.transaction(['migrants'], 'readwrite');
    const store = transaction.objectStore('migrants');
    
    // Add offline metadata
    migrant.lastModified = new Date();
    migrant.syncStatus = navigator.onLine ? 'synced' : 'pending';
    
    await store.put(migrant);
    
    // If offline, queue for sync
    if (!navigator.onLine) {
      await this.queueChange('create', 'migrants', migrant);
    }
  }

  async getMigrant(id: string): Promise<any> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['migrants'], 'readonly');
      const store = transaction.objectStore('migrants');
      const request = store.get(id);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getMigrantByQR(qrCode: string): Promise<any> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['migrants'], 'readonly');
      const store = transaction.objectStore('migrants');
      const index = store.index('qr_code');
      const request = index.get(qrCode);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAllMigrants(): Promise<any[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['migrants'], 'readonly');
      const store = transaction.objectStore('migrants');
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async storeHealthRecord(record: any): Promise<void> {
    if (!this.db) await this.init();
    
    const transaction = this.db!.transaction(['health_records'], 'readwrite');
    const store = transaction.objectStore('health_records');
    
    record.lastModified = new Date();
    record.syncStatus = navigator.onLine ? 'synced' : 'pending';
    
    await store.put(record);
    
    if (!navigator.onLine) {
      await this.queueChange('create', 'health_records', record);
    }
  }

  async getHealthRecords(migrantId: string): Promise<any[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['health_records'], 'readonly');
      const store = transaction.objectStore('health_records');
      const index = store.index('migrant_id');
      const request = index.getAll(migrantId);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private async queueChange(type: 'create' | 'update' | 'delete', entity: string, data: any): Promise<void> {
    if (!this.db) await this.init();
    
    const change: PendingChange = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      entity,
      data,
      timestamp: new Date(),
      retryCount: 0
    };
    
    const transaction = this.db!.transaction(['pending_changes'], 'readwrite');
    const store = transaction.objectStore('pending_changes');
    await store.add(change);
  }

  async getPendingChangesCount(): Promise<number> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['pending_changes'], 'readonly');
      const store = transaction.objectStore('pending_changes');
      const request = store.count();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async syncPendingChanges(): Promise<void> {
    if (!this.db) await this.init();
    
    const transaction = this.db!.transaction(['pending_changes'], 'readwrite');
    const store = transaction.objectStore('pending_changes');
    const request = store.getAll();
    
    return new Promise((resolve, reject) => {
      request.onsuccess = async () => {
        const changes = request.result;
        
        for (const change of changes) {
          try {
            // Simulate API sync
            await this.syncChange(change);
            
            // Remove from pending changes
            await store.delete(change.id);
          } catch (error) {
            // Increment retry count
            change.retryCount++;
            if (change.retryCount < 3) {
              await store.put(change);
            } else {
              // Max retries reached, log error
              console.error('Max retries reached for change:', change);
            }
          }
        }
        
        resolve();
      };
      
      request.onerror = () => reject(request.error);
    });
  }

  private async syncChange(change: PendingChange): Promise<void> {
    // Simulate API call to sync change
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In real implementation, this would make actual API calls
    console.log('Syncing change:', change);
  }
}

export const offlineService = new OfflineService();