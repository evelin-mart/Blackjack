import React from 'react';
import { Layout, Typography } from 'antd';
import { Navigation } from '../navigation';
import styles from './layout.styles.module.css';

const { Header, Content, Footer } = Layout;

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                <Navigation />
            </Header>
            <Content className={styles.layout}>{children}</Content>
            <Footer className={styles.footer}>
                {'© '}
                <Typography.Link
                    href="https://github.com/evelin-mart"
                    target="blank"
                    rel="noreferrer"
                >
                    evelin-mart
                </Typography.Link>
                {' for '}
                <Typography.Link href="https://www.evolution.com/" target="blank" rel="noreferrer">
                    Evolution
                </Typography.Link>
                {' TS Bootcamp 2023'}
            </Footer>
        </Layout>
    );
};
