const express = require("express");
const app = express();
const port = 5000;
const data = require("./hello.json");
const customers = data.customers;

const notes = [
  {
    id: 6,
    title: "Josh",
    isDone: true,
  },
  {
    id: 2,
    title: "Gabriel",
    isDone: false,
  },
  {
    id: 7,
    title: "Srapion",
    isDone: true,
  },
];

app.use(express.json());

function getNotes() {
  return notes;
}

app.get("/notes", (req, res) => {
  const notes = getNotes();
  res.send(notes);
});

app.get("/notes/:id", (req, res) => {
  const finder = notes.find((note) => note.id == req.params.id);
  if (finder) {
    const temp = finder;
    res.status(201);
    res.send(finder);
  }
});

app.post("/note", (req, res) => {
  let temp = {
    id: req.body.id,
    title: req.body.title,
    isDone: req.body.isDone,
  };
  notes.push(temp);
  res.status(201);
  res.send(notes);
});

app.delete("/note/:id", (req, res) => {
  const finder = notes.find((note) => note.id == req.params.id);
  if (finder) {
    notes.pop(finder);
  } else {
    res.send("Sorry this ID does not exist");
  }
  res.status(201);
  res.send(notes);
});

app.get("/customers/orders", (req, res) => {
  customers.sort((a, b) => {
    return b.id - a.id;
  });

  res.send(customers);
  // for (let index = 0; index < customers.length-1; index++) {
  //     if(customers[index].id < customers[index+1].id){
  //         let temp = customers[index];
  //         customers[index] = customers[index+1]
  //         customers[index+1]=temp
  //     }
  // }
});

app.get("/customers/orders/:givebyorderid", (req, res) => {
  if (req.params.givebyorderid < 0) {
    throw new Error("The id is not valid");
  } else {
    for (let index = 0; index < customers.length; index++) {
      if (req.params.givebyorderid == customers[index].orderid) {
        for (let j = 0; j < order.length; j++) {
          if (customers[index].orderid == order[j].id) {
            const obj = Object.assign({}, customers[index]);
            delete obj.orderid;
            res.send([obj, order[j]]);
          }
        }
      }
    }
    res.send("No id");
  }
});

// sort by #order descendingly and ascendingly,
// return id name and surname

app.get("/customers/:orderby", (req, res) => {
  customers.sort((a, b) => {
    if (req.params.orderby == "ascending") {
      return a.id - b.id;
    }
    if (req.params.orderby == "descending") {
      return b.id - a.id;
    }
  });
  res.send(customers);
});

app.get("/customers/:id", (req, res) => {
  for (let index = 0; index < customers.length; index++) {
    if (req.params.id == customers[index].id) {
      res.send(customers[index]);
    }
  }
  // const finder = customers.find(customer => customer.id == req.params.id);
  // console.log(finder);
  // if (finder) {
  //     res.send(finder)
  // }
  res.send("No id");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
