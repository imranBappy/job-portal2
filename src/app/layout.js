/* eslint-disable @next/next/no-sync-scripts */
import { Inter } from 'next/font/google';
import './globals.css';
import '../components/Layout/style.css';

import Provider from '@/components/Provider/Provider';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Welcome to Wrightalent',
    description:
        'Wrightalent is a platform that connects job seekers with employers. We help job seekers find the right job and employers find the right candidate.',
    start_url: '/',
    applicationName: 'Wrightalent',
    keywords: [
        'Wrightalent',
        'Job',
        'Employer',
        'Job Seeker',
        'Job Search',
        'Job Listing',
        'Job Application',
        'Job Posting',
        'Job Board',
        'Job Portal',
        'Job Vacancy',
        'Job Opportunity',
        'Job Site',
        'Job Finder',
        'Job Opening',
        'Job Placement',
        'Job Recruitment',
        'Job Search Engine',
        'Job Seeker Website',
        'Job Seeker Platform',
        'Job Seeker App',
        'Job Seeker Service',
        'Job Seeker Community',
        'Job Seeker Network',
        'Job Seeker Portal',
        'Job Seeker Marketplace',
        'Job Seeker Directory',
        'Job Seeker Listing',
        'Job Seeker Application',
        'Job Seeker Posting',
        'Job Seeker Board',
        'Job Seeker Portal',
        'Job Seeker Vacancy',
        'Job Seeker Opportunity',
        'Job Seeker Site',
        'Job Seeker Finder',
        'Job Seeker Opening',
        'Job Seeker Placement',
        'Job Seeker Recruitment',
        'Job Seeker Search Engine',
        'Job Seeker Website',
        'Job Seeker Platform',
        'Job Seeker App',
        'Job Seeker Service',
        'Job Seeker Community',
        'Job Seeker Network',
        'Job Seeker Portal',
        'Job Seeker Marketplace',
        'Job Seeker Directory',
        'Job Seeker Listing',
        'Job Seeker Application',
        'Job Seeker Posting',
        'Job Seeker Board',
        'Job Seeker Portal',
        'Job Seeker Vacancy',
        'Job Seeker Opportunity',
        'Job Seeker Site',
        'Job Seeker Finder',
        'Job Seeker Opening',
        'Job Seeker Placement',
        'Job Seeker Recruitment',
        'Job Seeker Search Engine',
        'Job Seeker Website',
        'Job Seeker Platform',
        'Job Seeker App',
        'Job Seeker Service',
        'Job Seeker Community',
        'Job Seeker Network',
        'Job Seeker Portal',
        'Job Seeker Marketplace',
        'Job Seeker Directory',
        'Job Seeker Listing',
        'Job Seeker Application',
        'Job Seeker Posting',
        'Job Seeker Board',
        'Job Seeker Portal',
    ],
    generator: 'Next.js',
    manifest: '/manifest.webmanifest',
    image: '/android-chrome-512x512.png',
    url: 'https://www.wrightalent.com',
    siteName: 'Wrightalent',
    openGraph: {
        title: 'Welcome to Wrightalent',
        description:
            'Wrightalent is a platform that connects job seekers with employers. We help job seekers find the right job and employers find the right candidate.',
        url: 'https://www.wrightalent.com',
        siteName: 'Wrightalent',
        images: [
            {
                url: 'https://w3storage.s3-ap-south-1.amazonaws.com/wrightalentstage/profile/ug2wwingRxJiUFbaxNgN7U.png', // Must be an absolute URL
                width: 800,
                height: 600,
            },
            {
                url: 'https://w3storage.s3-ap-south-1.amazonaws.com/wrightalentstage/profile/ug2wwingRxJiUFbaxNgN7U.png', // Must be an absolute URL
                width: 1800,
                height: 1600,
                alt: 'Wrightalent',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    icons: {
        icon: [{ url: '/favicon.ico' }],
        shortcut: ['/android-chrome-512x512.png'],
        apple: [
            { url: '/apple-touch-icon.png' },
            {
                url: '/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                style={{ margin: 0, overflowX: 'hidden' }}
                className={inter.className}
            >
                <script src="html2pdf.bundle.min.js"></script>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
