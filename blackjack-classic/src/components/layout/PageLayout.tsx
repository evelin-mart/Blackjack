import React from 'react';
import { Layout } from 'antd';
import { Navigation } from '../navigation';

const { Header, Content, Footer } = Layout;

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header>
                <Navigation />
            </Header>
            <Content>{children}</Content>
            <Footer>Footer</Footer>
        </Layout>
    );
};
