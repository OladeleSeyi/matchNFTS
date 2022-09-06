THis project was built with show and tell in mind. It skips some production practices and focuses on "solving the problem" while adhering to borderline best practices for two reasons.

- Time: The time provided was enough, however, I didnt get to this as soon as the clock started ticking, so I focused on the fastest, hacky solution.

- Ease of review: Reveiwing this should be as simple as possible for you, the reader.

### Design Decisions

Serverless - Development speed. I started this rather late and could not be bothered with setup related bruhaha.

Chain - I think in practice the frontend would provide a select box for the chain we are seacrching on. I chose to default to eth mainnet because it is the most used.

Alchemy - Alchemy provides a larger response set, 100 items per api call. In practice we would want to make fewer api calls (pricing/request) as soon as possible. Serverless also has a time constraint that I considered.

### Improvements

Unfortunately this is missing a number of extras.

- Testing recursive requests to alchemy.
- unit testing the matching function. At the moment this project includes an integration test for the lambda. In practice the matching function may be changed any number of times and there should be tests to show it works as it should.

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

```bash
$ serverless offline start
```

Make requests like so to the  
[serverless-offline](https://jg3uz543a6.execute-api.us-east-1.amazonaws.com/dev/find_assets)

```
{
    "chain": "eth-mainnet",
    "contract": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    "owner": "0x54be3a794282c030b15e43ae2bb182e14c409c5e",
    "traits": {
        "mouth": [
            "Bored Unshaven Cigarette",
            "Bored Cigarette"
        ],
        "background": [
            "Aquamarine",
            "Red",
            "Blue"
        ],
        "eyes": [
            "Angry",
            "Sad",
            "Bored"
        ]
    }
}
```

#### Running Tests

Run your tests using

```bash
$ npm test
```
