# TypeScript

TypeScript is a strongly typed superset of JavaScript that adds static typing and other powerful features to improve code quality and maintainability.

## Variable Declarations

TypeScript provides let, const, and var just like JavaScript but with type annotations.

```ts
let message: string = "Hello, TypeScript!";
let age: number = 25;
let isActive: boolean = true;
```

## Functions in TypeScript

You can define types for function parameters and return values.

```ts
function add(a: number, b: number): number {
  return a + b;
}
console.log(add(5, 10)); // ✅ 15
```

### Optional Parameters (?) & Default Values

```ts
function greet(name: string, age?: number): string {
  return age ? `Hello ${name}, you are ${age} years old.` : `Hello ${name}!`;
}
console.log(greet("Alice")); // ✅ Hello Alice!
console.log(greet("Bob", 30)); // ✅ Hello Bob, you are 30 years old.
```

## Interfaces & Objects

Interfaces help define the shape of an object.

```ts
interface Person {
  name: string;
  age: number;
  isEmployed?: boolean;  // Optional property
}

const person: Person = {
  name: "John",
  age: 28,
  isEmployed: true,
};
```

### Readonly Properties

```ts
interface User {
  readonly id: number;
  username: string;
}
const user: User = { id: 1, username: "Alice" };
// user.id = 2; // ❌ Error: Cannot modify a readonly property
```

## Union & Intersection Types

Union (|): A variable can have multiple types.

```ts
let value: string | number;
value = "Hello";  // ✅
value = 42;       // ✅
```

Intersection (&): Combines multiple types into one.

```ts
interface Employee {
  name: string;
  salary: number;
}

interface Manager {
  department: string;
}

type ManagerEmployee = Employee & Manager;

const manager: ManagerEmployee = {
  name: "Alice",
  salary: 5000,
  department: "HR",
};
```

## Type Aliases

Type aliases create custom types.

```ts
type ID = string | number;

let userId: ID;
userId = "ABC123";  // ✅
userId = 4567;      // ✅
```

## Type Assertions

Used when you know more about the type than TypeScript.

```ts
let someValue: any = "Hello, TypeScript";
let strLength: number = (someValue as string).length;
```

## Classes in TypeScript

TypeScript supports OOP concepts like classes, interfaces, and inheritance.

```ts
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): void {
    console.log(`${this.name} makes a sound`);
  }
}

const dog = new Animal("Dog");
dog.makeSound(); // ✅ Dog makes a sound
```

