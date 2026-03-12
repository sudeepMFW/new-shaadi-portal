import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, Sparkles, Copy, Eraser, RotateCw, UserX, ExternalLink, Heart } from 'lucide-react';
import { ImageAnalysis } from '@/components/ImageAnalysis';
import { DuplicateTest } from '@/components/tools/DuplicateTest';
import { SingleImageTool } from '@/components/tools/SingleImageTool';
import { removeText, rotateImage, blurFace } from '@/lib/api';

type DashboardView = 'grid' | 'image-analysis' | 'duplicate' | 'text-removal' | 'rotation' | 'face-blur';

export function NewDashboard() {
    const { user, logout } = useAuth();
    const [activeView, setActiveView] = useState<DashboardView>('grid');

    const products = [
        {
            id: 'matchmaking',
            name: 'Matchmaking AI',
            description: 'AI powered matchmaking intelligence system.',
            icon: Heart,
            color: 'from-purple-500 to-indigo-500',
            action: () => window.open('https://matchmaker-ai-xi.vercel.app/login', '_blank'),
            external: true
        },
        {
            id: 'image-analysis',
            name: 'Image Analysis',
            description: 'Deep analysis of images with expert AI agents.',
            icon: Sparkles,
            color: 'from-fuchsia-500 to-purple-500',
            action: () => setActiveView('image-analysis')
        },
        {
            id: 'duplicate',
            name: 'Duplicate Detector',
            description: 'Compare images to find exact or near-duplicates.',
            icon: Copy,
            color: 'from-blue-500 to-indigo-500',
            action: () => setActiveView('duplicate')
        },
        {
            id: 'text-removal',
            name: 'Text Remover',
            description: 'Intelligently remove text from any image.',
            icon: Eraser,
            color: 'from-pink-500 to-rose-500',
            action: () => setActiveView('text-removal')
        },
        {
            id: 'rotation',
            name: 'Image Rotator',
            description: 'Automatically correct image orientation.',
            icon: RotateCw,
            color: 'from-orange-500 to-amber-500',
            action: () => setActiveView('rotation')
        },
        {
            id: 'face-blur',
            name: 'Face Blur',
            description: 'Automated privacy protection through face blurring.',
            icon: UserX,
            color: 'from-red-500 to-orange-500',
            action: () => setActiveView('face-blur')
        }
    ];

    const renderContent = () => {
        switch (activeView) {
            case 'image-analysis':
                return <ImageAnalysis onBack={() => setActiveView('grid')} />;
            case 'duplicate':
                return <DuplicateTest onBack={() => setActiveView('grid')} />;
            case 'text-removal':
                return (
                    <SingleImageTool
                        onBack={() => setActiveView('grid')}
                        type="text-removal"
                        title="Text Remover"
                        description="Remove unwanted text from your images intelligently."
                        icon={Eraser}
                        iconColor="text-pink-500"
                        processFunction={(source) => removeText(source, 'mask')}
                    />
                );
            case 'rotation':
                return (
                    <SingleImageTool
                        onBack={() => setActiveView('grid')}
                        type="rotation"
                        title="Image Rotator"
                        description="Automatically correct image orientation."
                        icon={RotateCw}
                        iconColor="text-orange-500"
                        processFunction={rotateImage}
                    />
                );
            case 'face-blur':
                return (
                    <SingleImageTool
                        onBack={() => setActiveView('grid')}
                        type="face-blur"
                        title="Face Blur"
                        description="Automatically detect and blur faces for privacy."
                        icon={UserX}
                        iconColor="text-red-500"
                        processFunction={blurFace}
                    />
                );
            case 'grid':
            default:
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-4xl font-bold text-foreground tracking-tight">Products Dashboard</h1>
                            <p className="text-muted-foreground text-lg">Select a tool to get started with your AI journey.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product, idx) => (
                                <div
                                    key={product.id}
                                    className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                                    onClick={product.action}
                                >
                                    {/* Hover background gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`}></div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/10`}>
                                            <product.icon className="w-7 h-7" />
                                        </div>

                                        <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors">{product.name}</h3>
                                        <p className="text-muted-foreground leading-relaxed mb-6 flex-1 text-sm">{product.description}</p>

                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 flex items-center">
                                                {product.external ? 'Access Platform' : 'Open Tool'}
                                                {product.external ? <ExternalLink className="w-4 h-4 ml-2" /> : <ArrowRight className="w-4 h-4 ml-2" />}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Subtle border accent on hover */}
                                    <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${product.color} transition-all duration-300 w-0 group-hover:w-full`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-zinc-800 px-6 py-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Shaadi.com_logo.svg/1280px-Shaadi.com_logo.svg.png"
                            alt="Shaadi Logo"
                            className="h-8 object-contain"
                        />
                        <div className="w-px h-6 bg-gray-200 dark:bg-zinc-800 mx-2 hidden sm:block"></div>
                        <span className="text-sm font-medium text-muted-foreground hidden sm:block uppercase tracking-widest px-2">Insights</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={logout}
                            className="text-muted-foreground hover:text-destructive transition-colors duration-200"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    {renderContent()}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 border-t border-gray-100 dark:border-zinc-800">
                <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
                    © 2026 MediaFirewall AI for Shaadi.com
                </div>
            </footer>
        </div>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
