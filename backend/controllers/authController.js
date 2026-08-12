import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const users = [
  {
    id: 1,
    username: "admin_user",
    password: "AdminPass123!",
    role: "ADMIN",
    baseId: null,
  },
  {
    id: 2,
    username: "commander_alpha",
    password: "CommandPass123!",
    role: "BASE_COMMANDER",
    baseId: 1,
  },
  {
    id: 3,
    username: "logistics_officer",
    password: "LogisticsPass123!",
    role: "LOGISTICS_OFFICER",
    baseId: 1,
  },
];

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const user = users.find(
      (item) => item.username === username
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      await bcrypt.hash(user.password, 10)
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
        baseId: user.baseId,
      },
      process.env.JWT_SECRET || "temporary_secret",
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        baseId: user.baseId,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};