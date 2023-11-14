import jwt from "jsonwebtoken";
const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret-key-here");
    // IMPORTANT!!!!!
    // early guard clause, everything error or negative
    if (!decoded?.id) return res.status(401).json({ message: "Unauthorised" });
    // IMPORTANT!!!!!
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorised", error });
  }
};

export default isAuthenticated;