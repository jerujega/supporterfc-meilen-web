import * as React from 'react';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <div id="sanity">{children}</div>
            </body>
        </html>
    );
}
