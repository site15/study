# 🧠 Monitoring и Observability в System Design

> **Monitoring** и **Observability** — это не одно и то же.
> В контексте system design это **ключевой элемент архитектуры**, который позволяет поддерживать SLA, диагностировать инциденты и масштабировать систему безопасно.

---

## 1️⃣ **Monitoring — базовое наблюдение**

**Что это:**

- Сбор **метрик, логов и алертов** для текущего состояния системы
- Позволяет **замечать проблемы до того, как они станут критичными**

**Примеры метрик:**

- QPS (queries per second) / TPS (transactions per second)
- Latency / response time
- Error rate / 4xx/5xx responses
- Event Loop lag (для Node.js)
- Thread pool / worker threads utilization
- Queue length / broker lag (RabbitMQ, Kafka)
- Memory usage / GC pauses

**Применение в NestJS / Node.js:**

```ts
import { Gauge } from "prom-client";

const eventLoopLag = new Gauge({
  name: "event_loop_lag_ms",
  help: "Event Loop Lag",
});

setInterval(() => {
  const start = process.hrtime();
  setImmediate(() => {
    const delta = process.hrtime(start);
    eventLoopLag.set(delta[0] * 1e3 + delta[1] / 1e6);
  });
}, 1000);
```

---

## 2️⃣ **Observability — глубокое понимание системы**

**Что это:**

- Возможность **понимать состояние системы через её внешние сигналы**
- Использует три источника: **Logs, Metrics, Traces (3 pillars of Observability)**

| Pillar  | Цель                             | Примеры                                       |
| ------- | -------------------------------- | --------------------------------------------- |
| Logs    | Что произошло                    | Winston, Pino, structured logs, correlationId |
| Metrics | Состояние системы                | Prometheus/Grafana, latency, throughput       |
| Traces  | Поток запроса через микросервисы | Jaeger, OpenTelemetry, Zipkin                 |

**Пример:**

- Пользователь делает запрос → API Gateway → OrderService → PaymentService
- Trace позволяет увидеть **весь путь запроса**, задержки, ошибки и bottleneck

---

## 3️⃣ **Почему это важно в System Design**

- В больших системах **миллионы запросов**, сотни микросервисов → без observability **невозможно понять причину падения**
- Позволяет:

  - Detect performance bottlenecks
  - Understand root cause of failures
  - Monitor system health in real time
  - Make data-driven decisions для масштабирования

---

## 4️⃣ **Monitoring / Observability в архитектуре**

**Типичная микросервисная схема:**

```
Client → API Gateway → Microservices → DB / Cache / Queue
                 ↘
                  Observability Layer:
                  - Metrics: latency, QPS, queue size
                  - Logs: request ID, errors
                  - Traces: request flow through services
                  - Alerts: Slack, PagerDuty
```

- **NestJS подход:**

  - Interceptors для логирования запросов/ответов
  - Middleware для correlation IDs
  - Prometheus metrics exporter для latency / throughput

---

## 5️⃣ **Конкретные метрики и алерты**

| Метрика             | Что показывает       | Alert strategy                           |
| ------------------- | -------------------- | ---------------------------------------- |
| Event Loop lag      | Задержки Node.js     | >50ms → investigate                      |
| Heap / Memory usage | Утечки памяти        | >80% heap → restart / warn               |
| Queue length        | RabbitMQ / Kafka lag | > threshold → scale consumers            |
| Request latency     | API response         | P95 > SLA → alert                        |
| Error rate          | 4xx/5xx              | > threshold → alert on Slack / PagerDuty |

---

## 6️⃣ **Инструменты и интеграция**

- **Metrics:** Prometheus + Grafana
- **Tracing:** OpenTelemetry + Jaeger / Zipkin
- **Logging:** Pino / Winston + ELK stack
- **Alerting:** Grafana Alerts / PagerDuty / OpsGenie

**NestJS примеры:**

- `nestjs-prometheus` → metrics
- `nestjs-winston` → structured logging
- OpenTelemetry SDK для tracing NestJS endpoints

---

## 7️⃣ **Типовые вопросы на собесе**

1. Как измерять latency / throughput в микросервисной системе?
2. Как отследить bottleneck в Event Loop Node.js?
3. Как использовать correlationId для отслеживания запроса через сервисы?
4. Как различается monitoring и observability?
5. Какие метрики критичны для RabbitMQ / Kafka / Redis?
6. Как настроить алерты для SLA в реальном времени?

---

## 8️⃣ **Итог**

- **Monitoring** → наблюдаем за состоянием и метриками
- **Observability** → понимаем, почему система ведёт себя так, а не иначе
- В System Design это **ключевой блок архитектуры**, чтобы строить масштабируемые и отказоустойчивые микросервисы
- Для Node.js / NestJS важно контролировать **Event Loop, асинхронность, очереди и latency между сервисами**
