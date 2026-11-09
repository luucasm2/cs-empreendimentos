# CS Empreendimentos — site institucional (React + Vite)

Projeto demonstrativo de site institucional da **CS Empreendimentos**, de Santarém (PA).

## Executar no VS Code

1. Extraia o ZIP e abra a pasta `cs-empreendimentos-react` no VS Code.
2. Abra o terminal nessa pasta (a pasta deve conter `package.json`).
3. Execute:

```bash
npm install
npm run dev
```

Acesse o endereço indicado pelo Vite, normalmente `http://localhost:5173`.

### Publicar no GitHub e Vercel

A pasta `node_modules` já é ignorada em `.gitignore`. No terminal:

```bash
git init
git add .
git commit -m "Site institucional CS Empreendimentos"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

Se o remote `origin` já existir, use `git remote -v` para verificar e `git remote set-url origin <URL-CORRETA>` para corrigir.

**Vercel**: Framework `Vite`, build `npm run build`, output `dist`, root `./` (a pasta com `package.json`).

## Onde editar

- Nome da empresa, Instagram, telefone e WhatsApp: **`src/config.js`**.
- Soluções, textos e URLs de fotos: **`src/data/content.js`**.
- Componentes, seções, CTAs, formulário: **`src/App.jsx`**.
- Animação frame-a-frame vinculada ao scroll: **`src/components/ScrollBuilding.jsx`**.
- Paleta, tipografia, breakpoints e layout: **`src/styles.css`**.
- Emblema original tratado para exibição: `public/assets/cs-emblema.png`.

## Animação de construção

- 180 frames locais para **desktop**, em `public/frames/desktop` (1600x900).
- 180 frames locais para **mobile**, em `public/frames/mobile` (960x540).
- Não há autoplay: a posição da página controla o frame tanto ao descer quanto ao subir.
- Cache limitado de imagens e pré-carregamento direcionado a dispositivos móveis.
- A animação é **ilustrativa** e não corresponde a uma obra verificada da CS Empreendimentos.

## Formulário estratégico

Os campos de nome, telefone, interesse, etapa e prazo são obrigatórios. Ao enviar, o site monta uma mensagem de orçamento e abre o WhatsApp, sem banco de dados e sem salvar informações.

**Importante:** o WhatsApp cadastrado em `src/config.js` foi localizado em registros públicos associados à empresa de Santarém, mas deve ser **confirmado diretamente pela CS antes da publicação definitiva**.

## Fotografias e informações

- O Instagram informado (`@csempreendimentosstm`) foi incluído, porém **não foi possível acessar as publicações diretamente** no ambiente de desenvolvimento.
- As fotos de arquitetura (carregadas de URLs do Unsplash) são **ilustrativas e exigem internet**; elas não são apresentadas como obras realizadas pela CS.
- A razão social e o segmento (incorporação/construção) foram encontrados em cadastros públicos para a CS de Santarém. Não foram inventadas avaliações, quantitativos de obras, certificações ou empreendimentos específicos.
- Recomenda-se substituir fotos ilustrativas por fotografias originais autorizadas, verificar o contato e obter aprovação final dos textos antes de publicar.

## Acessibilidade

O site inclui menu de navegação para celular, títulos semânticos, descrições alternativas de imagens, labels nos campos, validação básica, navegação por teclado e modo de movimento reduzido.
