const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');

const signup = async (email, password, name) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const token = generateToken(user.id);

  return { user, token };
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user.id);

  return { user, token };
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = {
  signup,
  login,
};
