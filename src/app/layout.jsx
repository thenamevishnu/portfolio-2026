import { Geom } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/providers/DataProvider";
import { MaintenanceModal } from "@/components/Maintenance";
import { CursorFollower } from "@/components/CursorFollower";

const geom = Geom({
    variable: "--font-geom",
    subsets: ["latin"],
    fallback: ["sans-serif"],
    weight: "400"
})

export const metadata = {
    title: "Vishnu M K | Best Full Stack MERN & AI Developer in Kozhikode, Kerala",
    description:
        "Vishnu M K is a premium Full Stack Web Developer and AI Engineer based in Vadakara, Kozhikode. Specializing in high-performance Next.js architectures, complex MERN stack systems, React Native mobile solutions, and custom AI API integration.",
    keywords: [
        "vishnu m k",
        "vishnumk",
        "thenamevishnu",
        "best full stack developer in kozhikode",
        "best mern stack developer in kozhikode",
        "best web developer in kozhikode",
        "full stack developer in kerala",
        "mern stack developer kerala",
        "web development company kozhikode",
        "nextjs developer kerala",
        "ai developer kozhikode",
        "software engineer calicut",
        "freelance web developer kozhikode",
        "react native developer kerala",
        "nodejs developer calicut",
        "front end developer kozhikode",
        "back end developer kerala",
        "ui ux developer calicut",
        "hire web developer kerala",
        "software consultant kozhikode"
    ],
    authors: [{ name: "Vishnu M K", url: "https://vishnumk.in" }],
    creator: "Vishnu M K",
    publisher: "Vishnu M K",
    metadataBase: new URL("https://vishnumk.in"),
    alternates: {
        canonical: "/",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        title: "Vishnu M K | Elite Full Stack & AI Developer | Kozhikode, Kerala",
        description:
            "Premium software engineering services based in Kozhikode. Crafting elite Next.js applications, robust MERN backends, and responsive cross-platform mobile apps.",
        url: "https://vishnumk.in",
        siteName: "Vishnu M K | Portfolio",
        images: [
            {
                url: "/images/dev.jpg",
                width: 1200,
                height: 630,
                alt: "Vishnu M K - Full Stack & AI Developer Portfolio Overview",
            },
        ],
        locale: "en_US",
        type: "profile",
    },
    twitter: {
        card: "summary_large_image",
        title: "Vishnu M K | Full Stack & AI Engineer",
        description:
            "Self-taught Full-stack web developer specializing in Next.js, Node.js, and AI automation systems from Kozhikode, Kerala.",
        creator: "@mynamevishnu",
        images: ["/images/dev.jpg"],
    },
    category: "technology",
};

const RootLayout = ({ children }) => {
    return <html>
        <head>
            <meta name="google-adsense-account" content="ca-pub-1843044106366424"></meta>
        </head>
        <body className={`antialiased ${geom.className} ${geom.variable}`}>
            <DataProvider>
                <MaintenanceModal />
                <CursorFollower />
                {children}
            </DataProvider>
        </body>
    </html>
}

export default RootLayout;