import React from 'react';
import { Layout } from 'antd';
import styles from './gamepage.styles.module.css';
import { Stats } from '../../components/stats';

const { Header, Content, Footer } = Layout;

export const GamePage = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header>
                <h3 className={styles.header}>Blackjack classic</h3>
            </Header>
            <Content></Content>
            <Footer>
                <Stats />
            </Footer>
        </Layout>
    );
};
