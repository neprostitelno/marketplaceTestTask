# Тестовое задание 

Необходимо сделать пробную версию маркетпласа.
- Получить карточки товаров с FakeAPI https://dummyjson.com/carts отобразить их в произвольной форме используем следующие поля products {id, title, price}.
- Товары можно добавлять в корзину, а так же можно производить покупку, а именно вся покупка должна сделана на fronte, добавил в корзину => выбрал способ оплаты => оплата => списание средств и вывод успешной покупки.
- В корзине должно быть 2 валюты $ и Coin обмен 1 к 1.
- Нужно продумать следующий функционал мнимой покупки товаров, все товары можно покупать за любую валюту, но если Coin не хватает для покупки можно пополнить через $, но а так же можно купить и за $.

stack: Next(12 версия), Axios, React Query, redux-toolkit или zustend, TS всё остальное по желанию.

Будет плюсом если сделать адаптив


## Как запустить

Для запуска приложения вам понадобится пакетный менеджер npm

Для установки пакетов используемых в приложении используйте команду:

```
npm install
```
Для запуска приложения используйте команду:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Реализованные функции:
1) Главная страница с динамической пагинацией
2) Страница корзины с возможностью оплаты выбранных товаров
3) Выбор способа оплаты
4) Конвертация валют

## Используемые технологии

В данном проекте использовались следующие технологии:

1) React
2) Redux-toolkit
3) NextJS
4) react-router-dom
5) scss
6) axios
7) react-hook-form
