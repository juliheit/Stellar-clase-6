import React, { useState } from 'react';
import { Wallet, Copy, CheckCircle, ExternalLink } from 'lucide-react';

interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  contractId: string;
}

const App: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('0');
  const [tokenInfo] = useState<TokenInfo>({
    name: 'BuenDia Builder',
    symbol: 'BDB',
    decimals: 7,
    totalSupply: '1,000,000',
    contractId: 'CBVT5C7O24E66YS7P5CCGQZG4ULXFKBPFNLCW7MNABVBBMW7VZU3WCRD'
  });
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const connectWallet = async (): Promise<void> => {
    setLoading(true);
    // Simulación de conexión de wallet
    setTimeout(() => {
      setWalletConnected(true);
      setWalletAddress('GAXYZ...ABCD123');
      setBalance('125.5');
      setLoading(false);
    }, 1000);
  };

  const disconnectWallet = (): void => {
    setWalletConnected(false);
    setWalletAddress('');
    setBalance('0');
  };

  const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateAddress = (address: string): string => {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-purple-500/20 p-4 rounded-2xl mb-4">
            <Wallet className="w-12 h-12 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Token BDB</h1>
          <p className="text-purple-300">por ju</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Contract ID Section */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-purple-200 text-sm mb-1">Contract ID</p>
                <p className="text-white font-mono text-sm break-all">
                  {truncateAddress(tokenInfo.contractId)}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(tokenInfo.contractId)}
                className="ml-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                {copied ? (
                  <CheckCircle className="w-5 h-5 text-green-300" />
                ) : (
                  <Copy className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Token Info Section */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="text-2xl mr-2">📊</span>
              Información del Token
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-purple-300 text-sm mb-1">Nombre</p>
                <p className="text-white font-semibold">{tokenInfo.name}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-purple-300 text-sm mb-1">Símbolo</p>
                <p className="text-white font-semibold">{tokenInfo.symbol}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-purple-300 text-sm mb-1">Decimales</p>
                <p className="text-white font-semibold">{tokenInfo.decimals}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-purple-300 text-sm mb-1">Total Supply</p>
                <p className="text-white font-semibold">{tokenInfo.totalSupply} {tokenInfo.symbol}</p>
              </div>
            </div>

            {/* Wallet Section */}
            <div className="border-t border-white/10 pt-6">
              {!walletConnected ? (
                <div className="text-center">
                  <button
                    onClick={connectWallet}
                    disabled={loading}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Conectando...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Wallet className="w-5 h-5 mr-2" />
                        Conectar Wallet
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold flex items-center">
                      <span className="text-xl mr-2">✅</span>
                      Wallet Conectada
                    </h3>
                    <button
                      onClick={disconnectWallet}
                      className="text-purple-300 hover:text-purple-200 text-sm transition-colors"
                    >
                      Desconectar
                    </button>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 mb-4">
                    <p className="text-purple-300 text-sm mb-1">Dirección</p>
                    <div className="flex items-center justify-between">
                      <p className="text-white font-mono">{walletAddress}</p>
                      <a
                        href={`https://stellar.expert/explorer/testnet/account/${walletAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-4 border border-green-500/30">
                    <p className="text-green-300 text-sm mb-1">Tu Balance</p>
                    <p className="text-white text-3xl font-bold">
                      {balance} <span className="text-xl text-green-300">{tokenInfo.symbol}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-purple-300 text-sm">
            Powered by Stellar Network
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;

