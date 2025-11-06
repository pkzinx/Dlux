<div align="center">
  <img width="150" height="150" src="./public/assets/svg/logo-readme.svg" alt="Logo Dlux" />
  <h1>Dlux Barbershop</h1>
</div>

<div align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=CC0 1.0 Universal&color=3abcbf&labelColor=333333">
  <img src="https://img.shields.io/static/v1?label=Deploy&message=Vercel&color=3abcbf&labelColor=333333" />
  <img src="https://img.shields.io/static/v1?label=NextJS&message=v15.0.3&color=3abcbf&labelColor=333333" />
  <img src="https://img.shields.io/static/v1?label=React&message=v18.2.0&color=3abcbf&labelColor=333333" />
  <img src="https://img.shields.io/static/v1?label=Styled Components&message=v6.1.19&color=3abcbf&labelColor=333333" />
</div>

## :fire: Acesso ao Projeto

Deploy público (se aplicável) e Storybook podem variar por ambiente. Consulte sua URL de deploy ou rode localmente conforme abaixo.

## :sparkles: Novidades — v2.0.2

- Botão "Ver todos os serviços" agora abre um modal central com serviços adicionais e seus preços/durações.
- Novo `ServicesModal` com grid responsivo, overlay e visual consistente com o tema.
- Cada serviço no modal possui botão "Agendar" que integra com o `ScheduleModal` já utilizado nos principais serviços.
- Botão inferior da seção de serviços reposicionado e centralizado.
- Melhorias de UX em mobile, com dica visual de swipe na listagem de serviços.

## :iphone: Acesso pelo Mobile (rede local)

- Inicie o servidor expondo na rede: `npx next dev -p 3001 -H 0.0.0.0`
- Descubra seu IP local e acesse no celular (mesma rede Wi‑Fi): `http://SEU_IP:3001/`
- Dicas:
  - Autorize o app no Firewall do Windows quando solicitado (rede privada).
  - Evite VPNs/isolamento AP que bloqueiam tráfego local.

## :dart: Objetivo

Com a proposta de criar um projeto para a barbearia 98Barbershop, a gente se propôs a criação de um website que vai trazer uma nova forma de comunicação com seus clientes. Foi feita em primeira instância um estudo de caso, como, entender as necessidades do público alvo da empresa para assim poder de forma correta escolher todas as fontes, formas e cores capazes de estabelecer uma comunicação eficiente com os clientes dentro do projeto. Entretando é preciso ter também uma boa performance e boa indexação no Google, e nada melhor do que utilizar o NextJS com boas práticas para obter esse resultado.

## :hammer_and_wrench: Ferramentas

- [TypeScript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/)
- [Styled Components](https://styled-components.com/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://github.com/typicode/husky)
- [Axios](https://axios-http.com/docs/intro)
- [GraphQL](https://graphql.org)

## :construction: Variáveis de Ambiente

| Chave                        | Descrição                                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `GRAPHQL_HOST`               | URL da API que utiliza comunicação GraphQL.                                                                                    |
| `GRAPHQL_TOKEN`              | Token para o acesso da API ser aceito.                                                                                         |
| `MODEL_ID`                   | Caso utilize o Dato CMS insira o ID da model em que se armazenará os dados, caso contrário adapte da forma da qual será usada. |
| `NEXT_PUBLIC_MAPBOX_API_KEY` | Token de acesso ao mapbox.                                                                                                     |
| `NEXT_PUBLIC_MAPBOX_USERID`  | Nome do usuário da conta do mapbox                                                                                             |
| `NEXT_PUBLIC_MAPBOX_STYLEID` | ID para acesso a estilização do mapbox.                                                                                        |

## :rocket: Como iniciar a aplicação localmente

### Faça um clone desse repositório

```bash
git clone https://github.com/rafaabatistas/98barbershop
```

### Instale as dependências

```bash
npm install
# ou
yarn install
```

### Dê start ao projeto

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm run start
```

## :white_check_mark: Testes e Storybook

- Testes: `npm test`
- Storybook: `npm run storybook` (se configurado)

## :file_folder: Componentes relevantes

- `MainServices` — lista principais serviços e controles (desktop/mobile).
- `ServicesModal` — lista serviços extras com preço/duração e ação de agendar.
- `ScheduleModal` — modal de agendamento reutilizado, recebe o título do serviço.
