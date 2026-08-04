import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/home/header/Navbar';
import { Sparkles, BookOpen, Users, Heart, Zap, Code, Globe, ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'About Us | Modern Publishing Platform',
    description: 'Learn about our mission, vision, and community platform.',
};

const stats = [
    { label: 'Articles Published', value: '1,200+' },
    { label: 'Active Readers', value: '50k+' },
    { label: 'Community Authors', value: '300+' },
    { label: 'Monthly Views', value: '250k+' },
];

const features = [
    {
        icon: Zap,
        title: 'Instant Performance',
        description: 'Built on Next.js App Router and server components for fast page loads.',
    },
    {
        icon: Heart,
        title: 'Optimistic Interactions',
        description: 'Like, comment, and save articles with instant UI responses.',
    },
    {
        icon: Code,
        title: 'Rich Content Creation',
        description: 'Draft articles easily with clean rich-text editing and image support.',
    },
    {
        icon: Globe,
        title: 'Global Community',
        description: 'Connect with developers and creators sharing deep insights globally.',
    },
];

const team = [
    {
        name: 'Foisal Ahmed Fahim',
        role: 'Founder & Full-Stack Engineer',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
        bio: 'Passionate about building modern web apps with React, Next.js, and clean UI.',
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-blue-500/10 py-16 sm:py-24 text-center">
                <div className="container mx-auto max-w-4xl px-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                        Our Mission
                    </span>

                    <h1 className="mt-6 text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                        Empowering developers to <br />
                        <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                            share and learn together
                        </span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-muted-foreground">
                        An open platform for developers and writers to publish deep-dive technical articles and guides.
                    </p>

                    <div className="mt-8 flex items-center justify-center gap-4">
                        <Link
                            href="/articles"
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
                        >
                            Explore Articles <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/create-article"
                            className="inline-flex items-center gap-2 rounded-xl border border-blue-500/20 bg-card px-5 py-2.5 text-sm font-semibold hover:bg-accent transition-colors"
                        >
                            Start Writing
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="border-b border-blue-500/10 bg-blue-500/5 py-10">
                <div className="container mx-auto max-w-5xl px-4">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 text-center">
                        {stats.map((stat) => (
                            <div key={stat.label}>
                                <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                                    {stat.value}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16">
                <div className="container mx-auto max-w-5xl px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold">Why Platform Features</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={feature.title}
                                    className="rounded-2xl border border-blue-500/10 bg-card p-5 space-y-3 shadow-sm hover:border-blue-500/30 transition-all"
                                >
                                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-base font-bold">{feature.title}</h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Creator / Team Section */}
            <section className="border-t border-blue-500/10 py-16 bg-card/40">
                <div className="container mx-auto max-w-5xl px-4">
                    <div className="text-center mb-12 space-y-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                            <Users className="h-3.5 w-3.5" />
                            Creator
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold">Behind the Platform</h2>
                    </div>

                    <div className="flex justify-center">
                        {team.map((member) => (
                            <div
                                key={member.name}
                                className="w-full max-w-md rounded-2xl border border-blue-500/10 bg-card p-6 space-y-4 shadow-sm hover:border-blue-500/30 transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="relative h-14 w-14 overflow-hidden rounded-full border border-blue-500/20">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                            sizes="56px"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold">{member.name}</h3>
                                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                    {member.bio}
                                </p>

                                {/* Developer Social Links */}
                                <div className="pt-2 flex items-center gap-4 text-muted-foreground">
                                    <a
                                        href="https://github.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-blue-500 transition-colors"
                                        aria-label="GitHub Profile"
                                    >
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-blue-500 transition-colors"
                                        aria-label="Twitter Profile"
                                    >
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 text-center">
                <div className="container mx-auto max-w-3xl px-4">
                    <div className="rounded-2xl border border-blue-500/20 bg-blue-600 p-8 text-white shadow-lg space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-bold">Have a story to share?</h2>
                        <p className="text-sm text-blue-100 max-w-md mx-auto">
                            Join our contributors. Write technical articles and connect with readers worldwide.
                        </p>
                        <div>
                            <Link
                                href="/dashboard/articles/create"
                                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 transition-colors"
                            >
                                Write Your Article <BookOpen className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}