
import './globals.css'
import { Poppins, Playfair_Display, Ephesis } from 'next/font/google'
import { ThemeProvider } from "@/components/ThemeProvider"
import { SpeedInsights } from "@vercel/speed-insights/next"


const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})

const ephesis = Ephesis({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-ephesis'
})

export const metadata = {
  title: 'Guru Krithick - Portfolio',
  description: 'Personal portfolio website of Guru Krithick',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${playfair.variable} ${ephesis.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <SpeedInsights />
          
        </ThemeProvider>
        
      </body>
    </html>
  )
}

