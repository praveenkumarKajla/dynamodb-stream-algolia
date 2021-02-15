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
    index_name: INDEX_NAME,
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

<table>
  <tr>
  <td align="center">
  <a href="https://github.com/praveenkumarKajla">
  <img src="https://avatars.githubusercontent.com/u/46952981?s=460&u=34941f4c5f5ff8d61e5589faf7cb136ab85f0287&v=4" width="100" alt="praveenkumarKajla"/>
  <br>
  <sub>
  <b>praveenkumarKajla</b>
  </sub>
  </a>
  </td>
  </tr>
</table>

## Contributors

<table>
  <tr>
  <td align="center">
  <a href="https://github.com/WilliamCadenas21">
  <img src="https://avatars.githubusercontent.com/u/20405614?s=460&u=7d1e76eaef8ab805a786d0ef8a9ecb6f7e1d6628&v=4" width="100" alt="William Cadenas"/>
  <br>
  <sub>
  <b>William Cadenas</b>
  </sub>
  </a>
  </td>
  </tr>
</table>

## Inspired from

[dynamodb-stream-elasticsearch](https://www.npmjs.com/package/dynamodb-stream-elasticsearch)
