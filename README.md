# CRYPTO TRACKER V2.2 

Crypto Tracker is a real time cryptocurrency trackig application that
fetches prices of currencies in real time using the very intuitive CoinGecko API. 
Additionally, Crypto Tracker allows you to display it all in an interactive, User-friendly interface.


#Feature list
- Real Time Data of 200+ Cryptocurrencies helping you make the most upto date financial decisions
-Interactive UI: Sort the markets by price, Market Cap or even 24 hour changes.
- Search a Cryptocurrency using a name or even its ticker/symbol
- Responsive Design: The site works great on desktop and mobile
- Intrinsic Error Handling: API failures are managed well behind the scenes.

# Tech Used
- Frontend: HTML5, CSS3, JavaScript
- API: CoinGecko (https://www.coingecko.com/en/api)
- Containerisaton: Docker
- Load Balancing: HAProxy






### Local Development on your personal machine
```bash
git clone https://github.com/SpaceMan619/crypto-tracker.git
cd crypto-tracker
python3 -m http.server 8000  # Or use Live Server in VS Code

### Deploying on Docker
# Build image
docker build -t spaceman619/crypto-tracker:v1 .

# Run locally
docker run -p 8080:8080 spaceman619/crypto-tracker:v1
http://localhost:8080

# Push to Docker Hub
docker push spaceman619/crypto-tracker:v1


Production Deployment
Server Setup
# On web01 and web02
docker pull spaceman619/crypto-tracker:v1
docker run -d --name crypto-app -p 8080:8080 spaceman619/crypto-tracker:v1

Load Balancer Configuration
# haproxy.cfg
backend crypto_backend
  balance roundrobin
  server web01 172.18.0.2:8080 check
  server web02 172.18.0.3:8080 check

API Documentation

This project uses the CoinGecko API:

Rate Limit: 50 requests/minute
Data Types: Prices, market caps, 24h changes
Attribution: Please comply with CoinGecko's API Terms


#Testing of Load Balancing
# Run 5 times to see alternating responses
for i in {1..5}; do curl -s http://localhost | grep "Bitcoin"; done

Project Structure
crypto-tracker/
├── index.html         # Main UI
├── script.js          # API calls and interactivity
├── style.css          # Responsive styling
├── Dockerfile         # Container configuration
└── haproxy.cfg        # Load balancer setup


