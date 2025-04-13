# 📦 Bazaar Inventory Tracking System

## 🧾 Overview

The **Bazaar Inventory Tracking System** is tailored for the growing needs of **Kiryana Stores**. It allows users to **Add, Delete, Update**, and **Fetch** products, as well as record **stock movements** (SALE or STOCK IN) and view current stock levels.

In addition, it provides **real-time notifications** to clients via **WebSockets** when stock is low, ensuring timely restocking and smooth operations.

---

## 🛠️ Tech Stack

- **NestJS** – Scalable and modular backend framework
- **TypeORM** – Object-Relational Mapping tool for DB interactions
- **PostgreSQL** – Robust relational database
- **Socket.IO** – Real-time event-driven communication

---

## 📐 Design Decisions

- Built with **NestJS** to ensure scalability, maintainability, and architectural robustness.
- Follows a **Modular Layered Architecture**, chosen for its:
  - ✅ Clear **Separation of Concerns**
  - ✅ High **Scalability** and **Reusability**
- Clean, modular codebase with **ORM abstraction** to allow easy replacement.
- System is optimized for scale using:
  - Redis-based **caching**
  - JavaScript **async task queues** to prevent main thread blockage.

---

## 📌 Assumptions

- The client-side application:
  - Validates inputs and adheres to the expected API payload structure.
  - Subscribes to and handles the relevant **Socket.IO events**.

---

## 🌐 API Design

- Utilizes **REST APIs** for a stateless, scalable, and frontend-friendly structure.
- Example Endpoints:
  - `GET /product/:id`
  - `GET /stock-movement?date=2024/02/01&store=2`
- **JWT-based authentication** is used for secure access.
- **Versioning Strategy**:
  - Each Git branch represents a different version (e.g., `v1`, `v2`, `v3`).

---

## 🔁 Evolution Rationale (v1 → v3)

- **v1**: Basic MVP using SQLite and simple REST endpoints for CRUD operations.
- **v2**: Upgraded to PostgreSQL with enhanced filtering capabilities and JWT-based authentication.
- **v3**: Integrated **WebSocket** functionality for real-time low stock alerts. Implemented **Redis caching** and **async task queues** to improve scalability and system responsiveness.

---

