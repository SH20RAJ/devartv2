'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ApiStatusNoticeProps {
    show: boolean;
    message?: string;
}

export function ApiStatusNotice({ show, message = "We're currently experiencing issues with our data source. Showing sample content." }: ApiStatusNoticeProps) {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        setIsVisible(show);
    }, [show]);

    if (!isVisible) return null;

    return (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="flex-1">
                    <p className="text-sm text-amber-800">
                        {message}
                    </p>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="ml-3 text-amber-600 hover:text-amber-800 transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}