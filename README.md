# todoo

This is a very simple NextJS Todo webapp made by @YiningSP, @huishilhs, @notlega

Documentation can be found at [Wiki](https://github.com/notlega/todoo/wiki)

## Prerequisites

- Docker/Docker Desktop
- NodeJS
- AWS CLI

## Installation

Clone the repository

```bash
git clone https://github.com/notlega/todoo.git
```

Install dependencies

```bash
npm ci
```

Add a `.env.local` file with the following content

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Usage

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm run start
```
