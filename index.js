const express = require('express')
const app = express()
const port = 5000;
const data = require('./hello.json');
const customers = data.customers;

const order = [
        {    id: 142,
            item: "Playstation 4"

        },
        {    id: 24,
            item: "X box"
        },
        {    id: 56,
            item: "PSP"
        },
        {    id: 72,
            item: "PC"
        }
    ]


app.get('/customers', (req, res) => {
    res.send(customers)
  });

  app.get('/customers/orders', (req, res) => {

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

})

app.get('/customers/orders/:givebyorderid', (req, res) => {
    if (req.params.givebyorderid < 0) {
        throw new Error("The id is not valid");
    } else {
        for (let index = 0; index < customers.length; index++) {
            if (req.params.givebyorderid == customers[index].orderid) {
                for (let j = 0; j < order.length; j++) {
                    if (customers[index].orderid == order[j].id) {
                        const obj = Object.assign({}, customers[index]);
                        delete obj.orderid
                        res.send([obj, order[j]]);
                    }
                }
            }
        }
        res.send("No id");
    }
})


// sort by #order descendingly and ascendingly, 
// return id name and surname 

app.get('/customers/:orderby', (req, res) => {

    customers.sort((a, b) => {
        if (req.params.orderby == "ascending") {
            return a.id - b.id;  
        }
        if (req.params.orderby == "descending") {
            return b.id - a.id;
        }
      });
      res.send(customers);
})

app.get('/customers/:id', (req, res) => {
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
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});