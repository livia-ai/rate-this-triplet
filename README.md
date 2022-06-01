# LiviaAI Rate This Triplet

A web app for collecting user ratings on randomly sampled LiviAI triplets.

## Running in Dev Mode

The application stack has the following components: i) a RethinkDB Docker image, ii) and express.js API server, 
iii) a Svelte/Vite UI frontend. In dev mode, you need to start them individually.

- In the `/server` folder, start the RethinkDB Docker image: `docker compose up`
- Still in the `/server` folder, start the express.js API: `npm run dev`
- In the `/client` folder, start the Svelte/Vite UI: `npm start`

## HTTPS Setup

Installation of HTTPS certificates via Certbot and LetsEncrypt is prepared in the Docker setup,
but requires manual steps. The process is based on [this guide](https://mindsers.blog/post/https-using-nginx-certbot-docker/).

#### 1. Test if the setup works correctly

```sh
docker-compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ --dry-run -d rate-this-triplet.no5.at
```

#### 2. Test if the setup works correctly

With HTTPS still disabled, download certificate from LetsEncrypt:

```sh
docker-compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d rate-this-triplet.no5.at
```

#### 3. After the certificate is available

- Edit NGINX config file in `nginx/config/default.conf` and uncomment the HTTP config.
- Restart everything with `docker-compose up --build`
