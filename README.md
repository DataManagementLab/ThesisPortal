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
4. Start the database (see [here](https://surrealdb.com/docs/start/starting-surrealdb) for additional startup options): `surreal start --log trace --user root --pass pass` where `trace` can also be `debug` to get additional debug information. `user` and `pass` should be changed to something secure, and these must be the same as in your `.env`-file. 
   > Attention: By default surrealdb stores all data in memory only which means all data is lost when surrealdb is shutdown for whatever reason. You can append a path to a file to the command to safe the data into a file automatically! `surreal start --log trace --user root --pass pass /path/to/dbfile.db`
6. Start the development server: `npm run dev` (If you have trouble accessing the site using the url as specified in your `.env`-file (`PBL_HOST`) use the following command: `npm run dev -- --host`
