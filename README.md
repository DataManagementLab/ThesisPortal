[![Node.js CI](https://github.com/DataManagementLab/ThesisPortal/actions/workflows/node.js.yml/badge.svg)](https://github.com/DataManagementLab/ThesisPortal/actions/workflows/node.js.yml)

# ThesisPortal

Portal für Abschlussarbeiten - Bachelorpraktikum 2022/23

## Development Setup

### 1. Prerequisites

#### 1.1. Node / npm

Install [nodejs](https://nodejs.org/) version 16 or higher. LTS is recommended
You can use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to simplify the process of installing nodejs

### 1.2. Database: SurrealDB

Install [SurrealDB](https://surrealdb.com/install)

### 2. Setup project

1. Clone the repository: `git clone https://github.com/DataManagementLab/ThesisPortal.git`
2. Install the dependencies: `npm install` or `npm i`
3. Edit the .env file in the projects root directory
   - `PBL_HOST` / `PBL_PORT`: this is the host and port the project is running on. Also, this this the url where you get sent to after logging into the SSO successfully
   - `CAS_HOST` / `CAS_PORT` / `CAS_VERSION`: this is the connection data to the SSO
   - `JWT_SECRET`: this is a secret string of data used to sign the auth tokens. The recommended size for the secret is 32 characters.
   - `DB_HOST` / `DB_USER` / `DB_PASSWORD` / `DB_NAMESPACE` / `DB_DATABASE`: this is the connection to the database
4. Start the database (see [here](https://surrealdb.com/docs/start/starting-surrealdb) for additional startup options): `surreal start --log trace --user root --pass pass` where `trace` can also be `debug` to get additional debug information. `user` and `pass` should be changed to something secure, and these must be the same as in your `.env`-file. the database now starts on port `8000` by default.
   > Attention: By default surrealdb stores all data in memory only which means all data is lost when surrealdb is shutdown for whatever reason. You can append a path to a file to the command to safe the data into a file automatically! `surreal start --log trace --user root --pass pass /path/to/dbfile.db`
5. Start the development server: `npm run dev` (If you have trouble accessing the site using the url as specified in your `.env`-file (`PBL_HOST`) use the following command: `npm run dev -- --host`

## Deploying

Once you want to deploy the project make sure to follow the same steps as the development setup until `2.4`
Now build the project using `npm run build`. This produces a `build` folder containing the compiled sources.
If you have not cloned the repo on your target webserver, you can now upload the contents of the `build` folder to your webserver (make sure nodejs and surrealdb is installed on that one). You can now open the `build`-folder in the terminal (make sure you see a index.js file from here (e.g. via `ls -l`). If you see it you can now run `node index.js` and the server should start on port `3000`. If you want to change the port pass the port aswell es the HOST ip adress as environment variable `PORT=80 node index.js` 
Done! 

## Security

If you want to secure the connection using HTTPS it is recommended to use a proxy webserver like `nginx` or `apache2`. 
Additionally you should configure the firewall on the webserver so that only the port of the webserver is accessible publicly. Though no one should be able to access the database due to missing credentials the database should not be accessible from the internet to improve security. 
