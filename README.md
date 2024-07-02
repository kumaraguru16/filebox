# FileBox Project with Node.js and SQL

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v20.11.0)
- npm (v10.2.4)
- A SQL database - MySQL
- Git (for cloning the repository)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/kumaraguru16/filebox.git
cd filebox
```

2. **Install dependencies**

```bash
npm install -g pnpm serverless
pnpm install
```

3. **Configure your environment**

   Create a .env file in root folder.

   Example for environment file.

   Mysql Username: root
   Mysql Password: admin@123
   Mysql Host Name: localhost
   Mysql Port: 3306
   Database Name: FU

```bash
DATABASE_URL=mysql://root:admin@123@localhost:3306/FU
IS_OFFLINE=true
```

4. **Database setup**

   Ensure your SQL database is running and accessible with below configuration.

```bash
MYSQL download from below link - https://www.mysql.com/downloads/
```

```bash
Workbench download from below link: - https://dev.mysql.com/downloads/workbench/
```

```bash
Mysql Username: root
Mysql Password: admin@123
Mysql Host Name: localhost
Mysql Port: 3306
Database Name: FU
```

```bash
mysql -u root -p
Enter the mysql password
CREATE DATABASE FU;
SHOW DATABASES;
EXIT;
```

Migration:

```bash
sudo npx prisma migrate reset
npx prisma generate
```

### Running the Application

- **Development mode**

```bash
USE AWS Credential in current terminal
sls offline --noTimeout
```

- **Production mode**

```bash
sls deploy
```

This will start the application on `http://localhost:3000` by default. You can access the API endpoints as defined in your project's controllers.

## Built With

- [Node.js](https://nodejs.org/) - The runtime environment
- SQL Database - Data persistence

## Authors

- **Kumaraguru** - [kumaraguru16](https://github.com/kumaraguru16)

## License

This project is licensed under the MIT License.
