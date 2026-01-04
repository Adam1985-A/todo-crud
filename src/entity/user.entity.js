import { EntitySchema } from "typeorm";

const UserEntity = new EntitySchema({
  name: "User",
  tableName: "users",
  
  columns: {
    id: {
      type: Number,
      generated: true,
      primary: true
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: "varchar",

    },
    createdAt: {
      type: "timestamp",
      createDate: true
    },
    updateAt: {
      type: "timestamp",
      updateDate: true
    },
  },
  relations: {
    todos: {
    type: "one-to-many",
    target: "Todo",
    inverSide: "user",
    }
  }
});

export default UserEntity;