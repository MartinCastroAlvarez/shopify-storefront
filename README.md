# Marseille

![alt-image](./wallpaper.jpg)

### Installation
```bash
virtualenv -p python3 .env
source .env/bin/activate
pip install -r requirements.txt
```

### TODO
- Deploy to Production Domain
- Google Analytics
- Meta Keywords
- Meta Author
- Meta Description
- Facebook Link
- Twitter Link
- Instagram Link
- Pinterest Link
- Fetch Products
- Checkout Link
- Thank You Page
- Privacy Policy
- Terms of Service
- Footer Cleanup

### Deployment
```bash
./bin/flake8.sh && ./bin/deploy.sh "master"
source .env/bin/activate python3 ./bin/build.py && python3 ./bin/upload.py
```

### Testing
```bash
curl -X GET \
    -H "X-Api-Key: ${KEY}" \
    -H "Content-Type: application/json" \
    "https://gc6z11ywde.execute-api.us-west-2.amazonaws.com/master/v1/products" | jq
```
