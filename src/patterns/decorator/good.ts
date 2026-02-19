import { DatabaseUserRepository } from "./UserRepository";
import { LoggingDecorator } from "./decorators/LoggingDecorator";
import { CacheDecorator } from "./decorators/CacheDecorator";
import { MetricsDecorator } from "./decorators/MetricsDecorator";

export function buildUserRepository() {
  const baseRepo = new DatabaseUserRepository();
  const withCache = new CacheDecorator(baseRepo);
  const withLogging = new LoggingDecorator(withCache);
  const withMetrics = new MetricsDecorator(withLogging);

  return withMetrics;
}
