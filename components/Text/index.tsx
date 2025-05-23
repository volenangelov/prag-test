import { Container } from '@/components/craft';
import React, { FC, ReactNode } from 'react';

interface TextProps {
    width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
    heading?: string;
    content?: string;
    children?: ReactNode;
    className: string;
}

const Text: FC<TextProps> = ({
    width = '4xl',
    heading,
    content,
    children,
    className
}) => {
    
    const maxWidthClasses: Record<string, string> = {
        'sm': 'max-w-sm',
        'md': 'max-w-md',
        'lg': 'max-w-lg',
        'xl': 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
    };

    const maxWidthClass = maxWidthClasses[width] || 'max-w-4xl';

    return (
        <div className={`text-block ${className}`}>
            <Container className={`w-full ${maxWidthClass}`}>
                {heading && (
                    <p className="text-3xl md:text-4xl text-center font-bold">
                        {heading}
                    </p>
                )}

                {content && (
                    <div
                        className="mt-6 md:mt-12 text-gray-500 dark:text-gray-50 text-lg text-center"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                )}

                {children}
            </Container>
        </div>
    );
};

export default Text;