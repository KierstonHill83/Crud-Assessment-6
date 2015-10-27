var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/sports';

module.exports = connectionString;