import React from "react";
import { Code, Layout, Text } from "@stellar/design-system";
import { TokenBalance } from "../components/TokenBalance";

const Home: React.FC = () => (
  <Layout.Content>
    <Layout.Inset>
      {/* Título profesional */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '30px',
        borderRadius: '15px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <Text as="h1" size="xl" style={{ color: 'white', marginBottom: '10px' }}>
          Token BDB - Stellar DApp
        </Text>
        <Text as="p" size="lg" style={{ color: 'white' }}>
          Desarrollado por Juli
        </Text>
      </div>

      {/* Mensaje de bienvenida profesional */}
      <div style={{
        background: '#f0f4ff',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '25px',
        border: '2px solid #667eea'
      }}>
        <Text as="h2" size="lg" style={{ color: '#667eea', marginBottom: '15px' }}>
          Bienvenida
        </Text>
        <Text as="p" size="md" style={{ marginBottom: '10px' }}>
          Aplicación descentralizada para interactuar con el Token BDB en la red Stellar.
        </Text>
        <Text as="p" size="md">
          Este proyecto fue desarrollado como parte del programa Buen Día Builders.
        </Text>
      </div>

      <Text as="h2" size="lg" style={{ color: '#764ba2', marginBottom: '15px' }}>
        Características del Proyecto
      </Text>
      <ul style={{ marginLeft: '20px', marginBottom: '25px' }}>
        <li><Text as="span" size="md">Smart Contract implementado en Rust con Soroban SDK</Text></li>
        <li><Text as="span" size="md">Frontend desarrollado con React y TypeScript</Text></li>
        <li><Text as="span" size="md">Integración completa con Freighter Wallet</Text></li>
        <li><Text as="span" size="md">Deployado y verificado en Stellar Testnet</Text></li>
        <li><Text as="span" size="md">Funcionalidades: mint, burn, transfer, approve, allowances</Text></li>
      </ul>

      <div style={{
        background: '#e8f5e9',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px',
        border: '2px solid #4CAF50'
      }}>
        <Text as="h3" size="md" style={{ color: '#2e7d32', marginBottom: '10px' }}>
          Stack Tecnológico
        </Text>
        <Text as="p" size="sm">
          <strong>Backend:</strong> Rust, Soroban SDK 23.0.2<br/>
          <strong>Frontend:</strong> React, TypeScript, Stellar Design System<br/>
          <strong>Blockchain:</strong> Stellar Network (Testnet)<br/>
          <strong>Wallet Integration:</strong> Freighter
        </Text>
      </div>

      <div style={{ 
        marginTop: '20px',
        padding: '15px',
        background: '#fff3e0',
        borderRadius: '10px',
        border: '2px solid #ff9800'
      }}>
        <Text as="h3" size="md" style={{ color: '#e65100', marginBottom: '10px' }}>
          Información del Contrato
        </Text>
        <Text as="p" size="sm" style={{ wordBreak: 'break-all', fontFamily: 'monospace' }}>
          <strong>Contract ID:</strong><br/>
          CCN7OR2QAWZYXPNVRU35GMMA7HHYJF733V45NEMAIUJVEMJ5PW6RAGVK
        </Text>
        <Text as="p" size="sm" style={{ marginTop: '10px' }}>
          <strong>Red:</strong> Stellar Testnet<br/>
          <strong>Explorer:</strong> <a href="https://stellar.expert/explorer/testnet/contract/CCN7OR2QAWZYXPNVRU35GMMA7HHYJF733V45NEMAIUJVEMJ5PW6RAGVK" target="_blank" rel="noopener noreferrer" style={{ color: '#ff9800' }}>Ver en Stellar Expert</a>
        </Text>
      </div>
     <TokenBalance />

    </Layout.Inset>
  </Layout.Content>
);

export default Home;


