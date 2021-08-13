describe('Auth screen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:19006/')
    cy.get('input[type=text]').as('email')
    cy.get('input[type=password]').as('password')
  })

  it('Correct shows email errors', () => {
    cy.get('@email').type('t')
    cy.get('@email').blur()
    cy.contains(/некорректный email/i)
    cy.get('div[role=button][aria-disabled=true]').should('exist')

    cy.get('@email').type('test@test.test')
    cy.get('@email').blur()
    cy.contains(/некорректный email/i).should('not.exist')
  })
  it('Correct shows password errors', () => {
    cy.get('@password').type('t')
    cy.get('@password').blur()
    cy.contains(/пароль должен быть длиннее 6 символов/i)
    cy.get('div[role=button][aria-disabled=true]').should('exist')

    cy.get('@password').type('testPassword')
    cy.get('@password').blur()
    cy.contains(/пароль должен быть длиннее 6 символов/i).should('not.exist')
  })
  it('Correct shows button', () => {
    cy.get('div[role=button][aria-disabled=true]').should('exist')
  })

  it('Enables login when form valid', () => {
    cy.get('@email').type('test@test.test')
    cy.get('@password').type('password')
    cy.get('div[role=button][aria-disabled=true]').should('not.exist')
  })
})
