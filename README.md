# 💫 Token BDB — Proyecto de Integración

Aplicación **frontend** desarrollada en **React** para interactuar con tokens en la **blockchain de Stellar**.  
Forma parte de la **Clase 6 del programa Código Futura** impulsado por **Buendía Builders**.

---

## 🪙 Descripción general

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

### 🌀 Primer intento
El entorno fue configurado localmente con Node.js y React.  
Sin embargo, surgieron errores de compilación al intentar integrar el SDK de Stellar y los íconos de `lucide-react`, como:
- “Cannot resolve module 'lucide-react'”
- “Unexpected token ‘<’ in JSX”
- Conflictos entre componentes y rutas de importación.

El proyecto no llegaba a ejecutarse correctamente.

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




