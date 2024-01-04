type EnvironmentType = {
  port: string;
  jwtSecret: string;
};

const environment: EnvironmentType = {
  port: process.env.PORT || "3333",
  jwtSecret: process.env.JWT_SECRET || "",
};

export default environment;
