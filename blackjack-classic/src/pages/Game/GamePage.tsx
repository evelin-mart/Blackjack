import React from 'react';
import { Layout } from 'antd';
import styles from './gamepage.styles.module.css';
import { Stats } from '../../components/stats';
import { GameField } from '../../components/gamefield';

const { Header, Content, Footer } = Layout;

export const GamePage = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className={styles.header}>
                <h3 className={styles.title}>Blackjack classic</h3>
            </Header>
            <Content className={styles.content}>
                <GameField />
            </Content>
            <Footer className={styles.footer}>
                <Stats />
            </Footer>
        </Layout>
    );
};
