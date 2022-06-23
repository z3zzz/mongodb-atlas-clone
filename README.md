## Clone Mongodb Atlas Database 

1. Install dependencies
```terminal
npm install
```

2. Fill in `atlasInfo.json` file
- from: endpoint cluster and database to clone
- to: target cluster and database
  - `from.endpint` and `to.endpoint` may be identical


3. Create .env file
```terminal
# Below two API_KEY may be identical

ATLAS_API_KEY_FROM=<API_KEY>
ATLAS_API_KEY_TO=<API_KEY>
```

4. Run code
```terminal
npm run start
```
