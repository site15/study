# 🧩 Security & Reliability в System Design

В System Design этот блок критичен, потому что даже суперскоростная и масштабируемая система **не имеет ценности**, если она небезопасна или нестабильна.

---

## 1️⃣ **Security (Безопасность)**

### 🔹 Основные аспекты

1. **Аутентификация и авторизация**

   - JWT / OAuth2 / API Keys
   - Role-based access control (RBAC) / Attribute-based access control (ABAC)
   - В NestJS → Guards, Passport.js стратегии

**Пример:**

```ts
@UseGuards(AuthGuard('jwt'))
@Get('profile')
getProfile(@Req() req) {
  return req.user;
}
```

---

2. **Шифрование и передача данных**

   - TLS для сетевых соединений (HTTPS, gRPC)
   - Шифрование данных на диске и в базе (AES, RSA)
   - Secrets management (Vault, AWS Secrets Manager)

---

3. **Rate limiting / Throttling**

   - Защита от DDoS и brute-force
   - NestJS: `@nestjs/throttler`

```ts
@Throttle(10, 60) // 10 requests per 60 seconds
@Get('login')
login() {}
```

---

4. **Input validation & Sanitization**

   - Предотвращение XSS, SQL Injection, NoSQL Injection
   - Использование DTO + class-validator в NestJS

**Пример:**

```ts
class CreateUserDto {
  @IsEmail()
  email: string;

  @Length(6, 20)
  password: string;
}
```

---

5. **Audit & Logging**

   - Хранение критичных действий пользователей
   - Логи с correlation ID для отслеживания запросов через микросервисы

---

6. **Secrets & Tokens**

   - Не хранить ключи в коде
   - Использовать environment variables, Hashicorp Vault, KMS

---

## 2️⃣ **Reliability (Надёжность)**

### 🔹 Основные аспекты

1. **Retry / Backoff / Circuit Breaker**

   - Повторные попытки для временных ошибок
   - Circuit breaker → предотвращает cascading failures

**Пример:**

- NestJS + Axios + `@nestjs/axios` + RxJS retry

```ts
this.httpService.get(url).pipe(
  retry({ count: 3, delay: 1000 }),
  catchError((err) => throwError(() => new Error("External API failed")))
);
```

---

2. **Bulkhead / Resource Isolation**

   - Изоляция ресурсов для разных сервисов
   - Ошибка в одном модуле не блокирует всю систему

---

3. **Queue / Event-driven reliability**

   - Очереди сообщений с подтверждением (ack)
   - Dead Letter Queue (DLQ) для сообщений, которые не удалось обработать

**Пример:** RabbitMQ / Kafka

- Messages are persistent
- Consumer acks → гарантированная доставка

---

4. **Health checks & Liveness / Readiness probes**

   - Kubernetes probes для автоматического перезапуска упавших pods

```ts
@Get('health')
health() { return { status: 'ok' }; }
```

---

5. **Monitoring & Alerting**

   - Метрики: latency, error rate, queue length, event loop lag
   - Prometheus / Grafana / Jaeger
   - Alerts для SLA / SLO violations

---

6. **Idempotency**

   - Повторные запросы не должны ломать систему
   - Особенно важно для оплаты, бронирования, очередей

**Пример:**

- Payment API → idempotency key

---

## 3️⃣ **Продакшен-примеры интеграции Security & Reliability**

| Компонент     | Security                       | Reliability                        |
| ------------- | ------------------------------ | ---------------------------------- |
| API Gateway   | JWT, TLS, rate-limiting        | Throttling, circuit breaker        |
| AuthService   | OAuth2, RBAC, hashed passwords | Retry при внешних API, DB failover |
| Message Queue | шифрование сообщений           | DLQ, persistent messages, ack      |
| Microservices | Guards, input validation       | Bulkhead, retry, monitoring        |
| Database      | encrypted at rest, RBAC        | Read replicas, failover, backups   |
| External API  | TLS, token auth                | Retry + exponential backoff        |

---

## 4️⃣ **На собесе обычно спрашивают:**

1. «Как защитить микросервисы от DDoS?» → rate limiting, throttling
2. «Как обеспечить, чтобы одна ошибка сервиса не падала вся система?» → circuit breaker, bulkhead
3. «Что делать, если внешний сервис упал?» → retry + backoff + fallback
4. «Как безопасно хранить секреты и ключи?» → Vault / KMS
5. «Как обеспечить гарантию доставки сообщений?» → ack, persistent messages, DLQ

---

### 🎯 Ключевая фраза на собес:

> Security & Reliability в System Design — это комбинация защиты данных, аутентификации и авторизации, плюс гарантии стабильности и устойчивости системы через retry, circuit breakers, bulkheads и мониторинг. Без этих аспектов даже высоконагруженная архитектура становится ненадёжной и небезопасной.
