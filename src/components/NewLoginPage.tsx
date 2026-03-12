import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export function NewLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast({
                title: 'Missing fields',
                description: 'Please enter both email and password',
                variant: 'destructive',
            });
            return;
        }

        try {
            await login(email, password);
            toast({
                title: 'Welcome back!',
                description: 'Successfully logged in',
            });
            navigate('/dashboard');
        } catch (error) {
            toast({
                title: 'Login failed',
                description: 'Invalid credentials',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl"></div>

            <div className="w-full max-w-md animate-fade-in relative z-10">
                <div className="glass-panel p-8 rounded-3xl border border-white/20 dark:border-white/5 shadow-2xl space-y-8 bg-white/40 dark:bg-black/40 backdrop-blur-xl">
                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="p-3 bg-white rounded-2xl shadow-sm inline-block">
                                <img
                                    src="https://mediafirewall.ai/images/offer-page/logo/mfw-logo.png"
                                    alt="MediaFirewall Logo"
                                    className="w-12 h-12 object-contain"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold text-foreground tracking-tight">Client Portal Login</h1>
                            <p className="text-muted-foreground">Enter your credentials to access the dashboard</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-purple-600" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Shaadi@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 h-12 bg-white/50 dark:bg-black/50 border-gray-200 dark:border-gray-800 transition-all duration-200 rounded-xl"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-purple-600" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 h-12 bg-white/50 dark:bg-black/50 border-gray-200 dark:border-gray-800 transition-all duration-200 rounded-xl"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 rounded-xl"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Sign in <ArrowRight className="w-4 h-4" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        © 2026 MediaFirewall AI. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
