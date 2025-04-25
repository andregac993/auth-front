## 🚀 Auth Front 
### Versões utilizadas no projeto: 
    node: 22.14.0
    npm: 10.9.2
    jest: 29.7.0

###  Adicione os arquivos .env com o conteúdo abaixo 
    NEXT_PUBLIC_BASE_URL=http://localhost:3000/#https://vz9m2whqdj.us-east-2.awsapprunner.com/ <- Se estiver rodando o backend local utilize localhost:3000
    NEXT_PUBLIC_SERVER_LOCAL_URL=http://localhost:3001/
### Rode o comando:
    npm i
    npm run dev

### O projeto utiliza o Husky para precommit, então ao executar um commit, ele irá verificar: 
    Testes
    Mensagem de commit
    lint 
### Para rodar os testes, basta rodar: 
    jest
