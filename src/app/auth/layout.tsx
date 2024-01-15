import type { Metadata } from 'next'
import { ConfigProvider } from 'antd';
import StyledComponentsRegistry from '@/lib/Antd/AntdRegistery';
import { theme } from "@/lib/Antd/Config"
import AuthContextContainer from '@/contexts/Auth';
import AppContextContainer from '@/contexts/App';
import '../globals.scss'

export const metadata: Metadata = {
    title: 'Blaxcorp',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <StyledComponentsRegistry>
                    <ConfigProvider theme={theme}>
                        <AuthContextContainer>
                            <AppContextContainer>
                                {children}
                            </AppContextContainer>
                        </AuthContextContainer>
                    </ConfigProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}
