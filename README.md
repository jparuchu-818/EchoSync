# Echo+ — The Broista's Superpower

Three modules:
1) **OrderSync** — hands-free ordering (mock Comprehend/Transcribe in MVP)
2) **RelationshipSync** — customer memory card
3) **SmartWhisper** — one actionable cue at payment scan
+ **MemoryCapture** — quick notes after interaction

## Deploy backend (AWS SAM)

```bash
cd infra
sam build
sam deploy --guided
# copy Outputs.ApiBase (e.g., https://xxxx.execute-api.us-west-2.amazonaws.com/dev)
```

## Seed DynamoDB

```bash
# Optionally set table names (if you changed from defaults)
export CUSTOMERS_TABLE=echo_customers
export LOYALTY_TABLE=echo_loyalty
export MENU_TABLE=echo_menu

cd infra/seed
npm i
npm run seed
```

## Run web UI

```bash
cd web
npm i
echo 'VITE_API_BASE="https://<api-id>.execute-api.<region>.amazonaws.com/dev"' > .env.local
npm run dev
```

Open http://localhost:5173

### Demo script
- RelationshipSync: load `cust_sarah`
- OrderSync: type `can i get a medium iced golden eagle with oat milk and light ice`
- SmartWhisper: click **Simulate App Scan** (will choose the top cue)
- MemoryCapture: save a short note

### Dutch Bros API + KDS integration (placeholders)
- Replace OrderSync Lambda with POS formatter → POST to Dutch Bros POS API
- Use KDS webhook to mark order `In Progress` → `Ready`
- RelationshipSync can pull `visit_count`, `last_visit` from official endpoints if provided

### Production upgrades
- Swap rule-based parsing → **Amazon Comprehend Custom Entities**
- Add **Transcribe Streaming** in the browser (Cognito unauth role) or through a thin audio relay
- Add **Rekognition** or Official App Check-In for pre-arrival recognition
- Encrypt PII, use least-privilege IAM, add audit logging
