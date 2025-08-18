# Finanças Simples 💰

Um aplicativo web simples e intuitivo para ajudar você a gerenciar seus gastos diários e ter uma visão clara de suas finanças. Projetado com foco em praticidade e uma interface limpa e moderna.

## ✨ Funcionalidades

- **Registro de Gastos:** Adicione facilmente a descrição, valor e data de cada gasto.
- **Total de Gastos:** Visualize o montante total de gastos pessoais e compartilhados, com uma visão clara da sua parte nas despesas.
- **Divisão de Gastos:** Marque despesas como "compartilhadas" e defina por quantas pessoas elas devem ser divididas, calculando a sua parte.
- **Organização por Categoria:** Gastos são automaticamente categorizados como "Compartilhados" ou "Pessoais".
- **Anotações do Mês:** Um espaço dedicado na seção de resumo para anotações rápidas, lembretes ou datas importantes. As notas são salvas automaticamente no navegador.
- **Persistência de Dados:** Todos os seus gastos e anotações são salvos localmente no seu navegador (usando `localStorage`), para que você não perca suas informações ao fechar a página.
- **Temas Customizáveis:** Alterne entre temas Claro, Escuro e Azul para personalizar a experiência visual.

## 💻 Tecnologias Utilizadas

Este projeto foi construído utilizando as bases do desenvolvimento web:

- **HTML5:** Para a estrutura semântica e acessível da página.
- **CSS3:** Para o estilo, layout responsivo e os temas visuais, com o uso de **variáveis CSS** para uma gestão de cores e temas eficiente.
- **JavaScript (ES6+):** Para a lógica de aplicação, manipulação do DOM e a persistência de dados no `localStorage`.

## 🚀 Como Executar Localmente

Siga estas etapas para ter o projeto rodando em sua máquina:

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/rafaeltenorioo/financas-simples.git](https://github.com/rafaeltenorioo/financas-simples.git)
    ```

2.  **Navegue até a pasta do projeto:**

    ```bash
    cd financas-simples
    ```

3.  **Abra o `index.html`:**
    Simplesmente abra o arquivo `index.html` em seu navegador de preferência. Não é necessário um servidor web para este projeto, pois ele é puramente estático (HTML, CSS, JS).

## 💡 Estrutura do Projeto e Próximos Passos

O projeto é organizado de forma modular, com arquivos dedicados para cada funcionalidade. As folhas de estilo e os scripts são separados por seu propósito (`theme.css`, `responsive.css`, `main.js`, `uiManager.js`, etc.), o que facilita a manutenção e a adição de novas funcionalidades.

Algumas possíveis melhorias para o futuro incluem:

- Adicionar filtragem de gastos por data/mês.
- Implementar categorias de gastos personalizáveis.
- Funcionalidade de edição de gastos existentes.
- Exportação de dados.
- Gráficos e visualizações para melhor acompanhamento.

## 🤝 Contribuição

Contribuições, sugestões e issues são bem-vindas! Se você tiver ideias ou quiser colaborar, sinta-se à vontade para abrir uma issue ou um pull request.
