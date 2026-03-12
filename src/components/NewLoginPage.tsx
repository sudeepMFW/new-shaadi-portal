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
                description: 'Please check your credentials',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-background">
            {/* Left Column - Visual */}
            <div className="hidden lg:flex relative flex-col justify-between p-12 bg-primary overflow-hidden isolate">
                {/* Abstract Background Shapes */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] rounded-full bg-purple-500/30 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] rounded-full bg-blue-500/30 blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3">
                        {/* Original Logo Reverted */}
                        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                            <img
                                src="https://mediafirewall.ai/images/logo.png"
                                alt="MediaFirewall Logo"
                                className="w-8 h-8 object-contain"
                            />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">
                            MediaFirewall
                        </span>
                    </div>
                </div>

                <div className="relative z-10 max-w-xl space-y-8">
                    {/* Foreground Video Player */}
                    <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
                        <video
                            src="https://mfwstorage1.blob.core.windows.net/new-filters/Romancee_Scams.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    <div>
                        <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                            Mediafirewall<br />
                            <div className="flex items-center gap-4">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-blue-200">
                                    Innovation Lab
                                </span>
                                {/* Bamboo Logo Next to Text */}
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/053/775/838/non_2x/lush-bamboo-plant-isolated-for-decorative-use-on-transparent-background-png.png"
                                    alt="Bamboo"
                                    className="w-16 h-16 object-contain drop-shadow-lg"
                                />
                            </div>
                        </h1>
                        <p className="text-purple-100 text-lg leading-relaxed">
                            An AI Computer Vision Platform Trusted for Safety, Compliance, and Scale.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-4 text-purple-200 text-sm font-medium">
                    <span>© MediaFirewall Inc.</span>
                    <span className="w-1 h-1 rounded-full bg-purple-400"></span>
                    <span>Privacy Policy</span>
                    <span className="w-1 h-1 rounded-full bg-purple-400"></span>
                    <span>Terms</span>
                </div>
            </div>

            {/* Right Column - Form */}
            <div className="flex items-center justify-center p-8 lg:p-12 relative overflow-hidden">
                {/* Mobile Background decoration */}
                <div className="absolute inset-0 lg:hidden overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
                </div>

                <div className="w-full max-w-md animate-fade-in space-y-8 glass-panel p-8 rounded-3xl border-2 border-gray-200 dark:border-gray-800 shadow-xl bg-white/40 dark:bg-black/40 backdrop-blur-xl">
                    <div className="text-center lg:text-left space-y-2">
                        <h2 className="text-3xl font-bold text-foreground tracking-tight">Login</h2>
                        <p className="text-muted-foreground"></p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 h-11 bg-white/50 dark:bg-black/50 border-2 border-gray-300 dark:border-gray-700 focus:border-primary focus:bg-white dark:focus:bg-black transition-all duration-200"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 h-11 bg-white/50 dark:bg-black/50 border-2 border-gray-300 dark:border-gray-700 focus:border-primary focus:bg-white dark:focus:bg-black transition-all duration-200"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>


                        <Button
                            type="submit"
                            className="w-full h-11 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    Signing in...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Sign in <ArrowRight className="w-4 h-4" />
                                </span>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

