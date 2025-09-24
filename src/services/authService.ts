export interface User {
  id: string;
  name: string;
  email: string;
  role: 'field_worker' | 'clinician' | 'admin' | 'employer' | 'lab_technician';
  organization?: string;
  permissions: string[];
}

class AuthService {
  private currentUser: User | null = null;

  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock users for demo
    const mockUsers: Record<string, User> = {
      'field@kerala.gov.in': {
        id: 'user-1',
        name: 'Priya Nair',
        email: 'field@kerala.gov.in',
        role: 'field_worker',
        organization: 'Kerala State Health Department',
        permissions: ['register_migrant', 'view_basic_records']
      },
      'doctor@kims.in': {
        id: 'user-2',
        name: 'Dr. Rajesh Kumar',
        email: 'doctor@kims.in',
        role: 'clinician',
        organization: 'KIMS Hospital',
        permissions: ['view_all_records', 'create_encounter', 'order_labs']
      },
      'admin@kerala.gov.in': {
        id: 'user-3',
        name: 'Suresh Menon',
        email: 'admin@kerala.gov.in',
        role: 'admin',
        organization: 'Kerala State Health Department',
        permissions: ['admin_all', 'view_analytics', 'manage_users']
      }
    };

    const user = mockUsers[email];
    if (!user || password !== 'demo123') {
      throw new Error('Invalid credentials');
    }

    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', 'mock-jwt-token');
    
    return user;
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser;
    }

    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userStr && token) {
      this.currentUser = JSON.parse(userStr);
      return this.currentUser;
    }

    return null;
  }

  async refreshToken(): Promise<string> {
    // Simulate token refresh
    await new Promise(resolve => setTimeout(resolve, 500));
    const newToken = 'refreshed-jwt-token';
    localStorage.setItem('token', newToken);
    return newToken;
  }

  hasPermission(permission: string): boolean {
    return this.currentUser?.permissions.includes(permission) || 
           this.currentUser?.permissions.includes('admin_all') || 
           false;
  }
}

export const authService = new AuthService();