import React from 'react';
import { Layout } from 'antd';
import { Navigation } from '../navigation';
import styles from './layout.module.css';

const { Header, Content, Footer } = Layout;

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header>
                <Navigation />
            </Header>
            <Content className={styles.layout}>{children}</Content>
            <Footer>© Evelin Martsina for Evolution 2023</Footer>
        </Layout>
    );
};
