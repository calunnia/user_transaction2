import { createServer, Model } from 'miragejs';

let data = [
  {
    name: 'Kovács Béla',
    pets: [
      { name: "Bodri", animal: "dog", isVaccinated: false },
      { name: "Cirmi", animal: "cat", isVaccinated: false }
    ]
  },
  {
    name: 'Varga Lajos',
    pets: [
      { name: "Frakk", animal: "dog", isVaccinated: false }
    ]
  },
  {
    name: 'Nagy Béla',
    pets: [
      { name: "Csőrike", animal: "pigeon", isVaccinated: false }
    ]
  }
]

let users= [
  {id: 1, name:"Szilagyi Erika"},
  {id: 2, name:"Szilagyi Otto"},
  {id: 3, name:"Szilagyi Viki"},
  {id: 4, name:"Szilagyi Martin"},
]

let transactions = [
  {userId:1, type:'deposit' , ammount:1000},
  {userId:1, type:'withdraw', ammount:100},
  {userId:1, type:'deposit', ammount:200},
  {userId:2, type:'deposit', ammount:1000},
  {userId:2, type:'withdraw', ammount:300},
  {userId:2, type:'withdraw', ammount:300},
  {userId:2, type:'withdraw', ammount:300},
  {userId:2, type:'withdraw', ammount:300},
  {userId:3, type:'deposit', ammount:500},
  {userId:3, type:'withdraw', ammount:300},
  {userId:3, type:'witdraw', ammount:150},
  {userId:4, type:'deposit', ammount:500},
  {userId:4, type:'withdraw', ammount:70},
  {userId:4, type:'withdraw', ammount:30},

]

export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,
    models: {
      client: Model,
    },
    seeds(server) { },
    routes() {
      this.namespace = '/api';
      this.timing = 2000

      this.get('clients', (schema, request) => {
        const search = request.queryParams.search
        return data.filter(client => client.name.includes(search))
      });

      this.post('/pets', (schema, request) => {
        let { name, isVaccinated } = JSON.parse(request.requestBody);
        data.forEach(c => {
          c.pets.forEach(p => {
            if (p.name === name) p.isVaccinated = isVaccinated
          })
        })
        return { success: true }
      });


      this.get('users', (schema, request) => {

         return users
      });

      this.get('transactions', (schema, request) => {

        return transactions
      });


      this.get('user', (schema, request) => {
        const search = request.queryParams.search
        return users.filter(user => user.name.includes(search))
      });

    },
  });
  return server;
}
