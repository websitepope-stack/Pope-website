import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import AosInit from "@/components/ui/aos-init";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const SITE_URL = "https://popememorialhss.org";
const SITE_NAME = "Pope Memorial Higher Secondary School";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pope Memorial Higher Secondary School — Sawyerpuram | Est. 1844",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Pope Memorial Higher Secondary School, Sawyerpuram, Thoothukudi District, Tamil Nadu — nurturing generations of learners with academic excellence, strong values, and vibrant school life since 1844.",
  keywords: [
    "Pope Memorial Higher Secondary School",
    "Pope Memorial HSS",
    "Sawyerpuram school",
    "Thoothukudi schools",
    "Tamil Nadu higher secondary school",
    "best schools in Thoothukudi district",
    "Sawyerpuram education",
    "Pope Memorial Sawyerpuram",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Pope Memorial Higher Secondary School — Sawyerpuram",
    description:
      "Nurturing generations of learners — fostering excellence, building character, and shaping bright futures since 1844.",
    images: [
      {
        url: "/02.jpeg",
        width: 1400,
        height: 933,
        alt: "Aerial view of Pope Memorial Higher Secondary School campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pope Memorial Higher Secondary School — Sawyerpuram",
    description:
      "Nurturing generations of learners — fostering excellence, building character, and shaping bright futures since 1844.",
    images: ["/02.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.jpg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1b3a6b",
};

const schoolJsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: SITE_NAME,
  alternateName: "Pope Memorial HSS",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpg`,
  image: `${SITE_URL}/02.jpeg`,
  description:
    "Pope Memorial Higher Secondary School, Sawyerpuram, Thoothukudi District, Tamil Nadu — nurturing generations of learners since 1844.",
  foundingDate: "1844",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sawyerpuram",
    addressLocality: "Sawyerpuram",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  telephone: "+91-4630-273329",
  email: "popemhsss@gmail.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <AosInit />
        {children}
      </body>
    </html>
  );
}
