require('isomorphic-fetch');

describe("Account", () => {
    fetch('http://localhost:62222/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ posts { title } }' }),
    })
      .then(res => res.json())
      .then(res => console.log(res.data));
    it("passes", () => {
        expect(true).toEqual(true)
    })

});