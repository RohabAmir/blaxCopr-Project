import type { Metadata } from 'next'
import { ConfigProvider } from 'antd';
import StyledComponentsRegistry from '@/lib/Antd/AntdRegistery';
import { theme } from "@/lib/Antd/Config"
import '../globals.scss'
import AuthContainer from '@/contexts/Auth';

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
                        <AuthContainer>
                            {children}
                        </AuthContainer>
                    </ConfigProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}
