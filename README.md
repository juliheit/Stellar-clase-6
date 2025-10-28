# 💫 Token BDB — Proyecto de Integración

Aplicación **frontend** desarrollada en **React** para interactuar con tokens en la **blockchain de Stellar**.  
Forma parte de la **Clase 6 del programa Código Futura** impulsado por **Buendía Builders**.

---

## 🌟 Descripción general

El proyecto muestra la información principal de un token creado en la red Stellar, incluyendo:

- Nombre, símbolo y decimales  
- Supply total  
- Dirección de la wallet conectada  
- Balance del usuario  

La interfaz fue diseñada con un estilo limpio, gradientes púrpura y componentes reutilizables, utilizando la librería **Lucide React** para los íconos.

---

## 📋  Requisitos

- **Node.js** v22 o superior  
- **npm**  
- **Docker** (usado para contenerización del entorno)  

---

## 🧩 Contexto del desarrollo

Durante el proceso se realizaron dos grandes etapas de trabajo:

### 🌀 Primer intento — conexión inicial
Se centró en establecer la conexión básica del frontend con la wallet **Freighter**, la configuración del entorno en **WSL** y la finalización de la interfaz de usuario (UI). El entorno fue configurado localmente con **Node.js** y **React**.  
Inicialmente, surgieron errores de compilación al intentar integrar el SDK de Stellar y los íconos de `lucide-react`, lo que impidió la ejecución correcta del proyecto:  
- **Errores:** `"Cannot resolve module 'lucide-react'"` y `"Unexpected token '<' in JSX"`.  
- **Problema:** Conflictos entre componentes y rutas de importación.  

Una vez resueltos estos problemas de entorno y compilación, se procedió a la conexión de la wallet. A pesar del éxito general, se encontraron dos obstáculos iniciales relacionados con la API de Freighter que fueron resueltos rápidamente.

#### Errores Iniciales Resueltos (Freighter API)

**Error 1: `getPublicKey is not a function`**  
- **Contexto:** Primer intento de conexión con Freighter.  
- **Causa:** La API de `@stellar/freighter-api` sufrió un cambio, eliminando la función independiente `getPublicKey()`.  
- **Solución:** Se actualizó el llamado para usar el método correcto del módulo: `freighterApi.requestAccess()`.

**Error 2: `publicKey.slice is not a function`**  
- **Contexto:** Después de resolver el Error 1 y recibir la respuesta de la wallet.  
- **Causa:** El método `requestAccess()` retorna un objeto `{address: 'GXXX...'}` y no directamente un string como se esperaba inicialmente.  
- **Solución:** Se realizó una corrección para extraer explícitamente la dirección de la respuesta: `publicKeyResponse.address`.

Una vez resueltos estos problemas, se completó la conexión exitosa y se procedió a la implementación de la lógica de Stellar SDK, donde surgieron los errores más complejos.

---

❌ Errores Encontrados

**Error 3: `Cannot read properties of undefined (reading 'Server')`**  
- **Contexto:** Al intentar obtener el balance del token.  
```bash
TypeError: Cannot read properties of undefined (reading 'Server')
at TokenBalance.tsx:74
```
- **Causa:** Conflicto de versiones del SDK. El proyecto tenía dos versiones: `@stellar/stellar-sdk@13.3.0` (dependencia de Trezor) y `@stellar/stellar-sdk@14.3.0` (versión principal), causando problemas con los imports.  
- **Intentos de solución:**  
  - **Intento 1:** Imports destructurados  
    ```ts
    import { SorobanRpc } from "@stellar/stellar-sdk";
    ```
    ❌ Resultado: `SorobanRpc` es `undefined`.  
  - **Intento 2:** Import con namespace  
    ```ts
    import * as StellarSdk from "@stellar/stellar-sdk";
    ```
    ❌ Resultado: `StellarSdk.SorobanRpc` es `undefined`.  
  - **Intento 3:** API de la v14 con minúscula  
    ```ts
    const server = new StellarSdk.rpc.Server(RPC_URL);
    ```
    ❌ Resultado: El servidor se crea, pero la simulación de transacción falla.

**Error 4: No se pudo obtener el balance (Error Final)**  
- **Contexto:** Después de la conexión exitosa y de intentar crear la transacción para leer el balance.  
```bash
Error al obtener balance: No se pudo obtener el balance
```
- **Causa posible:**
  - El Contract ID podría estar incorrecto o el contrato no está desplegado en esa dirección.
  - Problemas de compatibilidad entre SDK v14 y el RPC de Stellar Testnet.
  - La función `balance` del contrato espera parámetros en un formato diferente.  
- **Código que falla:**
```ts
const simulated = await server.simulateTransaction(transaction);
if (simulated.results && simulated.results.length > 0) {
  // Esta condición es false
  const result = simulated.results[0].retval;
  // ...
}
```
Aquí `simulated.results` no contiene los datos esperados, por lo que no se puede extraer el `retval`.

---

🔍 Diagnóstico Técnico

**Problema de Versiones del SDK**
```bash
npm list @stellar/stellar-sdk
```
Resultado:
```bash
├─┬ @trezor/connect-plugin-stellar@9.2.1
│ └── @stellar/stellar-sdk@13.3.0
└── @stellar/stellar-sdk@14.3.0
```

- **Impacto:** La v13 usa `SorobanRpc` mientras que la v14 usa `rpc` (minúscula). Esto causa conflictos de API y dificulta la conexión con el RPC.

**Problema WSL + Windows**  
- **Contexto:** El servidor corre en WSL (Linux) pero el navegador corre en Windows.  
- **Configuración aplicada:** Servidor con `--host` y acceso vía IP de WSL.  
- **Funcionó para:** Conectar Freighter y UI.  
- **No funcionó para:** Comunicación con el contrato de Stellar (posiblemente relacionado con la inestabilidad de las versiones del SDK en este entorno).

---

### 🚀 Segundo intento — versión final

Para solucionar los errores, se decidió **migrar el entorno a Docker**, logrando aislar dependencias y estabilizar la compilación.

- Se creó un **contenedor Docker** con Node 22 y React configurado.  
- Se instalaron nuevamente las dependencias:
  ```bash
  npm install lucide-react
  npm install stellar-sdk
  ```
- Se corrigieron importaciones:
```bash
import { Wallet, Star } from "lucide-react";
```
- Se modularizó el código y se verificó la conexión con el SDK.

El resultado fue una aplicación completamente funcional, estable y portable.

#### 🧱 Uso de Docker
Docker permitió crear un entorno limpio y reproducible, evitando conflictos con versiones locales.
Dentro del contenedor se ejecutó el servidor de desarrollo (npm run dev), garantizando que las dependencias de React y Stellar SDK funcionaran correctamente.

Comandos principales:

```bash
docker build -t token-bdb .
docker run -it -p 3000:3000 token-bdb
```

#### ❌ Por qué no se usó Scaffold Stellar
Aunque se intentó el uso de Scaffold Stellar (el entorno oficial de desarrollo rápido de Stellar), se descartó por los siguientes motivos:

- Requería versiones específicas de dependencias que no coincidían con las del entorno del curso.

- Presentaba conflictos en la instalación local de paquetes (problemas con pnpm y vite).

- Se priorizó la integración manual del SDK dentro de un entorno Dockerizado React más controlado.

#### 🧠 Aprendizajes principales
- Integración del SDK de Stellar en React.

- Uso de Docker para aislar y contener el proyecto.

- Corrección de errores de compilación JSX y módulos.

- Documentación del proceso y resolución iterativa de problemas.

#### ✅ Resultado final
Captura del proyecto funcionando:

<img width="1366" height="768" alt="Capture d’écran (57)" src="https://github.com/user-attachments/assets/19a902c3-62e7-415e-8bce-af939649651d" />

Vista general:

- Token: BuenDia Builder (BDB)

- Contract ID visible parcialmente

- Wallet conectada con balance

- Interfaz limpia con gradiente y tarjetas informativas

#### 📅 Próximos pasos
- Agregar envío de transacciones de prueba.

- Mostrar balances dinámicos desde la red Stellar.

- Implementar conexión con más wallets (Freighter, Albedo, etc.).

- Deploy en Vercel o Netlify.


Proyecto desarrollado en el marco del curso Código Futura — Buendía Builders.




