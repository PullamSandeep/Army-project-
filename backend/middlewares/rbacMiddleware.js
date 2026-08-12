export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. Insufficient permissions.",
      });
    }

    next();
  };
};

export const enforceBaseScope = (req, res, next) => {
  if (req.user.role === "BASE_COMMANDER") {
    req.query.baseId = req.user.baseId;
  }

  next();
};