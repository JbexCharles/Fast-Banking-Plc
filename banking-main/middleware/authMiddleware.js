const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Unauthorized admin access" });
    }

    //Attach both ID and email
    req.adminEmail = decoded.email;
    req.adminId = decoded.id;

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
