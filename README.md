# Volvo Cars App 🚗

Aplicação frontend desenvolvida com Angular, inspirada no desafio oficial da Volvo Cars.

---

## 📌 Sobre o Projeto

Este projeto foi criado com foco em **aprendizado prático** e **exploração de boas práticas frontend**, tomando como base o repositório oficial da Volvo Cars:  
👉 [volvo-cars/god-frontend-code-test](https://github.com/volvo-cars/god-frontend-code-test)

A proposta é:

- Recriar a experiência original.
- Adicionar novas seções.
- Melhorar o código.
- Explorar recursos avançados do Angular.

Atualmente o projeto já conta com várias funcionalidades adicionais além do original.

---

## ✅ Melhorias Já Implementadas

- **Responsividade para Mobile 📱**  
Agora toda a aplicação é responsiva, com adaptação para diferentes tamanhos de tela.

- **Cobertura de Testes Unitários 🧪**  
Boa parte da aplicação já possui testes unitários com Angular Testing, Jasmine e Karma. A cobertura total está em progresso.

- **Tratamento de Localização do Usuário 🌎**  
Foram implementadas validações para garantir que erros de permissão de localização não quebrem a aplicação em produção.

- **Novas Categorias 🚍🚛**  
Além dos veículos da Volvo Cars, agora temos também:

  - **Tela de Ônibus (Bus)**
  - **Tela de Caminhões (Trucks)**

- **Manipulação Segura de Dados Local (LocalStorage + BehaviorSubject)**  
Favoritos agora são salvos localmente e atualizados de forma reativa via BehaviorSubject.

- **Dark Mode 🌓 com ThemeService**  
Switch de tema claro/escuro integrado com Angular Material e serviço reativo.

- **Hero Carousel com Auto Slide 🔄**  
Carrossel de lançamentos com auto-slide e controle manual.

- **Melhorias no Roteamento e Navegação Angular Router**  
Rotas modulares com lazy loading planejado e navegação segura entre as telas.

- **Mapa com Localização e Lojas Próximas 🗺️**  
Mapa interativo usando Google Maps API:  
Permite ao usuário liberar sua localização para exibir as concessionárias Volvo mais próximas, com opção de traçar rota até a loja.

- **Validações de Dados no Subscribe (Boas práticas RxJS)**  
Todo consumo de API ou JSON local trata erros de forma segura, evitando crash da aplicação.

---

## 🌐 Deploy

A aplicação já está publicada na Vercel e pode ser acessada pelo link:  
🔗 [https://volvo-app-2zyy.vercel.app/](https://volvo-app-2zyy.vercel.app/)

> ⚠️ O projeto segue em desenvolvimento contínuo. Algumas áreas podem receber melhorias e ajustes nas próximas versões.

<br>
<br>

![volvo-app-tests](https://github.com/user-attachments/assets/af679749-1284-4208-a31b-d3b074753fa8)


---

## 🚧 Próximos Passos

- Expandir cobertura de testes unitários para todos os componentes e serviços.
---

🚀 Como Rodar o Projeto Localmente
<br>
✅ Pré-requisitos:
<br>
Node.js (Recomenda-se a versão 18.x ou superior)
<br>
Angular CLI (Versão 20.x)
<br>
1. Clone o Repositório
<br>
git clone https://github.com/PauloCatto/volvo-cars-app.git
<br>
cd volvo-cars-app
<br>
npm install -g @angular/cli@20.0.2
<br>
npm install
<br>
ng serve -o





