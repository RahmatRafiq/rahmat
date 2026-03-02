import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-20">
                {children}
            </main>
            <footer className="py-12 border-t border-border">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Rahmat. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6 text-muted-foreground">
                        <a href="mailto:rahmatrafiq.1999@gmail.com" className="hover:text-foreground">Email</a>
                        <a href="https://www.linkedin.com/in/rahmat-r-079209247/" className="hover:text-foreground">LinkedIn</a>
                        <a href="https://github.com/RahmatRafiq" className="hover:text-foreground">GitHub</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
