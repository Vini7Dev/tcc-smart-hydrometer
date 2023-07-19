<img
  src="/docs/assets/readme_banner.png"
  width="100%;"
  alt="Hidrômetro Inteligente"
/>

# TCC: Smart Hydrometer

> Trabalho de Conclusão de Curso (TCC) - Uni-FACEF

**Veja o artigo completo [AQUI](/docs/__Article__.pdf)**

## 🎯 Objetivo Geral

Desenvolver uma solução que auxilie os usuários a **controlar o seu consumo de água**, por meio de um aplicativo para **monitoramento do consumo** e o **valor financeiro** aproximado que o consumo representa.

## 🔎 Objetivos Específicos

* **Conscientizar os usuários** da solução por meio de **notícias e dicas** que incentivam a adoção de **boas práticas** para controlar o consumo;

* Oferecer um **monitoramento de consumo por região**, para conhecer melhor quais pontos da cidade sofrem de **desperdício em abundância** e para que **programas e boas práticas** possam ser tomadas nessas regiões.

# 📁 Documentações

**Veja todas as documentações [AQUI](/docs/)**

* Engenharia de Software: [AQUI](/docs/01-software-engineering/)
  * 5W1H: [AQUI](/docs/01-software-engineering/01%205W1H.xlsx)
  * Documento de Requisitos e Regras de Negócio: [AQUI](/docs/01-software-engineering/02%20Business%20Rules%20and%20Requirements%20Document.docx)
  * Diagrama do Caso de Uso: [AQUI](/docs/01-software-engineering/03%20Use%20Case%20Diagram.jpg)
  * Documentação do Caso de Uso: [AQUI](/docs/01-software-engineering/04%20Use%20Case%20Documentation.docx)
  * Matrizes de Rastrabilidade: [AQUI](/docs/01-software-engineering/05%20Traceability%20Matrices.xlsx)

* Banco de Dados: [AQUI](/docs/02-database/)
  * Modelagem Conceitual (MER): [AQUI](/docs/02-database/06%20MER%20(Model%20Entity%20Relationship).png)
  * Modelagem Lógica: [AQUI](/docs/02-database/07%20Logical%20Modeling.png)
  * Modelagem Física: [AQUI](/docs/02-database/08%20Physical%20Modeling.png)

* Hidrômetro: [AQUI](/docs/03-hydrometer/)
  * Diagrama Elétrico do Hidrômetro: [AQUI](/docs/03-hydrometer/09%20Electrical%20Diagram%20of%20the%20Hydrometer.png)

* Telas: [AQUI](/docs/04-app/)
  * Telas Antes da Autenticação: [AQUI](/docs/04-app/10%20Screens%20Before%20Authentication.png)
  * Telas do Administrador: [AQUI](/docs/04-app/11%20Admin%20Screens.png)
  * Telas do Cliente: [AQUI](/docs/04-app/12%20Customer%20Screens.png)

# 💻 Componentes, Tecnologias e Metodologias Utilizadas

* **[Frontend Mobile](/mobile/)**
  * Typescript
  * React Native
  * Styled Components

* **[Backend](/server/)**
  * Typescript
  * NodeJS
  * Express
  * MQTT
  * Prisma ORM
  * Background Jobs (Bull)
  * Node Cron
  * Selenium
  * JSON Web Token
  * Multer
  * Nodemailer
  * Swagger UI
  * SOLID

* **[Hidrômetro](/hydrometer/)**
  * Arduino IDE
  * PubSubClient
  * ESP8266 NodeMCU
  * Flow Sensor
  * 5 Volt Source

# 🤝 Colaboradores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Vini7Dev">
        <img src="https://avatars3.githubusercontent.com/u/94920663" width="100px;" alt="Foto do Vinícius Gabriel no GitHub"/><br>
        <sub>
          <b>Vinícius Gabriel</b>
        </sub>
      </a>
    </td>

  <td align="center">
    <a href="https://github.com/PedroSMarcal">
      <img src="https://avatars.githubusercontent.com/u/62404639" width="100px;" alt="Foto do Pedro Marçal no GitHub"/><br>
      <sub>
        <b>Pedro Marçal</b>
      </sub>
    </a>
  </td>
  </tr>
</table>
