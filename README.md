<div align="center">
  <h1>Superhedge Interface</h1>
  <br />
</div>

> A [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## How to set up local environment

1. Clone this repository on localhost.

2. Create an enviroment file named `.env.local` (copy .env.example) and fill the next enviroment variables

```
# Enable testnets(true or false)
NEXT_PUBLIC_ENABLE_TESTNETS=

# Alchemy provider key for Goerli testnet
NEXT_PUBLIC_ALCHEMY_KEY_GOERLI=

# API Endpoint URL(f.g. http://localhost:3000/api or http://{IPv4}:{port}/api)
NEXT_PUBLIC_API_BASE_URL=
```

3. Install dependencies using 'yarn' package manager

```bash
$  yarn
```

4. Run the development server

```bash
# Need to specify the port number to avoid conflict with API port
$ yarn dev --port 3001
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.
