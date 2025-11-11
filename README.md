<div align="center">
  <img width="150" height="150" src="./public/assets/img/icon-logo.png" alt="Logo Dlux" />
  <h1>Dlux Barbearia — Site + Painel</h1>
</div>

<div align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=CC0 1.0 Universal&color=3abcbf&labelColor=333333">
  <img src="https://img.shields.io/static/v1?label=Django&message=4.x&color=3abcbf&labelColor=333333" />
  <img src="https://img.shields.io/static/v1?label=NextJS&message=15.x&color=3abcbf&labelColor=333333" />
  <img src="https://img.shields.io/static/v1?label=Postgres&message=Railway&color=3abcbf&labelColor=333333" />
</div>

## Visão Geral

Projeto completo com duas partes:
- Site em Next.js (marketing, agendamentos e informações da barbearia).
- Painel Dlux (Django) para operação interna: agenda, finanças, histórico e perfil.

## Painel Dlux — Principais Funcionalidades

- Agendamentos
  - Novo agendamento rápido pelo modal “Novo agendamento”.
  - Criação, edição, conclusão e cancelamento de serviços.
  - Busca por cliente e visualização por status.
  - Toast de sucesso garantido ao concluir, evitando dupla criação.
- Finanças
  - KPIs diárias e mensais baseadas no fim do serviço (`end_datetime`).
  - Faturamento por barbeiro e por período, com filtros simples.
- Histórico (Auditoria)
  - Registro de ações: criar, atualizar, excluir, login e logout.
- Perfil
  - Edição de dados de usuário e alteração de senha.

Rotas úteis do painel:
- `/painel/` — dashboard geral
- `/painel/agendamentos/` — agenda
- `/painel/financas/` — finanças e KPIs
- `/painel/historico/` — trilha de auditoria
- `/painel/perfil/` — perfil do usuário

## Tecnologias

- Backend: Django (+ Gunicorn), PostgreSQL
- Frontend: Next.js, React, Styled Components, Storybook
- Testes: Jest + React Testing Library
- Extras: GraphQL no site, Axios, Eslint, Prettier, Husky

## Como rodar localmente

Backend (Django):
```bash
cd backend
python -m pip install -r requirements.txt
python manage.py runserver 0.0.0.0:8000
# Painel: http://localhost:8000/painel/
```

Frontend (Next.js):
```bash
npm install
npm run dev
# Site: http://localhost:3000/
```

## Variáveis de Ambiente

Backend (Django):

| Chave | Descrição |
| --- | --- |
| `DATABASE_URL` | URL do Postgres (ex.: `postgresql://...@postgres.railway.internal:5432/railway`) |
| `DJANGO_SECRET_KEY` | Chave secreta do Django |
| `DEBUG` | `false` em produção |
| `ALLOWED_HOSTS` | Domínios permitidos do painel (Railway/VPS) |
| `CSRF_TRUSTED_ORIGINS` | Domínios com `https://` para evitar erro de CSRF |
| `MEDIA_ROOT` | Caminho para uploads (ex.: `/app/media`) |

Frontend (Next.js):

| Chave | Descrição |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | URL pública da API do painel (ex.: `https://api.seudominio.com`) |
| `GRAPHQL_HOST` | Se usar GraphQL no site |
| `GRAPHQL_TOKEN` | Token para GraphQL (se aplicável) |

## Deploy resumido na Railway

1. Adicione um serviço Postgres e copie `DATABASE_URL`.
2. Crie serviço `dlux-api` (root `backend/`), configure:
   - Build: `pip install -r requirements.txt`
   - Start: `sh -c "python manage.py migrate && gunicorn dlux_panel.wsgi:application --bind 0.0.0.0:8000"`
   - Variáveis: `DATABASE_URL`, `DJANGO_SECRET_KEY`, `DEBUG=false`, `ALLOWED_HOSTS`, `CSRF_TRUSTED_ORIGINS`.
3. Crie serviço `dlux-web` (raiz do projeto), configure:
   - Build: `npm ci && npm run build`
   - Start: `npm run start`
   - Variáveis: `NEXT_PUBLIC_API_URL` apontando para o backend.
4. Teste os dois endpoints `*.railway.app` e, opcionalmente, adicione domínios próprios.

## Notas de versão — v2.6.x

- 2.6.1: Ajuste do toast de sucesso no agendamento rápido (UI).
- 2.6.2: Timeout e abort no post de agendamentos para evitar loading infinito.
- 2.6.3: README atualizado com logo, descrição do painel e funcionalidades.

## Licença

Este repositório utiliza licença pública conforme o badge acima.
