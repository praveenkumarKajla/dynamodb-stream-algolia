# dynamodb-stream-algolia

Dynamodb Streams => lambda [with dynamodb-stream-algolia] => algolia

## Installation

```bash
npm install dynamodb-stream-algolia
```

## Usage

```python
import { pushStream } from "dynamodb-stream-algolia";

pushStream({
    event,
    index: INDEX_NAME,
    appId: ALGOLIA.ALGOLIA_APP_ID,
    adminKey: ALGOLIA.ALGOLIA_ADMIN_API_KEY,
    logs: true
  })
```

logs is optional, default its false

hook cloudwatch logs so while debugging you can check issues

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Author

[praveenKajla](https://github.com/praveenkumarKajla)

## Inspired from

[dynamodb-stream-elasticsearch](https://www.npmjs.com/package/dynamodb-stream-elasticsearch)
