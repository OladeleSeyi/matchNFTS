### Design Decisions

Serverless - Development speed. I started this rather late and could not be bothered with setup related bruhaha.

Chain - I think in practice the frontend would provide a select box for the chain we are seacrching on. I chose to default to eth mainnet because it is the most used.

Alchemy - Alchemy provides a larger response set, 100 items per api call. In practice we would want to make fewer api calls (pricing/request) as soon as possible. Serverless also has a time constraint that I considered.

### Requirements

- [Install the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/)
- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

### Installation

To create a new Serverless project.

```bash
$ serverless install --url https://github.com/AnomalyInnovations/serverless-typescript-starter --name my-project
```

Enter the new directory

```bash
$ cd my-project
```

Install the npm packages

```bash
$ npm install
```

### Usage

To run a function on your local

```bash
$ serverless invoke local --function hello
```

To simulate API Gateway locally using [serverless-offline](https://github.com/dherault/serverless-offline)

```bash
$ serverless offline start
```

Deploy your project

```bash
$ serverless deploy
```

Deploy a single function

```bash
$ serverless deploy function --function hello
```

#### Running Tests

Run your tests using

```bash
$ npm test
```
