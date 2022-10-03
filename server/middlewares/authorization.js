const checkAccess = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user || !roles.includes(user?.role)) {
      return res.status(403).json({
        success: false,
        err: "You do not have permission to perform this action",
      });
    }
    next();
  };
};

module.exports = checkAccess;
