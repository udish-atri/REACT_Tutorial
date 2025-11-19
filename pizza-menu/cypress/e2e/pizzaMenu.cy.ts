/// <reference types="cypress" />

const API_URL = 'http://localhost:3001/pizzas';

const initialPizzas = [
  {
    id: 1,
    name: 'Margherita',
    toppings: ['Cheese'],
    fanFavorite: true,
    delivery: true,
  },
  {
    id: 2,
    name: 'Pepperoni Feast',
    toppings: ['Cheese', 'Pepperoni'],
    fanFavorite: true,
    delivery: false,
  },
  {
    id: 3,
    name: 'Veggie Delight',
    toppings: ['Cheese', 'Mushrooms', 'Onions', 'Olives'],
    fanFavorite: false,
    delivery: true,
  },
];

describe('Pizza Menu app', () => {
  beforeEach(() => {
    // Mock GET /pizzas for every test
    cy.intercept('GET', API_URL, initialPizzas).as('getPizzas');
    cy.visit('/');
    cy.wait('@getPizzas');
  });

  it('1. View list of pizzas', () => {
    cy.get('[data-cy="pizza-row"]').should('have.length', 3);
    cy.get('[data-cy="pizza-row"]').first().should('contain.text', 'Margherita');
  });

  it('2. Add a pizza', () => {
    const newPizza = {
      id: 4,
      name: 'BBQ Blast',
      toppings: ['Cheese', 'Onions'],
      fanFavorite: false,
      delivery: true,
    };

    cy.intercept('POST', API_URL, (req) => {
      // optionally assert on req.body here
      req.reply(newPizza);
    }).as('addPizza');

    cy.get('[data-cy="add-pizza-link"]').click();

    cy.get('#pizza-name').type('BBQ Blast');
    cy.get('[data-cy="topping-Cheese"]').click();
    cy.get('[data-cy="topping-Onions"]').click();
    cy.get('[data-cy="fanFavorite-no"]').click();
    // delivery stays as default "Yes"

    cy.contains('button', 'Add Pizza').click();
    cy.wait('@addPizza');

    cy.get('[data-cy="pizza-row"]').should('have.length', 4);
    cy.get('[data-cy="pizza-row"]').last().should('contain.text', 'BBQ Blast');
  });

  it('3. Edit a pizza', () => {
    const updatedPizza = {
      id: 2,
      name: 'Spicy Pepperoni',
      toppings: ['Cheese', 'Pepperoni'],
      fanFavorite: true,
      delivery: false,
    };

    cy.intercept('PUT', `${API_URL}/2`, updatedPizza).as('editPizza');

    // click the ID 2 link in the table
    cy.contains('a', '2').click();

    cy.get('#pizza-name').clear().type('Spicy Pepperoni');

    cy.contains('button', 'Save Changes').click();
    cy.wait('@editPizza');

    cy.get('[data-cy="pizza-row"]').eq(1).should('contain.text', 'Spicy Pepperoni');
  });

  it('4. Delete a pizza', () => {
    cy.intercept('DELETE', `${API_URL}/3`, { statusCode: 200 }).as('deletePizza');

    cy.contains('a', '3').click();

    cy.contains('button', 'Delete').click();
    cy.wait('@deletePizza');

    cy.get('[data-cy="pizza-row"]').should('have.length', 2);
    cy.get('[data-cy="pizza-row"]').each(($row) => {
      cy.wrap($row).should('not.contain.text', 'Veggie Delight');
    });
  });
});
