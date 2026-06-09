import { Geom } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/providers/DataProvider";
import MaintenanceModal from "@/components/CloseAlert";

const geom = Geom({
    variable: "--font-geom",
    subsets: ["latin"],
    fallback: ["sans-serif"],
    weight: "400"
})

export const metadata = {
    title: "VISHNU M K",
    description: "Portfolio of VISHNU M K",
    keywords: "VISHNU M K, Portfolio, Developer, Web Developer, Software Developer"
}

const RootLayout = ({ children }) => {
    return <html>
        <body className={`antialiased ${geom.className} ${geom.variable}`}>
            <DataProvider>
                <MaintenanceModal />
                {children}
            </DataProvider>
        </body>
    </html>
}

export default RootLayout;