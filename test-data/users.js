require('dotenv').config();

const normalizeUserKey = (value = 'mainUser') => {
  return String(value)
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((part, index) => {
      const normalized = part.toLowerCase();
      return index === 0 ? normalized : normalized.charAt(0).toUpperCase() + normalized.slice(1);
    })
    .join('') || 'mainUser';
};

const buildUsersFromEnv = () => {
  const users = {};

  for (const [envKey, value] of Object.entries(process.env)) {
    if (!value) continue;

    const match = new RegExp(/^(.+?)_(USERNAME|PASSWORD)$/i).exec(envKey);
    if (!match) continue;

    const userKey = normalizeUserKey(match[1]);
    users[userKey] = users[userKey] || {};

    if (/USERNAME$/i.test(envKey)) {
      users[userKey].username = value;
    } else {
      users[userKey].password = value;
    }
  }

  return users;
};

const users = buildUsersFromEnv();

const getUser = (key = 'mainUser') => {
  const userKey = normalizeUserKey(key);
  const user = users[userKey];

  if (!user?.username || !user.password) {
    const envKey = userKey.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();
    const availableUsers = Object.keys(users).length ? Object.keys(users).join(', ') : 'none';

    throw new Error(
      `Missing credentials for user "${key}". Add ${envKey}_USERNAME and ${envKey}_PASSWORD to .env. Available users: ${availableUsers}`
    );
  }

  return {
    username: user.username,
    password: user.password,
  };
};

module.exports = { users, getUser };

