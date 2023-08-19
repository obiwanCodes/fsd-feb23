import jwt from "jsonwebtoken";

const authorize = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedPayload = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY
    );
    req.user = decodedPayload;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

export default authorize;
