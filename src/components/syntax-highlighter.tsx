"use client";

import { useEffect } from 'react';

// Import Prism.js for syntax highlighting
import Prism from 'prismjs';
import '../styles/prism-theme.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';

interface SyntaxHighlighterProps {
    children: React.ReactNode;
}

export function SyntaxHighlighter({ children }: SyntaxHighlighterProps) {
    useEffect(() => {
        // Highlight all code blocks after component mounts
        Prism.highlightAll();
    }, [children]);

    return <div className="syntax-highlighter">{children}</div>;
}