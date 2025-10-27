import React, { useState, useEffect } from "react";
import { Button, Text } from "@stellar/design-system";
import * as StellarSdk from "@stellar/stellar-sdk";

export const TokenBalance: React.FC = () => {
  const [balance, setBalance] = useState<string>("--");
  const [loading, setLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string>("");
  const [freighterAvailable, setFreighterAvailable] = useState(false);

  const CONTRACT_ID = "CCN7OR2QAWZYXPNVRU35GMMA7HHYJF733V45NEMAIUJVEMJ5PW6RAGVK";
  const RPC_URL = "https://soroban-testnet.stellar.org";

  useEffect(() => {
    const checkFreighter = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        const freighterApi = await import("@stellar/freighter-api");
        const available = await freighterApi.isAllowed();
        setFreighterAvailable(available);
        console.log("✅ Freighter disponible:", available);
      } catch (error) {
        console.log("⚠️ Error verificando Freighter:", error);
        setFreighterAvailable(false);
      }
    };
    
    checkFreighter();
  }, []);

  const connectWallet = async () => {
    try {
      console.log("🔍 Intentando conectar con Freighter...");
      
      const freighterApi = await import("@stellar/freighter-api");
      
      console.log("🔑 Solicitando acceso...");
      
      const publicKeyResponse = await freighterApi.requestAccess();
      
      console.log("📦 Respuesta recibida:", publicKeyResponse);
      
      if (publicKeyResponse && publicKeyResponse.error) {
        throw new Error(publicKeyResponse.error);
      }
      
      const pk = typeof publicKeyResponse === 'string' 
        ? publicKeyResponse 
        : publicKeyResponse.address;
      
      console.log("✅ Public key obtenida:", pk);
      
      setPublicKey(pk);
      setWalletConnected(true);
      
    } catch (error: any) {
      console.error("❌ Error completo:", error);
      alert(`Error al conectar: ${error.message}`);
    }
  };

  const getBalance = async () => {
    if (!walletConnected || !publicKey) {
      alert("Primero conectá tu wallet");
      return;
    }

    setLoading(true);
    try {
      console.log("📊 Obteniendo balance para:", publicKey);
      
      // NOTA: En v14.x se usa .rpc.Server en lugar de .SorobanRpc.Server
      const server = new StellarSdk.rpc.Server(RPC_URL);
      const contract = new StellarSdk.Contract(CONTRACT_ID);
      
      console.log("✅ Server y contract creados");
      
      const sourceAccount = await server.getAccount(publicKey);
      
      console.log("✅ Account obtenida");
      
      const operation = contract.call(
        'balance',
        StellarSdk.nativeToScVal(publicKey, { type: 'address' })
      );

      console.log("✅ Operación creada");

      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: '100',
        networkPassphrase: StellarSdk.Networks.TESTNET
      })
        .addOperation(operation)
        .setTimeout(30)
        .build();

      console.log("🔄 Simulando transacción...");
      
      const simulated = await server.simulateTransaction(transaction);
      
      console.log("📦 Resultado simulación:", simulated);
      
      if (simulated.results && simulated.results.length > 0) {
        const result = simulated.results[0].retval;
        const balanceValue = StellarSdk.scValToNative(result);
        
        console.log("✅ Balance raw:", balanceValue);
        
        const formattedBalance = (Number(balanceValue) / 10000000).toFixed(2);
        setBalance(formattedBalance);
        
        console.log("✅ Balance formateado:", formattedBalance);
      } else {
        throw new Error('No se pudo obtener el balance');
      }

    } catch (error: any) {
      console.error("❌ Error obteniendo balance:", error);
      alert("Error al obtener balance: " + error.message);
      setBalance("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
      padding: '25px',
      borderRadius: '12px',
      marginTop: '25px',
      border: '2px solid #667eea'
    }}>
      <Text as="h3" size="md" style={{ color: '#667eea', marginBottom: '15px' }}>
        🦈 Balance de Tokens BDB
      </Text>
      
      <div style={{
        padding: '10px',
        marginBottom: '15px',
        background: freighterAvailable ? '#e8f5e9' : '#fff3e0',
        borderRadius: '8px',
        fontSize: '12px'
      }}>
        {freighterAvailable ? (
          <span>✅ Freighter detectado</span>
        ) : (
          <span>⚠️ Verificando Freighter...</span>
        )}
      </div>
      
      {!walletConnected ? (
        <div>
          <Button
            onClick={connectWallet}
            style={{
              width: '100%',
              background: '#667eea',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '15px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            🦈 Conectar Freighter
          </Button>
          
          <Text as="p" size="sm" style={{ color: '#666', textAlign: 'center', fontSize: '11px' }}>
            Asegurate de estar en Testnet
          </Text>
        </div>
      ) : (
        <div style={{ 
          marginBottom: '15px',
          padding: '10px',
          background: '#e8f5e9',
          borderRadius: '8px'
        }}>
          <Text as="p" size="sm" style={{ color: '#2e7d32', margin: 0, fontSize: '12px' }}>
            ✅ Conectada: {publicKey.slice(0, 8)}...{publicKey.slice(-8)}
          </Text>
        </div>
      )}
      
      <div style={{ 
        textAlign: 'center',
        margin: '20px 0',
        padding: '20px',
        background: 'white',
        borderRadius: '8px'
      }}>
        <Text as="p" size="xl" style={{ 
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#764ba2',
          margin: 0
        }}>
          {balance} <span style={{ fontSize: '24px' }}>BDB</span>
        </Text>
      </div>

      <Button
        onClick={getBalance}
        disabled={loading || !walletConnected}
        style={{
          width: '100%',
          background: loading || !walletConnected ? '#ccc' : '#4CAF50',
          color: 'white',
          padding: '12px',
          borderRadius: '8px',
          border: 'none',
          cursor: loading || !walletConnected ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        {loading ? "⏳ Consultando..." : "📊 Ver Balance"}
      </Button>
    </div>
  );
};

