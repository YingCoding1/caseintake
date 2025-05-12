import axios from 'axios';

export interface User {
    username: string;
    role: 'admin' | 'user';
}

export interface LoginCredentials {
    username: string;
    password: string;
}

// For demo purposes, we'll use hardcoded credentials
const DEMO_USERS = [
    { username: 'admin', password: 'admin123', role: 'admin' as const },
    { username: 'user', password: 'user123', role: 'user' as const }
];

class AuthService {
    private currentUser: User | null = null;

    async login(credentials: LoginCredentials): Promise<User> {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const user = DEMO_USERS.find(
            u => u.username === credentials.username && u.password === credentials.password
        );

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const newUser: User = { username: user.username, role: user.role };
        this.currentUser = newUser;
        localStorage.setItem('user', JSON.stringify(newUser));
        return newUser;
    }

    logout(): void {
        this.currentUser = null;
        localStorage.removeItem('user');
    }

    getCurrentUser(): User | null {
        if (!this.currentUser) {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser) as User;
                    if (parsedUser.role === 'admin' || parsedUser.role === 'user') {
                        this.currentUser = parsedUser;
                    }
                } catch (e) {
                    // Invalid stored user data
                    localStorage.removeItem('user');
                }
            }
        }
        return this.currentUser;
    }

    isAdmin(): boolean {
        return this.getCurrentUser()?.role === 'admin';
    }

    isAuthenticated(): boolean {
        return !!this.getCurrentUser();
    }
}

export const authService = new AuthService(); 