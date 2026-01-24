# 🧩 SOLID

**SOLID** — набор принципов объектно-ориентированного проектирования, которые помогают писать **читаемый, поддерживаемый и масштабируемый код**. В Node.js применяются в классах, сервисах и модулях.

---

## 1️⃣ **S — Single Responsibility Principle (SRP)**

> Класс/модуль должен иметь **только одну ответственность**.

**Пример (Node.js Service):**

```ts
class UserService {
  constructor(private userRepo: UserRepository) {}

  async createUser(data) {
    return this.userRepo.save(data); // только работа с пользователями
  }
}
```

❌ **Не делать:** UserService одновременно отправляет email и пишет в БД → две ответственности.

---

## 2️⃣ **O — Open/Closed Principle (OCP)**

> Класс должен быть **открыт для расширения, но закрыт для модификации**.

**Пример:**

```ts
interface DiscountStrategy {
  calculate(amount: number): number;
}

class ChristmasDiscount implements DiscountStrategy {
  calculate(amount: number) { return amount * 0.9; }
}

class OrderService {
  constructor(private discount: DiscountStrategy) {}
  total(amount: number) { return this.discount.calculate(amount); }
}
```

* Можно добавить новый тип скидки, не меняя OrderService.

---

## 3️⃣ **L — Liskov Substitution Principle (LSP)**

> Подкласс должен быть **вместо родителя** без изменения поведения.

**Пример:**

```ts
class Logger {
  log(message: string) { console.log(message); }
}

class FileLogger extends Logger {
  log(message: string) { require('fs').appendFileSync('log.txt', message + '\n'); }
}

function doSomething(logger: Logger) {
  logger.log('Action!');
}
```

* FileLogger можно передать вместо Logger — LSP соблюдено.

---

## 4️⃣ **I — Interface Segregation Principle (ISP)**

> Клиенты не должны зависеть от методов, которые они **не используют**.

**Пример:**

```ts
interface ReadUserRepo { findById(id: string): User; }
interface WriteUserRepo { save(user: User): void; }

class UserService {
  constructor(private readRepo: ReadUserRepo, private writeRepo: WriteUserRepo) {}
}
```

* Разделили интерфейсы на читающие и пишущие → не заставляем использовать лишние методы.

---

## 5️⃣ **D — Dependency Inversion Principle (DIP)**

> Модули высокого уровня не должны зависеть от модулей низкого уровня, а от абстракций.

**Пример:**

```ts
interface PaymentGateway { pay(amount: number): boolean; }

class StripeGateway implements PaymentGateway {
  pay(amount: number) { /* call Stripe API */ return true; }
}

class PaymentService {
  constructor(private gateway: PaymentGateway) {}
  process(amount: number) { return this.gateway.pay(amount); }
}
```

* PaymentService зависит **от абстракции**, не от конкретного Stripe. Легко менять на другой gateway.

---

# 🎯 Коротко для собеса

* **SRP** → один класс — одна ответственность
* **OCP** → расширяемость без изменения кода
* **LSP** → подклассы не ломают контракты родителя
* **ISP** → маленькие интерфейсы, клиенты не зависят от лишнего
* **DIP** → зависимости через абстракции, а не через конкретные реализации
